"use client";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserInfo, logoutUser } from "@/action/my-action";

interface User {
  name: string;
  email: string;
  profileImage: string;
  iss: string;
  id: string;
}
export default function Navbar() {
  const router = useRouter();
  const [isSignedIn, setIssignedin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);
  const [value, setValue] = useState("");
  const [user, setUserInfo] = useState<User>({
    name: "",
    email: "",
    profileImage: "",
    iss: "",
    id: "",
  });
  const [showSearch, setShowsearch] = useState(false);

  const userInformation = async () => {
    try {
      const user = await getUserInfo();

      if (!user) {
        console.log("not found user info");
        setIsloaded(true);
      }

      if (user) {
        setUserInfo(user as User);
        setIssignedin(!isSignedIn);
        setIsloaded(true);
      }
    } catch (error) {
      console.log("failed to get the user information");
    }
  };
  useEffect(() => {
    userInformation();
  }, []);
  const handleSearch = async () => {
    if (value.length > 2) {
      const url = `/recipes?query=${value}`;

      router.push(url);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [value]);

  const handleLogout = async () => {
    try {
      const logout = await logoutUser();
      if (logout) {
        router.push("/login");
      }
    } catch (error) {
      console.log("error while logout", error);
    }
  };
  return (
    <nav className="bg-white  shadow-sm sticky top-0 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-amber-500" />
            <span className="font-bold text-xl text-gray-900">FoodBook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="text-gray-700 hover:text-amber-500 transition-colors"
            >
              Recipes
            </Link>
            {isSignedIn && (
              <Link
                href="/my-recipes"
                className="text-gray-700 hover:text-amber-500 transition-colors"
              >
                My Recipes
              </Link>
            )}
            <Link
              href="/about"
              className="text-gray-700 hover:text-amber-500 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center gap-4">
            <button
              className="text-gray-500 hover:text-amber-500 transition-colors"
              onClick={() => setShowsearch((prev) => !prev)}
            >
              {!showSearch ? (
                <Search className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </button>

            {/* Animated Search Bar */}
            <div
              className={`relative h-12 transition-all duration-500 ease-in-out overflow-hidden ${
                showSearch ? "w-64" : "w-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search something..."
                className="w-full h-full px-4 py-2 pr-10 shadow-md border  border-gray-300 rounded-md focus:outline-none "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {value && (
                <button
                  onClick={() => setValue("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {!isLoaded ? (
              <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
            ) : isSignedIn ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline font-medium text-gray-700">
                  {user.name || user.email}
                </span>
                <button onClick={handleLogout}>
                  <Link
                    href={"#"}
                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                  >
                    Logout
                  </Link>
                </button>
              </div>
            ) : (
              <Link
                href={"/login"}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-500 hover:text-amber-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            {isSignedIn && (
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
            {!isSignedIn && (
              <Link
                href={"/login"}
                className="block px-3 py-2 rounded-md text-base font-medium text-amber-500 hover:bg-amber-50"
              >
                <button onClick={() => setIsMenuOpen(false)}>Login</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
