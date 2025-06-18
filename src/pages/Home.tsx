import { useState, useEffect } from "react";
import type { Recipe } from "../types/Recipes";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { Utensils, Heart, Star, CookingPot } from "lucide-react";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // store here from data type
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json()
        setRecipes(data.recipes)
      } catch (error) {
        console.log("Failed to fetch data", error)
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 300);
      }
    };
    getRecipes()
  }, [])

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
          className="hero-animation bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-12 mb-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-4 mb-6">
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
                <span className="font-medium">Loved by thousands</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium">Top rated recipes</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Recipes Section */}
        <section>
          <motion.h2 
            className="text-3xl font-bold text-green-800 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            Featured Recipes
          </motion.h2>
          
          {loading ? (
            <Loading />
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {recipes.map((recipe, index) => (
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
