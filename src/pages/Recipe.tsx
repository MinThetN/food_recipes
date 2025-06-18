import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type { Recipe as RecipeType } from "../types/Recipes"
import Loading from "../components/Loading";
import { 
  Clock, 
  Users, 
  Flame, 
  ShoppingCart, 
  ChefHat, 
  Star, 
  StarHalf,
  Utensils,
  Leaf
} from "lucide-react";

function Recipe() {
  const [recipe, setRecipe] = useState<RecipeType | null>(null)
  const {id} = useParams();
  const [loading, setLoading] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true)

  useEffect(() => {
    const getSingleRecipe = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        const data = await response.json();
        setRecipe(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
        // Add a small delay for the refresh animation
        setTimeout(() => setIsRefreshing(false), 800)
      }
      
    };
    getSingleRecipe();
  }, [id])

  // Function to get difficulty color with green theme
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'medium':
        return 'text-emerald-700 bg-emerald-100 border-emerald-200'
      case 'hard':
        return 'text-teal-700 bg-teal-100 border-teal-200'
      default:
        return 'text-green-700 bg-green-100 border-green-200'
    }
  }

  // Function to render star rating with Lucide icons
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  }

  return (
    <>
      <style>{`
        .refresh-animation {
          animation: refreshFade 0.8s ease-out;
        }
        
        @keyframes refreshFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {loading && <Loading />}
        
        {!loading && !recipe && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Utensils className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl text-green-600">No recipe found</p>
            </div>
          </div>
        )}
        
        {!loading && recipe && (
          <main className={`container mx-auto px-6 py-8 max-w-7xl ${isRefreshing ? 'refresh-animation' : ''}`}>
            {/* Hero Section with Row Layout */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 mb-8 hover:shadow-3xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent lg:bg-gradient-to-r lg:from-green-900/60 lg:to-transparent"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-green-800">
                    {recipe.name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getDifficultyColor(recipe.difficulty)} hover:scale-105 transition-transform duration-200`}>
                      <Leaf className="w-4 h-4 inline mr-2" />
                      {recipe.difficulty}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(recipe.rating)}
                      <span className="ml-2 text-green-600 font-medium">({recipe.rating})</span>
                    </div>
                  </div>

                  {/* Stats Cards in Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                      <Clock className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <h3 className="font-semibold text-green-700 text-sm">Prep Time</h3>
                      <p className="text-green-600 font-bold text-lg">{recipe.prepTimeMinutes || 'N/A'}</p>
                      <p className="text-green-500 text-xs">minutes</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl text-center border border-emerald-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                      <Users className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                      <h3 className="font-semibold text-emerald-700 text-sm">Servings</h3>
                      <p className="text-emerald-600 font-bold text-lg">{recipe.servings || 'N/A'}</p>
                      <p className="text-emerald-500 text-xs">people</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl text-center border border-teal-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                      <Flame className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                      <h3 className="font-semibold text-teal-700 text-sm">Calories</h3>
                      <p className="text-teal-600 font-bold text-lg">{recipe.caloriesPerServing || 'N/A'}</p>
                      <p className="text-teal-500 text-xs">per serving</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section with Extended Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Ingredients Section */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <ShoppingCart className="w-8 h-8 text-green-600 mr-3" />
                  Ingredients
                </h2>
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li 
                        key={index} 
                        className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100 hover:scale-102 hover:shadow-md transition-all duration-200"
                      >
                        <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-green-700 font-medium">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                  <ChefHat className="w-8 h-8 text-green-600 mr-3" />
                  Instructions
                </h2>
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <div className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <div 
                        key={index} 
                        className="flex space-x-4 p-4 bg-white rounded-xl shadow-sm border border-green-100 hover:scale-101 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg hover:scale-110 transition-transform duration-200">
                          {index + 1}
                        </div>
                        <p className="text-green-700 leading-relaxed">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  )
}

export default Recipe

