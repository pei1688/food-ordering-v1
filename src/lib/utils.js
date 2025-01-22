import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export function filterFood(food, filter) {
  return filter === "全部"
    ? food
    : food.filter((item) => item.category.name === filter);
}

export function sortFood(food, sortBy) {
  return [...food].sort((a, b) => {
    if (sortBy === "asc") return a.basePrice - b.basePrice;
    if (sortBy === "desc") return b.basePrice - a.basePrice;
    return 0; // 預設排序
  });
}

export function searchFood(food, query) {
  return food.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}
