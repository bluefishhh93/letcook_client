
"use client"
import React, { useEffect, useState } from 'react';
import { Recipe } from 'CustomTypes';
import HeroSection from './components/HeroSection';
import QuickFacts from './components/QuickFacts';
import Instructions from './components/Instructions';
import Sidebar from './components/Sidebar';
import { useRouter } from 'next/navigation';
import * as RecipeService from '@/services/recipe.service';
import RecipeComment from "@/app/recipe/[id]/components/Comment";
import Cart from '@/components/cart/Cart';
import Loading from './components/loading';

interface RecipePageProps {
  params: {
    id: string;
  };
}

const RecipePage: React.FC<RecipePageProps> = ({ params }) => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchRecipeData = async () => {
      // if (isNaN(params.id)) {
      //   router.push("/404");
      //   return;
      // }
      try {
        const recipeData = await RecipeService.getRecipeById(params.id);
        if (!recipeData) {
          router.push("/404");
          return;
        }
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeData();
  }, [params.id, router]);
  if (!recipe) {
    return <Loading />;
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <HeroSection recipe={recipe} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <QuickFacts recipe={recipe} />
            <Instructions steps={recipe.steps} />
            {/* <CooksNotes /> */}
          </div>

          <Sidebar recipe={recipe} />
        </div>

        {/* <RelatedRecipes /> */}
    
        <RecipeComment
          comments={(recipe as any).commentWithUser}
          recipeId={recipe._id}
        />

      </div>
      <Cart />
    </div>
  );
};

export default RecipePage;
