// =============================================================
// FILE: src/components/admin/status-tone.ts
//
// DURUM RENKLERI — TEK KANAL
//
// SORUN: Siparis, urun, bildirim ve yorum ekranlari durum rozetlerini
// `bg-green-100 text-green-800` gibi SABIT palet siniflariyla yaziyordu.
// Bu siniflar tema degiskenlerine bagli degil:
//   - koyu temada arka plan acik kaliyor, kontrast bozuluyor;
//   - tema on ayari (brutalist / soft-pop / tangerine) degistiginde
//     rozetler eski renkte kaliyor;
//   - ayni "basarili" durumu her sayfada baska tonda cikiyordu.
//
// COZUM: renkler yalnizca globals.css'teki tema token'larindan turetilir
// (`--color-gm-success`, `--color-gm-gold`, `--color-gm-error`, `--primary`,
// `--muted`). Tema veya on ayar degistiginde rozetler kendiliginden uyar.
// Yeni bir durum rengi gerektiginde SAYFAYA sinif yazilmaz; buraya ton eklenir.
// =============================================================

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'border-gm-success/25 bg-gm-success/10 text-gm-success',
  warning: 'border-gm-gold/30 bg-gm-gold/10 text-gm-gold',
  danger: 'border-gm-error/25 bg-gm-error/10 text-gm-error',
  info: 'border-primary/25 bg-primary/10 text-primary',
  neutral: 'border-border bg-muted text-muted-foreground',
};

/** Rozet/etiket icin ton siniflari. */
export function toneClass(tone: StatusTone): string {
  return TONE_CLASS[tone] ?? TONE_CLASS.neutral;
}

/** Yalnizca ikon/metin renklendirmek icin (arka plansiz). */
export function toneTextClass(tone: StatusTone): string {
  switch (tone) {
    case 'success':
      return 'text-gm-success';
    case 'warning':
      return 'text-gm-gold';
    case 'danger':
      return 'text-gm-error';
    case 'info':
      return 'text-primary';
    default:
      return 'text-muted-foreground';
  }
}

/**
 * Yaygin durum adlarini tona esler. Sayfalar kendi eslemesini yazmak yerine
 * bunu kullanir; boylece ayni durum her ekranda ayni renkte gorunur.
 */
const NAME_TO_TONE: Record<string, StatusTone> = {
  active: 'success',
  published: 'success',
  paid: 'success',
  completed: 'success',
  delivered: 'success',
  approved: 'success',
  resolved: 'success',
  verified: 'success',
  yes: 'success',

  draft: 'warning',
  pending: 'warning',
  processing: 'warning',
  in_progress: 'warning',
  unpaid: 'warning',
  waiting: 'warning',
  suspended: 'warning',

  failed: 'danger',
  cancelled: 'danger',
  canceled: 'danger',
  refunded: 'danger',
  rejected: 'danger',
  error: 'danger',
  no: 'danger',

  new: 'info',
  info: 'info',

  archived: 'neutral',
  expired: 'neutral',
  closed: 'neutral',
  inactive: 'neutral',
  unknown: 'neutral',
};

export function toneOf(status: string | null | undefined): StatusTone {
  const key = String(status ?? '').trim().toLowerCase();
  return NAME_TO_TONE[key] ?? 'neutral';
}

/** Kisayol: durum adindan dogrudan rozet siniflari. */
export function statusClass(status: string | null | undefined): string {
  return toneClass(toneOf(status));
}
