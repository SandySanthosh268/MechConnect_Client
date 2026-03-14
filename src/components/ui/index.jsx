import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export * from './Button';
export * from './Card';
export * from './MechanicCard';
export * from './BookingCard';
export * from './RatingStars';
export { default as Notification } from './Notification';
export { default as Loader } from '../common/Loader';
