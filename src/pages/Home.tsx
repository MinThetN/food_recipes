import { useEffect, useState } from "react"
import type { Recipe } from "../types/Recipes";
import Card from "../components/Card";
import Loading from "../components/Loading";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // store here from data type
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/recipes?limit=10');
        const data = await response.json()
        setRecipes(data.recipes)
      } catch (error) {
        console.log("Failed to fetch data",error)
      } finally {
        setLoading(false);
      }
    };
    getRecipes()
  },[])

  return (
    <main className="grid grid-cols-5 gap-6">
      {!loading ? (recipes.map((recipe) => <Card recipe={recipe} key={recipe.id} />)) : (<Loading />)}
    </main>
  )
}

export default Home
