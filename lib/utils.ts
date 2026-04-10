import { Product } from "@/types/product";

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const shortenTitle = (title: string, max = 40): string => {
  return title.length > max ? title.slice(0, max) + "..." : title;
};