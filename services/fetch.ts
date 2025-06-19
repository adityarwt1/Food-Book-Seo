"use server";
const url =
  process.env.NODE_ENV === "production"
    ? "https://food-book-vert.vercel.app"
    : "http://localhost:3000";
export async function getRecipieByAuthor(email: string) {
  try {
    const response = await fetch(`/api/fetchrecipie?author=${email}`);
    const { recipes } = await response.json();
    return recipes;
  } catch (error: any) {
    console.log(
      "error while fetching the recipie witht the author",
      error.message
    );
  }
}
