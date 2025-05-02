import Link from "next/link"
import { Clock, Users, ChevronLeft, Bookmark, Share2, ThumbsUp } from "lucide-react"

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the recipe based on the ID
  const recipe = recipes.find((r) => r.id === Number.parseInt(params.id)) || recipes[0]

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/recipes" className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6">
          <ChevronLeft size={20} />
          <span>Back to recipes</span>
        </Link>

        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} />
              <span>{recipe.time} mins</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} />
              <span>{recipe.servings} servings</span>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-600 text-sm font-medium rounded-full">
              {recipe.category}
            </span>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
              <Bookmark size={18} />
              <span>Save Recipe</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ThumbsUp size={18} />
              <span>Like</span>
            </button>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400">
          Recipe Image
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex-shrink-0 mt-1"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

const recipes = [
  {
    id: 1,
    title: "Avocado Toast with Poached Eggs",
    description:
      "Start your day with this nutritious and delicious breakfast that combines creamy avocado with perfectly poached eggs on toasted sourdough bread.",
    category: "Breakfast",
    time: 15,
    servings: 2,
    ingredients: [
      "2 slices of sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tablespoon white vinegar",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "Fresh herbs like cilantro or chives (optional)",
    ],
    instructions: [
      "Toast the sourdough bread slices until golden and crispy.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl. Mash with a fork and season with salt and pepper.",
      "Bring a pot of water to a gentle simmer. Add the white vinegar.",
      "Crack each egg into a small bowl. Create a gentle whirlpool in the simmering water and carefully slide the eggs in one at a time.",
      "Cook for about 3 minutes for a runny yolk, or longer if desired.",
      "Spread the mashed avocado on the toast slices.",
      "Remove the poached eggs with a slotted spoon, drain excess water, and place on top of the avocado toast.",
      "Season with salt, pepper, and red pepper flakes if desired. Garnish with fresh herbs.",
    ],
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    description:
      "A comforting Italian classic made with arborio rice, mushrooms, white wine, and parmesan cheese for a rich and creamy texture.",
    category: "Main Course",
    time: 40,
    servings: 4,
    ingredients: [
      "1 1/2 cups arborio rice",
      "6 cups vegetable or chicken broth, kept warm",
      "1 lb mixed mushrooms, sliced",
      "1 medium onion, finely diced",
      "3 cloves garlic, minced",
      "1/2 cup dry white wine",
      "1/2 cup grated Parmesan cheese",
      "2 tablespoons butter",
      "2 tablespoons olive oil",
      "Fresh thyme leaves",
      "Salt and pepper to taste",
    ],
    instructions: [
      "In a large pot, heat the broth and keep it warm over low heat.",
      "In a large, heavy-bottomed pan, heat 1 tablespoon of olive oil over medium-high heat. Add the mushrooms and cook until golden brown. Remove and set aside.",
      "In the same pan, heat the remaining olive oil. Add the onion and cook until translucent, about 3-4 minutes.",
      "Add the garlic and cook for another minute until fragrant.",
      "Add the arborio rice and stir to coat with oil. Toast for 1-2 minutes.",
      "Pour in the white wine and stir until absorbed.",
      "Begin adding the warm broth, one ladle at a time, stirring frequently. Wait until each addition is absorbed before adding more.",
      "Continue this process for about 18-20 minutes, until the rice is creamy and al dente.",
      "Stir in the cooked mushrooms, butter, and Parmesan cheese. Season with salt and pepper.",
      "Garnish with fresh thyme leaves and additional Parmesan if desired. Serve immediately.",
    ],
  },
]
