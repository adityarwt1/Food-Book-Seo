import Link from "next/link";
import {
  Clock,
  Users,
  ChevronLeft,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";
import connectDB from "@/lib/db";
import { Recipe } from "@/models";
import { redirect } from "next/navigation";
import EditRecipeForm from "@/components/EditRecipeForm";

export default async function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  await connectDB();
  const recipe = await Recipe.findOne({ _id: id });

  if (!recipe) {
    return redirect("/recipes");
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6 transition duration-200"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm sm:text-base">Back to recipes</span>
        </Link>

        {/* Edit Form */}
        <EditRecipeForm recipe={JSON.parse(JSON.stringify(recipe))} />
      </div>
    </div>
  );
}
