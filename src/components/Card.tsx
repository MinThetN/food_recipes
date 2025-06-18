import { Link } from 'react-router-dom'
import { Star, Users, Clock } from 'lucide-react'
import type { Recipe } from '../types/Recipes'

type CardProps = {
    recipe : Recipe
}

function Card({recipe}:CardProps) {
  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Link 
      to={`/recipes/${recipe.id}`} 
      className="group block bg-white hover:bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
      border border-gray-100 hover:border-gray-200 h-full"
    >
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow space-y-3">
          <h2 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
            {recipe.name}
          </h2>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-700">{recipe.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-auto">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min total</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
