// Importa utilitário para concatenar classes condicionalmente
import { clsx, type ClassValue } from "clsx";
// Importa utilitário para resolver conflitos de classes Tailwind
import { twMerge } from "tailwind-merge";

// Função que combina classes CSS, resolve conflitos e retorna uma string limpa
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}