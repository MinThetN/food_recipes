import { useState, useEffect, useMemo } from "react";
import type { Recipe } from "../types/Recipes";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { Utensils, Heart, Star, CookingPot, Search, Filter, X } from "lucide-react";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Generate categories dynamically from recipe mealType data
  const categories = useMemo(() => {
    const allMealTypes = recipes.flatMap(recipe => recipe.mealType || []);
    const uniqueMealTypes = [...new Set(allMealTypes)];
    return ["All", ...uniqueMealTypes.sort()];
  }, [recipes]);

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      } catch (error) {
        console.log("Failed to fetch data", error);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 300);
      }
    };
    getRecipes();
  }, []);

  // Filter recipes based on search term, category, and difficulty
  useEffect(() => {
    let filtered = recipes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category using mealType from recipe data
    if (selectedCategory !== "All") {
      filtered = filtered.filter(recipe => {
        // Use the actual mealType property from the recipe
        if (recipe.mealType && recipe.mealType.length > 0) {
          return recipe.mealType.some((mealType: string) => 
            mealType.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        }
        return false;
      });
    }

    // Filter by difficulty
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(recipe => 
        recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <style>{`
        .hero-animation {
          animation: heroFadeIn 1s ease-out;
        }
        
        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <motion.section 
          className="hero-animation bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-3xl p-12 mb-5 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-4 mb-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CookingPot className="w-12 h-12 text-green-600"/>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Utensils className="w-12 h-12 text-emerald-600" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">
              Discover Amazing
              <span className="block text-emerald-600">Recipes</span>
            </h1>
            
            <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of delicious recipes from around the world. 
              From quick weeknight dinners to special occasion treats.
            </p>
            
            <div className="flex justify-center items-center gap-8 text-green-600">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium">Loved by many people</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium">Top rated recipes</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Search & Filter Section */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="flex-1 w-full lg:max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input
                    type="text"
                    placeholder="Search recipes or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl 
                                 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none 
                                 transition-all duration-300 bg-white shadow-lg hover:shadow-xl
                                 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Filter Toggle Button */}
              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 
                                 text-white rounded-2xl hover:from-green-700 hover:to-green-800 
                                 transition-all duration-300 shadow-lg hover:shadow-xl
                                 border border-green-600 hover:border-green-700
                                 min-w-[140px] justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">
                    {showFilters ? "Hide" : "Show"} Filters
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Enhanced visual separator */}
            <div className="mt-6 flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
            </div>
          </div>
          

          {/* Filter Options */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? "auto" : 0, 
              opacity: showFilters ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <motion.button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {difficulty}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Showing {filteredRecipes.length} of {recipes.length} recipes
                </span>
                <motion.button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="w-4 h-4" />
                  Clear All
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Recipes Section */}
        <section>
          <motion.h2 
            className="text-2xl font-bold text-green-800 mb-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            {searchTerm || selectedCategory !== "All" || selectedDifficulty !== "All" 
              ? `Filtered Recipes (${filteredRecipes.length})` 
              : "Featured Recipes"
            }
          </motion.h2>
          
          {loading ? (
            <Loading />
          ) : filteredRecipes.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <motion.button
                onClick={clearFilters}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  custom={index}
                >
                  <Card recipe={recipe} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </>
  )
}

export default Home
