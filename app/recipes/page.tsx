import Link from "next/link"
import { Filter, Search } from "lucide-react"

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Recipes</h1>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="breakfast">Breakfast</option>
                <option value="main-course">Main Course</option>
                <option value="desserts">Desserts</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
              <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
                <Filter size={18} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Recipe Image</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                    {recipe.category}
                  </span>
                  <span className="text-gray-500 text-sm">{recipe.time} mins</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{recipe.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
              </div>
            </Link>
          ))}
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
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    description:
      "A comforting Italian classic made with arborio rice, mushrooms, white wine, and parmesan cheese for a rich and creamy texture.",
    category: "Main Course",
    time: 40,
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    description:
      "Indulge in this decadent dessert featuring a warm chocolate cake with a gooey molten center, perfect for chocolate lovers.",
    category: "Desserts",
    time: 25,
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    description:
      "A quick and healthy meal packed with colorful vegetables and tossed in a savory sauce. Perfect for busy weeknights.",
    category: "Vegetarian",
    time: 20,
  },
  {
    id: 5,
    title: "Blueberry Pancakes",
    description:
      "Fluffy pancakes studded with fresh blueberries and drizzled with maple syrup. A weekend breakfast favorite!",
    category: "Breakfast",
    time: 30,
  },
  {
    id: 6,
    title: "Beef Lasagna",
    description:
      "Layers of pasta, rich meat sauce, and creamy béchamel topped with melted cheese. A classic comfort food dish.",
    category: "Main Course",
    time: 90,
  },
]
