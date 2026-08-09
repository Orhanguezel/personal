// src/db/seed/utils.ts

/**
 * SQL'i tek geçişte tarayıp string/identifier/yorum sınırlarını doğru izler.
 *
 * NEDEN (2026-08-08): Önceki hâli düz regex kullanıyordu ve bir metin değerinin
 * İÇİNDEKİ `;` + satırsonu ya da `--` dizisi cümleyi ortasından bölüyor /
 * içeriği yorum sanıp siliyordu. gzlteknoloji içeriği taşınırken bu, geçerli bir
 * seed dosyasında ER_PARSE_ERROR olarak patladı. Uzun HTML/markdown içerik
 * taşıyan her seed bu riski taşır; ayrıştırıcı artık tırnak duyarlı.
 *
 * Desteklenen sınırlar: '...' (ve '' kaçışı), "...", `...`, \ kaçışı,
 * -- satır yorumu, # satır yorumu, /* blok yorumu *​/
 */
type Scan = { text: string; statements: string[] };

function scanSql(input: string, opts: { stripComments: boolean }): Scan {
  let out = '';
  const statements: string[] = [];
  let current = '';

  const push = (ch: string) => { out += ch; current += ch; };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];

    // — yorumlar —
    if (ch === '-' && next === '-') {
      const end = input.indexOf('\n', i);
      const stop = end === -1 ? input.length : end;
      if (!opts.stripComments) { const c = input.slice(i, stop); out += c; current += c; }
      i = stop - 1;
      continue;
    }
    if (ch === '#') {
      const end = input.indexOf('\n', i);
      const stop = end === -1 ? input.length : end;
      if (!opts.stripComments) { const c = input.slice(i, stop); out += c; current += c; }
      i = stop - 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = input.indexOf('*/', i + 2);
      const stop = end === -1 ? input.length : end + 2;
      if (!opts.stripComments) { const c = input.slice(i, stop); out += c; current += c; }
      i = stop - 1;
      continue;
    }

    // — tırnaklı bölgeler: içeride hiçbir şey yorumlanmaz —
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      push(ch);
      i++;
      for (; i < input.length; i++) {
        const c = input[i];
        if (c === '\\' && quote !== '`') {
          push(c);
          if (i + 1 < input.length) push(input[++i]);
          continue;
        }
        if (c === quote) {
          // '' / "" / `` kaçışı
          if (input[i + 1] === quote) { push(c); push(input[++i]); continue; }
          push(c);
          break;
        }
        push(c);
      }
      continue;
    }

    // — cümle sınırı —
    if (ch === ';') {
      current += ch;
      out += ch;
      const trimmed = current.trim();
      if (trimmed && trimmed !== ';') statements.push(trimmed);
      current = '';
      continue;
    }

    push(ch);
  }

  const tail = current.trim();
  if (tail && tail !== ';') statements.push(tail.endsWith(';') ? tail : tail + ';');

  return { text: out, statements };
}

// Yorumları temizle (tırnak içindekilere dokunmadan)
export function cleanSql(input: string): string {
  return scanSql(input, { stripComments: true }).text;
}

// Cümlelere ayır (tırnak içindeki `;` cümleyi bölmez)
export function splitStatements(sql: string): string[] {
  return scanSql(sql, { stripComments: false }).statements;
}

export function logStep(msg: string) {
  const ts = new Date().toISOString().replace('T',' ').replace('Z','');
  console.log(`[${ts}] ${msg}`);
}


export function projectColumns(selectParam: unknown, allowed: string[]): string {
  const allow = new Set(allowed);
  if (typeof selectParam !== "string" || !selectParam.trim() || selectParam === "*") {
    return allowed.join(", ");
  }
  const cols = selectParam
    .split(",")
    .map((s) => s.trim())
    .filter((c) => allow.has(c));
  return (cols.length ? cols : allowed).join(", ");
}

export function parseOrder(
  orderParam: unknown,
  allowedCols: string[],
  defaultCol = "created_at",
  defaultDir: "desc" | "asc" = "desc"
) {
  const s = typeof orderParam === "string" ? orderParam : "";
  const [c, d] = s.split(".");
  const col = allowedCols.includes(c || "") ? c! : defaultCol;
  const dir = d?.toLowerCase() === "asc" ? "ASC" : defaultDir.toUpperCase();
  return { col, dir };
}

export function toNumber(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return null;
}
