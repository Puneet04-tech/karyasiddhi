import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'text-green-500';
  if (progress >= 50) return 'text-yellow-500';
  return 'text-red-500';
}

export function getProgressGradient(progress: number): string {
  if (progress >= 80) return 'from-green-600 to-green-700';
  if (progress >= 50) return 'from-yellow-600 to-yellow-700';
  return 'from-red-600 to-red-700';
}
