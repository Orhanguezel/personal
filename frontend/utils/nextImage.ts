const ALLOWED_HOSTS = new Set([
  'images.unsplash.com',
  'cdn.gzltemizlik.com',
  'gzltemizlik.com',
  'www.gzltemizlik.com',
  'res.cloudinary.com',
  'localhost',
  '127.0.0.1',
]);

export function shouldUnoptimizeImage(src: string): boolean {
  // Imported Bionluk images are already resized WebP assets. Serving them
  // directly avoids an unnecessary second optimization pass.
  if (src.startsWith('/assets/bionluk/')) return true;
  if (!/^https?:\/\//i.test(src)) return false;
  try {
    return !ALLOWED_HOSTS.has(new URL(src).hostname);
  } catch {
    return true;
  }
}
