export type Category = 'Breakfast' | 'Lunch' | 'Dinner' | 'Quick Meals' | 'Desserts' | 'Healthy';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  cookingTime: string;
  difficulty: Difficulty;
  servings: number;
  calories?: number;
  imageUrl: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  isFeatured?: boolean;
}
