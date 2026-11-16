export const MAX_CV_SIZE = 4 * 1024 * 1024;
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx'];

export function getCvExtension(filename: string): string | undefined {
  const dot = filename.lastIndexOf('.');
  if (dot < 0) return undefined;
  const extension = filename.slice(dot + 1).toLowerCase();
  return CV_EXTENSIONS.includes(extension) ? extension : undefined;
}
