import { motion } from "framer-motion";
import { ChefHat, Heart, Users, Award, Clock, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

function About() {
  const features = [
    {
      icon: <ChefHat className="w-8 h-8 text-green-600" />,
      title: "Expert Recipes",
      description: "Curated by professional chefs and home cooking enthusiasts"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Quick & Easy",
      description: "Step-by-step instructions that save you time in the kitchen"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Made with Love",
      description: "Every recipe is tested and perfected for the best results"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "Award Winning",
      description: "Recognized recipes from culinary competitions worldwide"
    }
  ];

  return (
    <>
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <motion.main 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.section 
          className="hero-gradient rounded-3xl p-8 md:p-16 mb-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-10 left-10 opacity-20">
            <Sparkles className="w-16 h-16 text-green-500" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20">
            <Sparkles className="w-12 h-12 text-emerald-500" />
          </div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              About <span className="text-emerald-600">M Recipes</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-700 max-w-4xl mx-auto leading-relaxed">
              Start cooking today! Find easy recipes and share meals with family and friends.
            </p>
          </motion.div>
        </motion.section>

        {/* Main Content Section */}
        <motion.section 
          className="grid lg:grid-cols-2 gap-12 mb-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl transform rotate-3 opacity-20"></div>
            <img 
              src="https://st4.depositphotos.com/1526816/24000/v/450/depositphotos_240000322-stock-illustration-set-different-cook-character-illustration.jpg" 
              alt="chef group" 
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Read and Cook Your Own 
              <span className="text-green-600 block">Amazing Recipes</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
              Welcome to M Recipes! We help food lovers find and share great recipes 
              from around the world.
              </p>
              
              <p className="text-lg">
              New to cooking or already a pro? Our recipes will help you try new 
              dishes that your family and friends will love.
              </p>
            </div>
            
            <motion.div 
              className="flex items-center gap-4 pt-4"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-6 h-6 text-green-600" />
              <span className="text-lg font-semibold text-gray-700">
                Join thousands of home cooks worldwide
              </span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Why Choose <span className="text-green-600">M Recipes?</span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-hover bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="flex justify-center mb-4"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center mt-16 p-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            Ready to Start Cooking?
          </motion.h3>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Check out our tasty recipes and start cooking today!
          </motion.p>
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to="/" className="flex items-center rounded-xl font-medium transition-all duration-200">
              Browse Recipes
            </NavLink>
          </motion.button>
        </motion.section>
      </motion.main>
    </>
  )
}

export default About
