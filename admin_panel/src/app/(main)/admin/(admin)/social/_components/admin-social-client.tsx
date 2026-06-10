'use client';

import * as React from 'react';
import {
  CalendarClock,
  Check,
  ExternalLink,
  Pencil,
  RefreshCcw,
  Send,
  Trash2,
  X,
} from 'lucide-react';
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

import { BASE_URL } from '@/integrations/apiBase';
import type { SocialPost, SocialPostStatus } from '@/integrations/shared/social';
import {
  useApproveSocialPostAdminMutation,
  useCancelSocialPostAdminMutation,
  useDeleteSocialPostAdminMutation,
  useGetLinkedInStatusAdminQuery,
  useListSocialPostsAdminQuery,
  useUpdateSocialPostAdminMutation,
} from '@/integrations/hooks';

type StatusFilter = 'all' | SocialPostStatus;

const STATUS_LABELS: Record<SocialPostStatus, string> = {
  draft: 'Taslak',
  queued: 'Kuyrukta',
  posting: 'Gönderiliyor',
  posted: 'Yayınlandı',
  failed: 'Hatalı',
  canceled: 'İptal',
};

function statusVariant(status: SocialPostStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (status === 'posted') return 'secondary';
  if (status === 'failed') return 'destructive';
  if (status === 'draft' || status === 'canceled') return 'outline';
  return 'default';
}

function formatDate(value: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function toDatetimeLocal(value: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDatetimeLocal(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function contentPreview(value: string | null) {
  const clean = (value ?? '').replace(/\s+/g, ' ').trim();
  if (!clean) return '—';
  return clean.length > 150 ? `${clean.slice(0, 150).trimEnd()}...` : clean;
}

function apiHref(path: string) {
  const base = BASE_URL.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

function EditDialog({
  post,
  open,
  onOpenChange,
}: {
  post: SocialPost | null;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [updatePost, updateState] = useUpdateSocialPostAdminMutation();
  const [approvePost, approveState] = useApproveSocialPostAdminMutation();
  const [content, setContent] = React.useState('');
  const [link, setLink] = React.useState('');
  const [scheduledAt, setScheduledAt] = React.useState('');

  React.useEffect(() => {
    if (!post) return;
    setContent(post.content ?? '');
    setLink(post.link ?? '');
    setScheduledAt(toDatetimeLocal(post.scheduled_at));
  }, [post]);

  async function save() {
    if (!post) return;
    await updatePost({
      id: post.id,
      patch: {
        content,
        link: link.trim() || null,
        scheduled_at: fromDatetimeLocal(scheduledAt),
      },
    }).unwrap();
    toast.success('Gönderi güncellendi');
    onOpenChange(false);
  }

  async function saveAndApprove() {
    if (!post) return;
    await updatePost({
      id: post.id,
      patch: {
        content,
        link: link.trim() || null,
        scheduled_at: fromDatetimeLocal(scheduledAt),
      },
    }).unwrap();
    await approvePost({ id: post.id, scheduled_at: fromDatetimeLocal(scheduledAt) }).unwrap();
    toast.success('Gönderi kuyruğa alındı');
    onOpenChange(false);
  }

  const busy = updateState.isLoading || approveState.isLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>LinkedIn gönderisi</DialogTitle>
          <DialogDescription>Taslak metni, link kartını ve zamanlamayı düzenle.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>İçerik</Label>
            <Textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={3000}
              className="min-h-56 resize-y"
            />
            <div className="text-right text-xs text-muted-foreground">{content.length}/3000</div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="space-y-2">
              <Label>Link</Label>
              <Input value={link} onChange={(event) => setLink(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Zaman</Label>
              <Input
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Kapat
          </Button>
          <Button type="button" variant="outline" onClick={save} disabled={busy}>
            <Pencil className="size-4" />
            Kaydet
          </Button>
          <Button type="button" onClick={saveAndApprove} disabled={busy || !content.trim()}>
            <Check className="size-4" />
            Onayla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSocialClient() {
  const [status, setStatus] = React.useState<StatusFilter>('all');
  const [editingPost, setEditingPost] = React.useState<SocialPost | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const listQuery = useListSocialPostsAdminQuery(
    { status: status === 'all' ? undefined : status, limit: 200, offset: 0 },
    { refetchOnMountOrArgChange: true },
  );
  const linkedinQuery = useGetLinkedInStatusAdminQuery();
  const [approvePost, approveState] = useApproveSocialPostAdminMutation();
  const [cancelPost, cancelState] = useCancelSocialPostAdminMutation();
  const [deletePost, deleteState] = useDeleteSocialPostAdminMutation();

  const rows = listQuery.data ?? [];
  const busy = approveState.isLoading || cancelState.isLoading || deleteState.isLoading;

  function openEditor(post: SocialPost) {
    setEditingPost(post);
    setDialogOpen(true);
  }

  async function approveNow(post: SocialPost) {
    await approvePost({ id: post.id, scheduled_at: post.scheduled_at }).unwrap();
    toast.success('Gönderi kuyruğa alındı');
  }

  async function cancel(id: string) {
    await cancelPost(id).unwrap();
    toast.success('Gönderi iptal edildi');
  }

  async function remove(id: string) {
    await deletePost(id).unwrap();
    toast.success('Gönderi silindi');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">LinkedIn Paylaşımları</h1>
          <p className="text-sm text-muted-foreground">
            Yayına alınan projelerden oluşan taslakları düzenle, zamanla ve kuyruğa al.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              listQuery.refetch();
              linkedinQuery.refetch();
            }}
            disabled={listQuery.isFetching || linkedinQuery.isFetching}
          >
            <RefreshCcw className="size-4" />
            Yenile
          </Button>
          <Button size="sm" asChild>
            <a href={apiHref('/admin/linkedin/connect')}>
              <ExternalLink className="size-4" />
              Bağlan
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Liste filtresi</CardTitle>
            <CardDescription>Status seçerek kuyruğu daralt.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-[220px_1fr]">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">LinkedIn</CardTitle>
            <CardDescription>Bağlantı ve token durumu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Bağlantı</span>
              <Badge variant={linkedinQuery.data?.connected ? 'secondary' : 'outline'}>
                {linkedinQuery.data?.connected ? 'Bağlı' : 'Bekliyor'}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Paylaşım</span>
              <Badge variant={linkedinQuery.data?.enabled ? 'secondary' : 'outline'}>
                {linkedinQuery.data?.enabled ? 'Aktif' : 'Kapalı'}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Org URN</span>
              <Badge variant={linkedinQuery.data?.org_urn_configured ? 'secondary' : 'destructive'}>
                {linkedinQuery.data?.org_urn_configured ? 'Hazır' : 'Eksik'}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Token bitişi</span>
              <div className="text-xs">{formatDate(linkedinQuery.data?.token_expires_at ?? null)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gönderiler</CardTitle>
          <CardDescription>Dispatcher yalnızca queued ve zamanı gelen kayıtları yayınlar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead>İçerik</TableHead>
                <TableHead className="w-[180px]">Zaman</TableHead>
                <TableHead className="w-[90px]">Deneme</TableHead>
                <TableHead className="w-[260px] text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && !listQuery.isFetching && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">
                    Kayıt yok.
                  </TableCell>
                </TableRow>
              )}
              {rows.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Badge variant={statusVariant(post.status)}>{STATUS_LABELS[post.status]}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[520px]">
                    <div className="line-clamp-2 text-sm">{contentPreview(post.content)}</div>
                    {post.error_message ? (
                      <div className="mt-1 line-clamp-1 text-xs text-destructive">{post.error_message}</div>
                    ) : null}
                    {post.link ? (
                      <a
                        className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="size-3" />
                        <span className="truncate">{post.link}</span>
                      </a>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="size-4 text-muted-foreground" />
                      {formatDate(post.scheduled_at)}
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">{post.retry_count}/3</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button variant="outline" size="icon-sm" onClick={() => openEditor(post)} title="Düzenle">
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => approveNow(post)}
                        disabled={busy || post.status === 'posted' || post.status === 'posting'}
                        title="Onayla"
                      >
                        <Send className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => cancel(post.id)}
                        disabled={busy || post.status === 'posted' || post.status === 'canceled'}
                        title="İptal"
                      >
                        <X className="size-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => remove(post.id)}
                        disabled={busy || post.status === 'posting'}
                        title="Sil"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditDialog post={editingPost} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
