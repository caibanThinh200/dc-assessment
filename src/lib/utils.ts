import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T>(func: (...args: T[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: T[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    return () => {
      clearTimeout(timeout);
    };
  };
} 