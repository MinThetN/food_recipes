import type { Recipe } from "../types/Recipes"

type CardProps = {
    recipe : Recipe
}

function Card({recipe}:CardProps) {
  return (
    <div className="bg-gray-300 p-4 rounded-3xl shadow-xl">
        <img src={recipe.image} alt={recipe.name} className="object-cover rounded-3xl"/>
        <h2 className="text-xl font-bold mt-2 mb-3">{recipe.name.length > 16 ? recipe.name.substring(0,16) + "..." : recipe.name}</h2>
        <p className="text-gray-500">Difficulty: <span className="font-bold text-gray-700">{recipe.difficulty}</span> </p>
        <p className="text-gray-500">Rating: <span className="font-bold text-gray-700">{recipe.rating}</span> </p>
    </div>
  )
}

export default Card
