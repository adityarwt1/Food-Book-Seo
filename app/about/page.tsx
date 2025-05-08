import Link from "next/link"
import { ArrowRight, Heart, Utensils, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-amber-500">FoodBook</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personal cookbook in the cloud. We're on a mission to help people discover, save, and share amazing
            recipes.
          </p>
        </div>
      </section>
      <div className="flex flex-col justify-center items-center">
        <Image src="/dp.jpg" width={100} height={100} className="rounded-full" alt="Creator Image"/>
        <div><Link href={``} ></Link></div>
      </div>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="bg-gray-50 p-8 rounded-xl">
            <p className="text-gray-700 mb-4">
              FoodBook started with a simple idea: to create a place where food lovers could easily store and share
              their favorite recipes. Our founder, a passionate home cook, was tired of losing handwritten recipe cards
              and wanted a better way to organize recipes found online.
            </p>
            <p className="text-gray-700 mb-4">
              What began as a personal project quickly grew into something bigger. As friends and family started using
              the platform, we realized there was a real need for a modern, user-friendly recipe management system.
            </p>
            <p className="text-gray-700">
              Today, FoodBook is used by thousands of home cooks, food bloggers, and professional chefs around the
              world. We're constantly improving and adding new features to make your cooking experience even better.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-amber-500" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Inspire</h3>
              <p className="text-gray-600">
                We aim to inspire people to try new recipes and cooking techniques, expanding their culinary horizons.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-amber-500" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Simplify</h3>
              <p className="text-gray-600">
                We strive to make cooking more accessible by providing clear, easy-to-follow recipes for cooks of all
                skill levels.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-amber-500" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Connect</h3>
              <p className="text-gray-600">
                We believe food brings people together, and we're building a community where food lovers can connect and
                share their passion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 px-4 bg-amber-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8">
            Become a part of our growing community of food enthusiasts. Share your recipes, discover new favorites, and
            connect with other cooks.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-amber-500 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Explore Recipes <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
