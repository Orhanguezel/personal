'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { OrderDetailDto, OrderUpdatePayload } from '@/integrations/shared/orders.types';
import {
  useGetOrderAdminQuery,
  useUpdateOrderAdminMutation,
} from '@/integrations/hooks';

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

function formatPrice(val: string | number | null | undefined, currency = 'EUR'): string {
  if (val == null || val === '') return '—';
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(n);
}

function formatDate(val: string | null | undefined): string {
  if (!val) return '—';
  try {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(val));
  } catch {
    return val;
  }
}

export default function AdminOrderDetailClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: order, isLoading, isFetching, error, refetch } = useGetOrderAdminQuery(
    { id },
    { skip: !id },
  );

  const [updateOrder, updateState] = useUpdateOrderAdminMutation();

  const [status, setStatus] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [deliveryUrl, setDeliveryUrl] = React.useState('');
  const [deliveryNote, setDeliveryNote] = React.useState('');
  const [adminNote, setAdminNote] = React.useState('');

  React.useEffect(() => {
    if (!order) return;
    setStatus(order.status || 'pending');
    setPaymentStatus(order.payment_status || 'unpaid');
    setDeliveryUrl(order.delivery_url || '');
    setDeliveryNote(order.delivery_note || '');
    setAdminNote(order.admin_note || '');
  }, [order]);

  const busy = isLoading || isFetching || updateState.isLoading;

  async function onSave() {
    try {
      const patch: OrderUpdatePayload = {
        status: status as any,
        payment_status: paymentStatus as any,
        delivery_url: deliveryUrl || null,
        delivery_note: deliveryNote || null,
        admin_note: adminNote || null,
      };
      await updateOrder({ id, patch }).unwrap();
      toast.success('Sipariş güncellendi');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.error?.message || 'Güncellenemedi');
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!order && error) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Sipariş bulunamadı</h1>
        <Card>
          <CardContent className="pt-6">
            <Button variant="outline" onClick={() => router.push('/admin/orders')}>
              <ArrowLeft className="mr-2 size-4" /> Listeye Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) return null;

  const detail = order as OrderDetailDto;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()} disabled={busy}>
              <ArrowLeft className="mr-2 size-4" /> Geri
            </Button>
            <h1 className="text-lg font-semibold">Sipariş #{detail.order_number}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge className={STATUS_BADGE[detail.status] || ''}>{detail.status}</Badge>
            <span>{formatDate(detail.created_at)}</span>
          </div>
        </div>
        <Button onClick={onSave} disabled={busy}>
          <Save className="mr-2 size-4" /> Kaydet
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main */}
        <div className="space-y-6 lg:col-span-8">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Müşteri Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">İsim</div>
                  <div className="font-medium">{detail.customer_name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">E-posta</div>
                  <div className="font-medium">{detail.customer_email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telefon</div>
                  <div className="font-medium">{detail.customer_phone || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Dil</div>
                  <div className="font-medium">{detail.customer_locale}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sipariş Kalemleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ürün</TableHead>
                      <TableHead>Tip</TableHead>
                      <TableHead>Adet</TableHead>
                      <TableHead className="text-right">Fiyat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(detail.items ?? []).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.item_type === 'digital' ? 'Dijital' : 'Hizmet'}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(item.price, item.currency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Toplam</div>
                  <div className="text-xl font-bold text-primary">
                    {formatPrice(detail.total_amount, detail.currency)}
                    {detail.payment_type === 'subscription' ? '/ay' : ''}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ödeme Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              {(detail.payments ?? []).length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sağlayıcı</TableHead>
                        <TableHead>İşlem ID</TableHead>
                        <TableHead>Tutar</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Tarih</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detail.payments.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>{p.provider}</TableCell>
                          <TableCell className="font-mono text-xs">{p.transaction_id || '—'}</TableCell>
                          <TableCell>{formatPrice(p.amount, p.currency)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{p.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(p.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Henüz ödeme kaydı yok.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Durum Yönetimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sipariş Durumu</Label>
                <Select value={status} onValueChange={setStatus} disabled={busy}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Bekliyor</SelectItem>
                    <SelectItem value="paid">Ödendi</SelectItem>
                    <SelectItem value="processing">İşleniyor</SelectItem>
                    <SelectItem value="delivered">Teslim Edildi</SelectItem>
                    <SelectItem value="cancelled">İptal</SelectItem>
                    <SelectItem value="refunded">İade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ödeme Durumu</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus} disabled={busy}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Ödenmedi</SelectItem>
                    <SelectItem value="paid">Ödendi</SelectItem>
                    <SelectItem value="failed">Başarısız</SelectItem>
                    <SelectItem value="refunded">İade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Teslim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery_url">Teslim URL</Label>
                <Input
                  id="delivery_url"
                  value={deliveryUrl}
                  onChange={(e) => setDeliveryUrl(e.target.value)}
                  disabled={busy}
                  placeholder="https://download.example.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery_note">Teslim Notu</Label>
                <Textarea
                  id="delivery_note"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  disabled={busy}
                  rows={3}
                />
              </div>
              {detail.delivered_at && (
                <div className="text-sm text-muted-foreground">
                  Teslim tarihi: {formatDate(detail.delivered_at)}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Admin Notu</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                disabled={busy}
                rows={4}
                placeholder="İç not..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">PayPal Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono">{detail.paypal_order_id || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capture ID</span>
                <span className="font-mono">{detail.paypal_capture_id || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subscription ID</span>
                <span className="font-mono">{detail.paypal_subscription_id || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ödeme Tipi</span>
                <span>{detail.payment_type === 'subscription' ? 'Aylık' : 'Tek Sefer'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IP Adresi</span>
                <span className="font-mono">{detail.ip_address || '—'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
