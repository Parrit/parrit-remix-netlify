import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const clsy = (...classes: ClassValue[]) => twMerge(clsx(classes));
