import Link from "next/link"
import { BookOpen, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl">FoodBook</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Your personal cookbook in the cloud. Save your favorite recipes, discover new ones, and share with friends
              and family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-gray-400 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/add-recipe" className="text-gray-400 hover:text-white transition-colors">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes?category=breakfast" className="text-gray-400 hover:text-white transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=main-course" className="text-gray-400 hover:text-white transition-colors">
                  Main Course
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=desserts" className="text-gray-400 hover:text-white transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=vegetarian" className="text-gray-400 hover:text-white transition-colors">
                  Vegetarian
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} FoodBook. All rights reserved.</p>
        </div>
      </div>
    </footer>

  )
}
