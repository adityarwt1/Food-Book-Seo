"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Upload, Users } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Recipe {
    _id: string;
    title: string;
    description: string;
    time: number;
    servings: number;
    category: string;
    image: string;
    ingredients: string[];
    instructions: string[];
}

export default function EditRecipeForm({ recipe }: { recipe: Recipe }) {
    const router = useRouter();
    const { username } = useUser()
    const [formData, setFormData] = useState<Recipe>(recipe);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>(recipe.image);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData(prev => ({ ...prev, instructions: newInstructions }));
    };

    const addIngredient = () => {
        setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
    };

    const removeIngredient = (index: number) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const addInstruction = () => {
        setFormData(prev => ({ ...prev, instructions: [...prev.instructions, ""] }));
    };

    const removeInstruction = (index: number) => {
        const newInstructions = formData.instructions.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, instructions: newInstructions }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/recipes/${recipe._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }

            const result = await response.json();
            if (response.ok) {
                router.push(`/recipes/${recipe._id}`);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const base64format = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Convert to base64 for saving
            const base64Image = await base64format(file);
            setFormData({ ...formData, image: base64Image });
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Recipe Header */}
            <div className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Clock size={18} />
                        <input
                            type="number"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                            min="1"
                            required
                        />
                        <span>mins</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Users size={18} />
                        <input
                            type="number"
                            name="servings"
                            value={formData.servings}
                            onChange={handleChange}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                            min="1"
                            required
                        />
                        <span>servings</span>
                    </div>

                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-full text-sm"
                            placeholder="Category"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Recipe Image */}
            <div className="space-y-3">
                <div className="h-60 sm:h-80 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden relative">
                    {imagePreview ? (
                        <Image
                            width={500}
                            height={500}
                            src={imagePreview}
                            alt={formData.title || "Recipe image"}
                            className="object-cover w-full h-full"
                            onError={() => setImagePreview("")}
                        />
                    ) : (
                        <div className="text-gray-400">No image selected</div>
                    )}
                </div>

                <label
                    htmlFor="image-upload"
                    className="w-full sm:w-auto cursor-pointer p-2 border bg-amber-500 text-white flex justify-center items-center gap-2 rounded-md"
                >
                    <Upload size={18} />
                    <span>{formData.image ? "Change Image" : "Upload Image"}</span>
                </label>
                <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ingredients */}
                <div className="lg:col-span-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="px-2 py-1 bg-amber-500 text-white rounded-md text-sm"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {formData.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-amber-100 flex-shrink-0 mt-1"></div>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
                        <button
                            type="button"
                            onClick={addInstruction}
                            className="px-2 py-1 bg-amber-500 text-white rounded-md text-sm"
                        >
                            Add
                        </button>
                    </div>
                    <ol className="space-y-6">
                        {formData.instructions.map((instruction, index) => (
                            <li key={index} className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={instruction}
                                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className="text-red-500 hover:text-red-700 self-start"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Link
                    href={`/recipes/${recipe._id}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 text-center"
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>

    );
}