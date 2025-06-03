import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    {
      icon: 'Search',
      title: 'Smart Search',
      description: 'Advanced filtering with map integration and location-based results'
    },
    {
      icon: 'MessageSquare',
      title: 'Direct Communication',
      description: 'Built-in messaging system for seamless buyer-seller interaction'
    },
    {
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Bookmark properties and manage your wishlist with ease'
    },
    {
      icon: 'TrendingUp',
      title: 'Market Insights',
      description: 'Real-time market data and property value trends'
    }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md border-b border-surface-200/50 dark:border-surface-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ApperIcon name="Home" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gradient">PropSpot</span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Perfect
              <span className="block text-gradient">Dream Home</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8 md:mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover exceptional properties with our intelligent marketplace. Search, connect, and find your next home with ease.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="btn-primary w-full sm:w-auto">
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Start Searching
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                <ApperIcon name="PlusCircle" className="w-5 h-5 mr-2" />
                List Property
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl"
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-surface-50/50 dark:bg-surface-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Why Choose PropSpot?
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Experience the future of real estate with our innovative platform designed for modern property seekers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ApperIcon name="Home" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PropSpot</span>
              </div>
              <p className="text-surface-300 mb-6 max-w-md">
                Your trusted partner in finding exceptional properties. Connect with verified sellers and discover your dream home today.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors duration-200">
                  <ApperIcon name="Facebook" className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors duration-200">
                  <ApperIcon name="Twitter" className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors duration-200">
                  <ApperIcon name="Instagram" className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Browse Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">List Your Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Market Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-12 pt-8 text-center text-surface-400">
            <p>&copy; 2024 PropSpot. All rights reserved. Built with ❤️ for property seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home