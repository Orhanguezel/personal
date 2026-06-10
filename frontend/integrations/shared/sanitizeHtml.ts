import DOMPurify from 'isomorphic-dompurify';

const purifier = DOMPurify as unknown as {
  sanitize: (input: string, config?: Record<string, unknown>) => string;
};

const ALLOWED_TAGS = [
  'a',
  'abbr',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'col',
  'colgroup',
  'div',
  'em',
  'figcaption',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
];

const ALLOWED_ATTR = [
  'alt',
  'aria-label',
  'class',
  'colspan',
  'height',
  'href',
  'loading',
  'rel',
  'rowspan',
  'src',
  'target',
  'title',
  'width',
];

export function sanitizeHtml(input: unknown): string {
  const html = typeof input === 'string' ? input : String(input ?? '');
  if (!html.trim()) return '';

  return purifier.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['style'],
    ADD_ATTR: ['target'],
  });
}
