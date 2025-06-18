import { useEffect, useState } from "react"
import type { Recipe } from "../types/Recipes";
import Card from "./Card";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]) // store here from data type

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json()
      setRecipes(data.recipes)
    };
    getRecipes()
  },[])
  return (
    <main className="grid grid-cols-5 gap-6">
      {recipes.length > 0 && recipes.map((recipe) => <Card recipe={recipe} key={recipe.id} />)}
    </main>
  )
}

export default Home
