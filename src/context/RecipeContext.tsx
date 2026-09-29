import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '@/types/recipe';
import { INITIAL_RECIPES, MOCK_GENERATED_TEMPLATES } from '@/data/recipes';
import { generateRecipeWithGemini } from '@/services/gemini';

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipeIds: Set<string>;
  saveRecipe: (id: string) => void;
  unsaveRecipe: (id: string) => void;
  toggleSaveRecipe: (id: string) => void;
  isSaved: (id: string) => boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  savedRecipes: Recipe[];
  generateRecipeFromIngredients: (ingredients: string[]) => Promise<Recipe>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [savedRecipeIds, setSavedRecipeIds] = useState<Set<string>>(
    new Set(['rec-1', 'rec-2'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const saveRecipe = (id: string) => {
    setSavedRecipeIds((prev) => new Set(prev).add(id));
  };

  const unsaveRecipe = (id: string) => {
    setSavedRecipeIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isSaved = (id: string) => savedRecipeIds.has(id);

  const getRecipeById = (id: string) => {
    return recipes.find((r) => r.id === id);
  };

  const savedRecipes = recipes.filter((r) => savedRecipeIds.has(r.id));

  const generateRecipeFromIngredients = async (ingredients: string[]): Promise<Recipe> => {
    try {
      // Direct call to Gemini 1.5 Flash using provided key
      const geminiRecipe = await generateRecipeWithGemini(ingredients);
      setRecipes((prev) => [geminiRecipe, ...prev]);
      return geminiRecipe;
    } catch (error) {
      console.warn('Falling back to local culinary generator:', error);
      const baseTemplate =
        MOCK_GENERATED_TEMPLATES[Math.floor(Math.random() * MOCK_GENERATED_TEMPLATES.length)];

      const id = `gen-${Date.now()}`;
      const dynamicIngredients = ingredients.length > 0
        ? ingredients.map((ing) => ({
            name: ing.trim(),
            amount: '1-2 portions',
          }))
        : baseTemplate.ingredients;

      const combinedIngredients = [
        ...dynamicIngredients,
        { name: 'Olive Oil or Butter', amount: '2 tbsp' },
        { name: 'Sea Salt & Cracked Pepper', amount: 'To taste' },
      ];

      const fallbackRecipe: Recipe = {
        ...baseTemplate,
        id,
        name:
          ingredients.length > 0
            ? `${ingredients[0].trim()} & Herb Sensation`
            : baseTemplate.name,
        description: `Crafted from your kitchen pantry using ${ingredients.join(', ') || 'available ingredients'}.`,
        ingredients: combinedIngredients,
      };

      setRecipes((prev) => [fallbackRecipe, ...prev]);
      return fallbackRecipe;
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipeIds,
        saveRecipe,
        unsaveRecipe,
        toggleSaveRecipe,
        isSaved,
        getRecipeById,
        savedRecipes,
        generateRecipeFromIngredients,
        searchQuery,
        setSearchQuery,
      }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
