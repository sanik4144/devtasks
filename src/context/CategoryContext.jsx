import { createContext, useContext, useState } from "react";

const DEFAULT_CATEGORIES = ["FEATURE", "BUG", "REFACTOR"];

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("available_categories");
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const addCategory = (name) => {
    const trimmed = name.trim().toUpperCase();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = [...categories, trimmed];
    setCategories(updated);
    localStorage.setItem("available_categories", JSON.stringify(updated));
  };

  const deleteCategory = (name, tasks) => {
    const isInUse = tasks.some((task) => task.category === name);
    if (isInUse) return false;
    const updated = categories.filter((c) => c !== name);
    setCategories(updated);
    localStorage.setItem("available_categories", JSON.stringify(updated));
    return true;
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);