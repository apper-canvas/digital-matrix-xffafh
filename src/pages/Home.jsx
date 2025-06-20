import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: ''
  })

  // Footer options state
  const [socialLinks] = useState([
    { name: 'Facebook', url: 'https://facebook.com/propspot', icon: 'Facebook' },
    { name: 'Twitter', url: 'https://twitter.com/propspot', icon: 'Twitter' },
    { name: 'Instagram', url: 'https://instagram.com/propspot', icon: 'Instagram' }
  ])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSearch = () => {
    const searchSection = document.querySelector('#main-feature-section')
    if (searchSection) {
      searchSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleListProperty = () => {
    setShowListModal(true)
  }

  const handleSubmitProperty = (e) => {
    e.preventDefault()
    // Here you would typically send data to backend
    console.log('Property submitted:', propertyForm)
    
    // Reset form and close modal
    setPropertyForm({
      title: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: ''
    })
    setShowListModal(false)
    
    // Show success message (you can replace with toast notification)
    alert('Property listed successfully!')
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setPropertyForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

const closeModal = () => {
    setShowListModal(false)
  }

  // Footer options handlers
  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleQuickLinkClick = (linkType) => {
    switch (linkType) {
      case 'browse':
        scrollToSearch()
        break
      case 'list':
        handleListProperty()
        break
      case 'insights':
        // Scroll to features section
        const featuresSection = document.querySelector('#features-section')
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        break
      case 'contact':
        // Scroll to footer
        const footerSection = document.querySelector('#footer-section')
        if (footerSection) {
          footerSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        break
      default:
        break
    }
  }

  const handleSupportLinkClick = (linkType) => {
    // For now, these would typically link to dedicated pages
    // Here we'll show a simple alert, but in a real app these would navigate to proper pages
    const messages = {
      help: 'Help Center - Find answers to common questions and get support.',
      privacy: 'Privacy Policy - Learn how we protect and handle your personal information.',
      terms: 'Terms of Service - Review our terms and conditions for using PropSpot.',
      faq: 'FAQ - Frequently Asked Questions about buying and selling properties.'
    }
    
    if (messages[linkType]) {
      alert(messages[linkType])
    }
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
<button 
                onClick={scrollToSearch}
                className="btn-primary w-full sm:w-auto"
              >
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Start Searching
              </button>
              <button 
                onClick={handleListProperty}
                className="btn-secondary w-full sm:w-auto"
              >
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
      <section id="main-feature-section" className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

{/* Features Grid */}
      <section id="features-section" className="py-12 md:py-16 bg-surface-50/50 dark:bg-surface-900/50">
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
      <footer id="footer-section" className="bg-surface-900 dark:bg-surface-950 text-white py-12 md:py-16">
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
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.url)}
                    className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-all duration-200 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Visit our ${social.name} page`}
                  >
                    <ApperIcon name={social.icon} className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
            
<div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-surface-300">
                <li>
                  <button 
                    onClick={() => handleQuickLinkClick('browse')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Browse Properties
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleQuickLinkClick('list')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    List Your Property
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleQuickLinkClick('insights')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Market Insights
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleQuickLinkClick('contact')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            
<div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-surface-300">
                <li>
                  <button 
                    onClick={() => handleSupportLinkClick('help')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSupportLinkClick('privacy')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSupportLinkClick('terms')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSupportLinkClick('faq')}
                    className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-12 pt-8 text-center text-surface-400">
            <p>&copy; 2024 PropSpot. All rights reserved. Built with ❤️ for property seekers.</p>
          </div>
        </div>
</footer>

      {/* Property Listing Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                List Your Property
              </h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitProperty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={propertyForm.title}
                  onChange={handleFormChange}
                  className="input-field"
                  placeholder="Beautiful 3BR house in downtown"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={propertyForm.price}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder="$450,000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={propertyForm.location}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder="New York, NY"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={propertyForm.bedrooms}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder="3"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={propertyForm.bathrooms}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder="2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={propertyForm.area}
                    onChange={handleFormChange}
                    className="input-field"
                    placeholder="1500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={propertyForm.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your property features, amenities, and highlights..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  List Property
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Home