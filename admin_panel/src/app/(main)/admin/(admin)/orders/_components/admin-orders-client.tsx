'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RefreshCcw, Search, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import type { OrderDto, OrderListAdminQueryParams, SubscriptionDto } from '@/integrations/shared/orders.types';
import {
  useListOrdersAdminQuery,
  useListSubscriptionsAdminQuery,
  useCancelSubscriptionAdminMutation,
} from '@/integrations/hooks';

type StatusFilter = 'all' | 'pending' | 'paid' | 'processing' | 'delivered' | 'cancelled' | 'refunded';
type PaymentFilter = 'all' | 'unpaid' | 'paid' | 'failed' | 'refunded';

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

const PAYMENT_BADGE: Record<string, string> = {
  unpaid: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const SUB_STATUS_BADGE: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
};

function formatPrice(val: string | number | null | undefined): string {
  if (val == null || val === '') return '—';
  const n = typeof val === 'string' ? parseFloat(val) : val;
  if (Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(n);
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

export default function AdminOrdersClient() {
  const router = useRouter();

  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentFilter>('all');
  const [search, setSearch] = React.useState('');

  const queryParams = React.useMemo<OrderListAdminQueryParams>(() => ({
    q: search.trim() || undefined,
    status: statusFilter !== 'all' ? (statusFilter as any) : undefined,
    payment_status: paymentFilter !== 'all' ? (paymentFilter as any) : undefined,
    limit: 200,
    offset: 0,
  }), [search, statusFilter, paymentFilter]);

  const ordersQ = useListOrdersAdminQuery(queryParams as any, {
    refetchOnMountOrArgChange: true,
  } as any);

  const subsQ = useListSubscriptionsAdminQuery({ limit: 200, offset: 0 } as any, {
    refetchOnMountOrArgChange: true,
  } as any);

  const [cancelSub, cancelState] = useCancelSubscriptionAdminMutation();

  const orders: OrderDto[] = React.useMemo(() => {
    return ((ordersQ.data as any)?.items ?? []) as OrderDto[];
  }, [ordersQ.data]);

  const totalOrders: number = React.useMemo(() => {
    const t = (ordersQ.data as any)?.total;
    return typeof t === 'number' ? t : orders.length;
  }, [ordersQ.data, orders.length]);

  const subscriptions: SubscriptionDto[] = React.useMemo(() => {
    return ((subsQ.data as any)?.items ?? []) as SubscriptionDto[];
  }, [subsQ.data]);

  const busy = ordersQ.isLoading || ordersQ.isFetching || subsQ.isLoading || cancelState.isLoading;

  async function onCancelSubscription(sub: SubscriptionDto) {
    const ok = window.confirm(`"${sub.paypal_subscription_id}" aboneliği iptal edilsin mi?`);
    if (!ok) return;
    try {
      await cancelSub({ id: sub.id }).unwrap();
      toast.success('Abonelik iptal edildi');
      subsQ.refetch();
    } catch (err: any) {
      toast.error(err?.data?.error?.message || 'İptal edilemedi');
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">Siparişler & Abonelikler</h1>
        <p className="text-sm text-muted-foreground">Müşteri siparişlerini ve abonelikleri yönetin.</p>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Siparişler ({totalOrders})</TabsTrigger>
          <TabsTrigger value="subscriptions">Abonelikler ({subscriptions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="gap-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-base">Filtreler</CardTitle>
                <Button variant="outline" onClick={() => ordersQ.refetch()} disabled={busy}>
                  <RefreshCcw className="mr-2 size-4" /> Yenile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Arama</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Sipariş no, e-posta..."
                      className="pl-9"
                      disabled={busy}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Sipariş Durumu</Label>
                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} disabled={busy}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
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
                  <Select value={paymentFilter} onValueChange={(v) => setPaymentFilter(v as any)} disabled={busy}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="unpaid">Ödenmedi</SelectItem>
                      <SelectItem value="paid">Ödendi</SelectItem>
                      <SelectItem value="failed">Başarısız</SelectItem>
                      <SelectItem value="refunded">İade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="hidden rounded-md border md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sipariş No</TableHead>
                      <TableHead>Müşteri</TableHead>
                      <TableHead>Tutar</TableHead>
                      <TableHead>Tip</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Ödeme</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead className="text-right">İşlem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-mono text-sm">{o.order_number}</TableCell>
                        <TableCell>
                          <div>{o.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                        </TableCell>
                        <TableCell className="font-medium">{formatPrice(o.total_amount)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {o.payment_type === 'subscription' ? 'Aylık' : 'Tek Sefer'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={STATUS_BADGE[o.status] || ''}>{o.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={PAYMENT_BADGE[o.payment_status] || ''}>{o.payment_status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{formatDate(o.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/orders/${o.id}`)}
                          >
                            <Eye className="mr-1 size-4" /> Detay
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!busy && orders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                          Sipariş bulunamadı
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile */}
              <div className="rounded-md border md:hidden">
                <div className="divide-y">
                  {orders.map((o) => (
                    <div key={o.id} className="space-y-2 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">{o.order_number}</span>
                        <Badge className={STATUS_BADGE[o.status] || ''}>{o.status}</Badge>
                      </div>
                      <div className="text-sm">
                        <div>{o.customer_name} — {o.customer_email}</div>
                        <div className="font-medium">{formatPrice(o.total_amount)}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/orders/${o.id}`)}
                      >
                        <Eye className="mr-1 size-4" /> Detay
                      </Button>
                    </div>
                  ))}
                  {!busy && orders.length === 0 && (
                    <div className="p-6 text-center text-sm text-muted-foreground">Sipariş bulunamadı</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader className="gap-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Abonelikler</CardTitle>
                <Button variant="outline" onClick={() => subsQ.refetch()} disabled={busy}>
                  <RefreshCcw className="mr-2 size-4" /> Yenile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-posta</TableHead>
                      <TableHead>PayPal Sub ID</TableHead>
                      <TableHead>Plan ID</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Dönem</TableHead>
                      <TableHead className="text-right">İşlem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.customer_email}</TableCell>
                        <TableCell className="font-mono text-xs">{s.paypal_subscription_id || '—'}</TableCell>
                        <TableCell className="font-mono text-xs">{s.paypal_plan_id || '—'}</TableCell>
                        <TableCell>
                          <Badge className={SUB_STATUS_BADGE[s.status] || ''}>{s.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {s.current_period_start ? formatDate(s.current_period_start) : '—'}
                          {s.current_period_end ? ` → ${formatDate(s.current_period_end)}` : ''}
                        </TableCell>
                        <TableCell className="text-right">
                          {s.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-destructive text-destructive"
                              onClick={() => onCancelSubscription(s)}
                              disabled={busy}
                            >
                              İptal Et
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {!busy && subscriptions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                          Abonelik bulunamadı
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
