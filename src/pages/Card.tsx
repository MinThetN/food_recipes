import type { Recipe } from "../types/Recipes"

type CardProps = {
    recipe : Recipe
}

function Card({recipe}:CardProps) {
  return (
    <div className="bg-gray-300 p-4 rounded-3xl shadow-xl">
        <img src={recipe.image} alt={recipe.name} className="w-full rounded-3xl"/>
        <h2 className="text-xl font-bold mt-2">{recipe.name}</h2>
        <p className="text-gray-500">Difficulty: {recipe.difficulty}</p>
        <p className="text-gray-500">Rating: {recipe.rating}</p>
    </div>
  )
}

export default Card
