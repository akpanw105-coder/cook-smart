import { Recipe, Category, Difficulty } from '@/types/recipe';

// API key must be set via EXPO_PUBLIC_GEMINI_API_KEY environment variable.
// Never commit a real key to source control.
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

interface GeminiGeneratedData {
  name: string;
  category: Category;
  cookingTime: string;
  difficulty: Difficulty;
  servings: number;
  calories: number;
  description: string;
  ingredients: Array<{ name: string; amount: string }>;
  instructions: string[];
}

export async function generateRecipeWithGemini(ingredients: string[]): Promise<Recipe> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'EXPO_PUBLIC_GEMINI_API_KEY is not set. ' +
        'Add it to your .env.local file (or Vercel environment variables) and restart the dev server.'
    );
  }

  const ingredientsStr = ingredients.length > 0 ? ingredients.join(', ') : 'Any common pantry items';

  const prompt = `You are a world-class executive chef and culinary instructor. 
Create a real, unique, delicious recipe based on these specific ingredients: ${ingredientsStr}.

You MUST return ONLY a raw, valid JSON object (no markdown, backticks, or explanations) matching this schema:
{
  "name": "Compelling Recipe Title",
  "category": "Dinner",
  "cookingTime": "25 mins",
  "difficulty": "Easy",
  "servings": 2,
  "calories": 450,
  "description": "An appetizing 1-2 sentence summary of the dish.",
  "ingredients": [
    { "name": "Ingredient name", "amount": "1 cup / 2 tbsp / etc." }
  ],
  "instructions": [
    "First cooking step...",
    "Second cooking step..."
  ]
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API error', response.status, errText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No candidate parts returned from Gemini');
    }

    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed: GeminiGeneratedData = JSON.parse(cleanedText);

    const images = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80',
    ];
    const selectedImage = images[Math.floor(Math.random() * images.length)];

    const recipe: Recipe = {
      id: `gemini-${Date.now()}`,
      name: parsed.name || 'Chef AI Creation',
      category: parsed.category || 'Dinner',
      cookingTime: parsed.cookingTime || '20 mins',
      difficulty: parsed.difficulty || 'Easy',
      servings: parsed.servings || 2,
      calories: parsed.calories || 400,
      imageUrl: selectedImage,
      description: parsed.description || `A custom dish crafted by Gemini AI using ${ingredientsStr}.`,
      ingredients:
        Array.isArray(parsed.ingredients) && parsed.ingredients.length > 0
          ? parsed.ingredients
          : [{ name: ingredients[0] || 'Salt & Pepper', amount: 'To taste' }],
      instructions:
        Array.isArray(parsed.instructions) && parsed.instructions.length > 0
          ? parsed.instructions
          : ['Prepare all ingredients and cook over medium heat until done.'],
    };

    return recipe;
  } catch (err) {
    console.error('Gemini generation error:', err);
    throw err;
  }
}
