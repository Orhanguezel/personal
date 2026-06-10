'use client';

import * as React from 'react';
import { MessageSquare, RefreshCcw, Send, Search } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { ChatContextType, ChatThreadAdminItem } from '@/integrations/shared';
import {
  useListChatMessagesAdminQuery,
  useListChatThreadsAdminQuery,
  usePostChatMessageAdminMutation,
} from '@/integrations/hooks';

type ContextFilter = 'all' | ChatContextType;

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

const shortId = (value: string) => (value.length > 10 ? `${value.slice(0, 8)}...` : value);

export default function AdminChatClient() {
  const [contextType, setContextType] = React.useState<ContextFilter>('all');
  const [contextId, setContextId] = React.useState('');
  const [selected, setSelected] = React.useState<ChatThreadAdminItem | null>(null);
  const [reply, setReply] = React.useState('');

  const listParams = React.useMemo(
    () => ({
      context_type: contextType === 'all' ? undefined : contextType,
      context_id: contextId.trim() || undefined,
      limit: 100,
      offset: 0,
    }),
    [contextId, contextType],
  );

  const threadsQ = useListChatThreadsAdminQuery(listParams, { refetchOnMountOrArgChange: true });
  const messagesQ = useListChatMessagesAdminQuery(
    { threadId: selected?.thread.id ?? '', limit: 100 },
    { skip: !selected?.thread.id, refetchOnMountOrArgChange: true },
  );
  const [postMessage, postState] = usePostChatMessageAdminMutation();

  const threads = threadsQ.data ?? [];
  const messages = messagesQ.data ?? [];
  const busy = threadsQ.isFetching || messagesQ.isFetching || postState.isLoading;

  React.useEffect(() => {
    if (!selected && threads.length > 0) setSelected(threads[0] ?? null);
    if (selected && !threads.some((item) => item.thread.id === selected.thread.id)) {
      setSelected(threads[0] ?? null);
    }
  }, [selected, threads]);

  async function sendReply() {
    if (!selected) return;
    const text = reply.trim();
    if (!text) return;

    try {
      await postMessage({
        threadId: selected.thread.id,
        body: {
          text,
          client_id: `admin-${Date.now()}`,
        },
      }).unwrap();
      setReply('');
      messagesQ.refetch();
      threadsQ.refetch();
      toast.success('Mesaj gönderildi.');
    } catch (err: any) {
      toast.error(err?.data?.error?.message || err?.message || 'Mesaj gönderilemedi.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Chat</h1>
          <p className="text-sm text-muted-foreground">Thread mesajlarını görüntüle ve admin yanıtı yaz.</p>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={() => threadsQ.refetch()} disabled={busy}>
          <RefreshCcw className="mr-2 size-4" />
          Yenile
        </Button>
      </div>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle className="text-base">Filtreler</CardTitle>
          <CardDescription>Context tipine veya context ID’ye göre daralt.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-[180px_1fr]">
            <div className="space-y-2">
              <Label>Context</Label>
              <Select value={contextType} onValueChange={(value) => setContextType(value as ContextFilter)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="job">Job</SelectItem>
                  <SelectItem value="request">Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chat-context-id">Context ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="chat-context-id"
                  value={contextId}
                  onChange={(event) => setContextId(event.target.value)}
                  placeholder="UUID ile filtrele..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader className="gap-2">
            <CardTitle className="text-base">Threads</CardTitle>
            <CardDescription>{threads.length} kayıt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {threadsQ.isLoading ? (
              <div className="text-sm text-muted-foreground">Yükleniyor...</div>
            ) : threads.length ? (
              threads.map((item) => {
                const isActive = selected?.thread.id === item.thread.id;
                return (
                  <button
                    key={item.thread.id}
                    type="button"
                    onClick={() => setSelected(item)}
                    className={`w-full rounded-md border p-3 text-left transition ${
                      isActive ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge variant="outline">{item.thread.context_type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {Number(item.message_count ?? 0)} mesaj
                      </span>
                    </div>
                    <div className="text-sm font-medium">{shortId(item.thread.context_id)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatDate(item.thread.updated_at)}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-sm text-muted-foreground">Thread bulunamadı.</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="gap-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="size-4" />
              Mesajlar
            </CardTitle>
            <CardDescription>
              {selected
                ? `${selected.thread.context_type} / ${selected.thread.context_id}`
                : 'Bir thread seçin.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-h-80 max-h-[520px] space-y-3 overflow-y-auto rounded-md border p-3">
              {!selected ? (
                <div className="text-sm text-muted-foreground">Seçili thread yok.</div>
              ) : messagesQ.isFetching ? (
                <div className="text-sm text-muted-foreground">Mesajlar yükleniyor...</div>
              ) : messages.length ? (
                messages.map((message) => (
                  <div key={message.id} className="rounded-md bg-muted/40 p-3">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium">{shortId(message.sender_user_id)}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                    <p className="whitespace-pre-line text-sm">{message.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">Mesaj yok.</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chat-admin-reply">Admin yanıtı</Label>
              <Textarea
                id="chat-admin-reply"
                rows={4}
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Yanıt yaz..."
                disabled={!selected || busy}
              />
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => sendReply()} disabled={!selected || busy || !reply.trim()}>
                <Send className="mr-2 size-4" />
                Gönder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
