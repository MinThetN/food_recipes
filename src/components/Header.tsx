import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, Home, Info, Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style>{`
        .navbar-animation {
          animation: navSlideDown 0.8s ease-out;
        }
        
        @keyframes navSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <motion.nav 
        className="navbar-animation flex items-center justify-between my-4 md:my-10 bg-white rounded-2xl shadow-lg 
        border border-green-100 px-4 md:px-8 py-3 md:py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center gap-2 md:gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          </motion.div>
              <h1 className="text-xl md:text-3xl font-bold">
                <span className="text-green-600">M</span>
                <span className="text-green-800">Recipes</span>
              </h1>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "text-white bg-green-600 shadow-lg" 
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`
              }
            >
              <Home className="w-4 h-4" />
              Recipes
            </NavLink>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "text-white bg-green-600 shadow-lg" 
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`
              }
            >
              <Info className="w-4 h-4" />
              About
            </NavLink>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg text-green-600 hover:bg-green-100 transition-colors"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white rounded-2xl shadow-lg border border-green-100 mx-4 mb-4 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full ${
                  isActive 
                    ? "text-white bg-green-600 shadow-lg" 
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              Recipes
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full ${
                  isActive 
                    ? "text-white bg-green-600 shadow-lg" 
                    : "text-green-700 hover:bg-green-100 hover:text-green-800"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              About
            </NavLink>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Header
