export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealPreview {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Meal extends MealPreview {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface MealsResponse<T> {
  meals: T[] | null;
}
