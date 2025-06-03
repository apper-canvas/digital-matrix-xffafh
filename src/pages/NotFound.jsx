import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50/30 to-green-50/20 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <ApperIcon name="Home" className="w-12 h-12 text-primary" />
          </div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-surface-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Property Not Found
          </motion.h2>
          
          <motion.p 
            className="text-surface-600 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Looks like this property has been sold or the page you're looking for doesn't exist.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="mt-4">
            <Link 
              to="/" 
              className="text-primary hover:text-primary-dark transition-colors duration-200 font-medium"
            >
              Browse Available Properties →
            </Link>
          </div>
        </motion.div>
        
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
    </div>
  )
}

export default NotFound