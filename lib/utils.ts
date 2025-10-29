import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 获取资源路径，自动处理 basePath
 * @param path 资源路径（以 / 开头）
 * @returns 完整的资源路径
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/tech' : '';
  return `${basePath}${path}`;
}
