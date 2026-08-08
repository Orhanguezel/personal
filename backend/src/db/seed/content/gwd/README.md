# content/gwd — Guzel Web Design icerigi

Bu dizin `SEED_PROFILE=gwd` calistiginda, `sql/` bittikten **sonra** uygulanir.

**Su an bos.** Guzel Web Design icerigi hala `sql/` altinda duruyor ve orada
`profiles.json` icinde `content:gwd` olarak siniflandirilmis durumda (33 dosya).
Boylece mevcut guezelwebdesign.com deploy'unun davranisi **hic degismedi** —
migrasyon sirasinda regresyon riski alinmadi.

Zamanla `sql/` icindeki `content:gwd` dosyalari buraya tasinabilir; tasindiklarinda
`profiles.json` -> `files` icinden kaydi silmek yeterlidir (bu dizindeki dosyalar
siniflandirma gerektirmez, zaten profile aittir).

Yeni **GWD'ye ozel** icerik seed'i yazarken tercih edilen yer burasidir.
