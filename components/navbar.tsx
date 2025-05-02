"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, BookOpen, User, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-amber-500" />
            <span className="font-bold text-xl text-gray-900">FoodBook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-500 transition-colors">
              Home
            </Link>
            <Link href="/recipes" className="text-gray-700 hover:text-amber-500 transition-colors">
              Recipes
            </Link>
            {session && (
              <Link href="/my-recipes" className="text-gray-700 hover:text-amber-500 transition-colors">
                My Recipes
              </Link>
            )}
            <Link href="/about" className="text-gray-700 hover:text-amber-500 transition-colors">
              About
            </Link>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-amber-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-500"
                >
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <User size={18} />
                  </div>
                  <span className="hidden md:inline font-medium">{session.user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/my-recipes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Recipes
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" })
                        setIsUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                Login
              </Link>
            )}

            <button
              className="md:hidden text-gray-500 hover:text-amber-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            {session && (
              <Link
                href="/my-recipes"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                My Recipes
              </Link>
            )}
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {!session && (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-500 hover:bg-amber-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
