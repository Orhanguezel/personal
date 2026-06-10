'use client';

import * as React from 'react';
import { RefreshCcw, Search, MessageSquare, Trash2, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import type {
  SupportTicketPriority,
  SupportTicketStatus,
  SupportTicketView,
} from '@/integrations/shared';
import {
  useCreateTicketReplyAdminMutation,
  useDeleteSupportTicketAdminMutation,
  useListSupportTicketsAdminQuery,
  useListTicketRepliesAdminQuery,
  useToggleSupportTicketAdminMutation,
  useUpdateSupportTicketAdminMutation,
} from '@/integrations/hooks';

type StatusFilter = 'all' | SupportTicketStatus;
type PriorityFilter = 'all' | SupportTicketPriority;

const STATUS_OPTIONS: Array<{ value: SupportTicketStatus; label: string }> = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'waiting_response', label: 'Waiting response' },
  { value: 'closed', label: 'Closed' },
];

const PRIORITY_OPTIONS: Array<{ value: SupportTicketPriority; label: string }> = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const statusVariant = (status: SupportTicketStatus) =>
  status === 'closed' ? 'secondary' : status === 'waiting_response' ? 'outline' : 'default';

const priorityVariant = (priority: SupportTicketPriority) =>
  priority === 'urgent' || priority === 'high' ? 'destructive' : 'outline';

const formatDate = (value: string | null | undefined) => {
  if (!value) return '-';
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return String(value);
  }
};

export default function AdminSupportClient() {
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [priority, setPriority] = React.useState<PriorityFilter>('all');
  const [selected, setSelected] = React.useState<SupportTicketView | null>(null);
  const [replyMessage, setReplyMessage] = React.useState('');

  const params = React.useMemo(
    () => ({
      q: q.trim() || undefined,
      status: status === 'all' ? undefined : status,
      priority: priority === 'all' ? undefined : priority,
      limit: 200,
      offset: 0,
      sort: 'created_at' as const,
      order: 'desc' as const,
    }),
    [q, status, priority],
  );

  const listQ = useListSupportTicketsAdminQuery(params, { refetchOnMountOrArgChange: true });
  const repliesQ = useListTicketRepliesAdminQuery(
    { ticketId: selected?.id ?? '' },
    { skip: !selected?.id, refetchOnMountOrArgChange: true },
  );

  const [updateTicket, updateState] = useUpdateSupportTicketAdminMutation();
  const [toggleTicket, toggleState] = useToggleSupportTicketAdminMutation();
  const [deleteTicket, deleteState] = useDeleteSupportTicketAdminMutation();
  const [createReply, replyState] = useCreateTicketReplyAdminMutation();

  const rows = listQ.data ?? [];
  const replies = repliesQ.data ?? [];
  const busy =
    listQ.isFetching ||
    updateState.isLoading ||
    toggleState.isLoading ||
    deleteState.isLoading ||
    replyState.isLoading;

  async function saveSelectedPatch(patch: Partial<SupportTicketView>) {
    if (!selected) return;
    try {
      const updated = await updateTicket({ id: selected.id, body: patch }).unwrap();
      setSelected(updated);
      toast.success('Ticket güncellendi.');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Ticket güncellenemedi.');
    }
  }

  async function toggleSelected() {
    if (!selected) return;
    try {
      const action = selected.status === 'closed' ? 'reopen' : 'close';
      const updated = await toggleTicket({ id: selected.id, action }).unwrap();
      setSelected(updated);
      toast.success(action === 'close' ? 'Ticket kapatıldı.' : 'Ticket yeniden açıldı.');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Durum değiştirilemedi.');
    }
  }

  async function removeTicket(ticket: SupportTicketView) {
    const ok = window.confirm(`"${ticket.subject}" ticket kaydı silinsin mi?`);
    if (!ok) return;
    try {
      await deleteTicket(ticket.id).unwrap();
      if (selected?.id === ticket.id) setSelected(null);
      toast.success('Ticket silindi.');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Ticket silinemedi.');
    }
  }

  async function submitReply() {
    if (!selected) return;
    const message = replyMessage.trim();
    if (!message) return;
    try {
      await createReply({ ticket_id: selected.id, message }).unwrap();
      setReplyMessage('');
      repliesQ.refetch();
      listQ.refetch();
      toast.success('Yanıt eklendi.');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Yanıt eklenemedi.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Support</h1>
          <p className="text-sm text-muted-foreground">Ticket durumları, öncelikler ve yanıtlar.</p>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={() => listQ.refetch()} disabled={busy}>
          <RefreshCcw className="mr-2 size-4" />
          Yenile
        </Button>
      </div>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="text-base">Filtreler</CardTitle>
          <CardDescription>Ticket listesinde arama ve durum filtresi.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-[1fr_190px_190px]">
            <div className="space-y-2">
              <Label htmlFor="support-search">Arama</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="support-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Konu veya mesaj..."
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Durum</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {STATUS_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Öncelik</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as PriorityFilter)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {PRIORITY_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="text-base">Tickets</CardTitle>
          <CardDescription>{rows.length} kayıt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Konu</TableHead>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listQ.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-sm text-muted-foreground">
                      Yükleniyor...
                    </TableCell>
                  </TableRow>
                ) : rows.length ? (
                  rows.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium">{ticket.subject}</div>
                          <div className="line-clamp-1 text-sm text-muted-foreground">
                            {ticket.message}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{ticket.user_display_name || ticket.user_id}</div>
                        {ticket.user_email ? (
                          <div className="text-xs text-muted-foreground">{ticket.user_email}</div>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityVariant(ticket.priority)}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(ticket.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setSelected(ticket)}
                          >
                            <MessageSquare className="mr-2 size-4" />
                            Aç
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeTicket(ticket)}
                            disabled={busy}
                            aria-label="Sil"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-sm text-muted-foreground">
                      Kayıt bulunamadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>{selected.subject}</DialogTitle>
                <DialogDescription>
                  {selected.user_display_name || selected.user_id} · {formatDate(selected.created_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-[180px_180px_1fr]">
                <div className="space-y-2">
                  <Label>Durum</Label>
                  <Select
                    value={selected.status}
                    onValueChange={(value) =>
                      saveSelectedPatch({ status: value as SupportTicketStatus })
                    }
                    disabled={busy}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Öncelik</Label>
                  <Select
                    value={selected.priority}
                    onValueChange={(value) =>
                      saveSelectedPatch({ priority: value as SupportTicketPriority })
                    }
                    disabled={busy}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITY_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mesaj</Label>
                  <div className="min-h-24 rounded-md border bg-muted/30 p-3 text-sm">
                    {selected.message}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Yanıtlar</div>
                <div className="max-h-56 space-y-2 overflow-y-auto rounded-md border p-3">
                  {repliesQ.isFetching ? (
                    <div className="text-sm text-muted-foreground">Yanıtlar yükleniyor...</div>
                  ) : replies.length ? (
                    replies.map((reply) => (
                      <div key={reply.id} className="rounded-md bg-muted/40 p-3">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <Badge variant={reply.is_admin ? 'default' : 'outline'}>
                            {reply.is_admin ? 'Admin' : 'User'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(reply.created_at)}
                          </span>
                        </div>
                        <p className="whitespace-pre-line text-sm">{reply.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Henüz yanıt yok.</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-reply">Admin yanıtı</Label>
                <Textarea
                  id="support-reply"
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Müşteriye gönderilecek yanıt..."
                />
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toggleSelected()}
                  disabled={busy}
                >
                  {selected.status === 'closed' ? (
                    <Unlock className="mr-2 size-4" />
                  ) : (
                    <Lock className="mr-2 size-4" />
                  )}
                  {selected.status === 'closed' ? 'Yeniden Aç' : 'Kapat'}
                </Button>
                <Button
                  type="button"
                  onClick={() => submitReply()}
                  disabled={busy || !replyMessage.trim()}
                >
                  Yanıt Gönder
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
