Yeni bir UI bileşeni oluştur: $ARGUMENTS

## Bileşen Yapısı

```
src/components/
  [ComponentName]/
    index.ts                    ← barrel export
    [ComponentName].tsx         ← ana bileşen
    [ComponentName].types.ts    ← prop tipleri
    [ComponentName].test.tsx    ← testler
    [ComponentName].stories.tsx ← storybook (varsa)
    use[ComponentName].ts       ← custom hook (gerekiyorsa)
```

## TypeScript Kuralları

```typescript
// Props interface'i — her prop açıklamalı
interface ComponentNameProps {
  /** Bileşenin benzersiz kimliği */
  id: string;
  /** Yükleniyor durumu */
  isLoading?: boolean;
  /** Değişiklik callback'i */
  onChange?: (value: string) => void;
  /** Alt bileşenler */
  children?: React.ReactNode;
}

// Default props ayrı tanımla
const defaultProps: Partial<ComponentNameProps> = {
  isLoading: false,
};
```

## Bileşen Kuralları

1. **Functional component** — class component YASAK
2. **Tek sorumluluk** — 200 satırı aşmamalı
3. **Tüm metinler DB'den** — hard-coded UI metni YASAK
   ```typescript
   // ❌ YANLIŞ
   <button>Kaydet</button>

   // ✅ DOĞRU
   <button>{t('common.button.save')}</button>
   ```
4. **Presentational vs Container ayrımı**
   - Presentational: sadece UI render, props ile veri alır
   - Container: data fetching, state management, hook'lar
5. **Composition over inheritance** — HOC yerine custom hook veya render prop
6. **Memoization** — pahalı hesaplamalar için `useMemo`, callback'ler için `useCallback`
7. **Error boundary** ile sarmalama
8. **Loading state** — skeleton veya spinner
9. **Empty state** — veri yokken anlamlı mesaj (DB'den)
10. **Accessible** — ARIA label'ları, keyboard navigation, semantic HTML

## Reusable Bileşen Kontrol Listesi

- [ ] Generic mi? (farklı context'lerde kullanılabilir mi?)
- [ ] Prop'lar minimal ve anlaşılır mı?
- [ ] Stil özelleştirilebilir mi? (className, style prop veya variant)
- [ ] Controlled ve uncontrolled kullanımı destekliyor mu?
- [ ] Forwardref gerekiyor mu?
- [ ] Tema/dark mode uyumlu mu?
- [ ] Responsive mi?
- [ ] Test yazıldı mı?
- [ ] Storybook story'si var mı?
