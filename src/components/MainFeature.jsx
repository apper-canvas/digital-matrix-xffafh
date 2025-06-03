import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [bedrooms, setBedrooms] = useState('any')
  const [propertyType, setPropertyType] = useState('all')
  const [sortBy, setSortBy] = useState('price-low')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [savedProperties, setSavedProperties] = useState(new Set())
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Mock property data
  const mockProperties = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: 450000,
      propertyType: 'apartment',
      listingType: 'sale',
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      address: { street: '123 Main St', city: 'New York', state: 'NY' },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'],
      amenities: ['Pool', 'Gym', 'Parking', 'Concierge'],
      description: 'Stunning modern apartment in the heart of downtown with breathtaking city views.'
    },
    {
      id: '2',
      title: 'Luxury Family Home',
      price: 750000,
      propertyType: 'house',
      listingType: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2800,
      address: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA' },
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'],
      amenities: ['Garden', 'Garage', 'Pool', 'Security'],
      description: 'Beautiful family home with spacious rooms and a large backyard perfect for entertaining.'
    },
    {
      id: '3',
      title: 'Cozy Studio Loft',
      price: 2200,
      propertyType: 'studio',
      listingType: 'rent',
      bedrooms: 0,
      bathrooms: 1,
      squareFootage: 650,
      address: { street: '789 Arts District', city: 'Chicago', state: 'IL' },
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
      amenities: ['High Ceilings', 'Exposed Brick', 'Hardwood Floors'],
      description: 'Charming studio loft in the vibrant arts district with exposed brick walls.'
    },
    {
      id: '4',
      title: 'Suburban Dream House',
      price: 620000,
      propertyType: 'house',
      listingType: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 2200,
      address: { street: '321 Maple Dr', city: 'Austin', state: 'TX' },
      images: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop'],
      amenities: ['Garage', 'Backyard', 'Fireplace', 'Updated Kitchen'],
      description: 'Perfect suburban home with modern updates and a beautiful backyard.'
    },
    {
      id: '5',
      title: 'Luxury Penthouse',
      price: 1200000,
      propertyType: 'apartment',
      listingType: 'sale',
      bedrooms: 3,
      bathrooms: 3,
      squareFootage: 1800,
      address: { street: '555 Sky Tower', city: 'Miami', state: 'FL' },
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'],
      amenities: ['Ocean View', 'Balcony', 'Concierge', 'Spa', 'Valet'],
      description: 'Spectacular penthouse with panoramic ocean views and luxury amenities.'
    },
    {
      id: '6',
      title: 'Downtown Rental',
      price: 1800,
      propertyType: 'apartment',
      listingType: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 900,
      address: { street: '777 City Center', city: 'Seattle', state: 'WA' },
      images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'],
      amenities: ['City View', 'Gym', 'Rooftop', 'Pet Friendly'],
      description: 'Modern apartment in the heart of the city with excellent amenities.'
    }
  ]

  // Filter properties based on search criteria
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.city.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = propertyType === 'all' || property.propertyType === propertyType
    const matchesBedrooms = bedrooms === 'any' || 
                           (bedrooms === '0' && property.bedrooms === 0) ||
                           (bedrooms === '1+' && property.bedrooms >= 1) ||
                           (bedrooms === '2+' && property.bedrooms >= 2) ||
                           (bedrooms === '3+' && property.bedrooms >= 3) ||
                           (bedrooms === '4+' && property.bedrooms >= 4)
    
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesFilter = selectedFilter === 'all' || property.listingType === selectedFilter

    return matchesSearch && matchesType && matchesBedrooms && matchesPrice && matchesFilter
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'size-large': return b.squareFootage - a.squareFootage
      case 'size-small': return a.squareFootage - b.squareFootage
      default: return 0
    }
  })

  const formatPrice = (price, listingType) => {
    if (listingType === 'rent') {
      return `$${price.toLocaleString()}/mo`
    }
    return `$${price.toLocaleString()}`
  }

  const toggleSaveProperty = (propertyId) => {
    const newSaved = new Set(savedProperties)
    if (newSaved.has(propertyId)) {
      newSaved.delete(propertyId)
      toast.success('Property removed from favorites')
    } else {
      newSaved.add(propertyId)
      toast.success('Property saved to favorites')
    }
    setSavedProperties(newSaved)
  }

  const handleInquiry = (property) => {
    toast.success(`Inquiry sent for ${property.title}`)
    setSelectedProperty(null)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Search and Filter Header */}
      <motion.div 
        className="search-bar p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search by location or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 h-12 md:h-14"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="input-field h-12 md:h-14 min-w-[120px]"
            >
              <option value="all">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary h-12 md:h-14 px-4 ${showFilters ? 'bg-primary/10' : ''}`}
            >
              <ApperIcon name="Filter" className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-surface-200 text-surface-600 hover:border-surface-300'
                }`}
              >
                <ApperIcon name="Grid3X3" className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-surface-200 text-surface-600 hover:border-surface-300'
                }`}
              >
                <ApperIcon name="List" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-surface-200 pt-6"
            >
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="input-field h-10"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="condo">Condo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="input-field h-10"
                >
                  <option value="any">Any</option>
                  <option value="0">Studio</option>
                  <option value="1+">1+</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                  <option value="4+">4+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field h-10"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="size-large">Size: Large to Small</option>
                  <option value="size-small">Size: Small to Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Summary */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
            Properties Available
          </h2>
          <p className="text-surface-600 dark:text-surface-300 mt-1">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>
        
        {savedProperties.size > 0 && (
          <motion.div 
            className="property-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ApperIcon name="Heart" className="w-4 h-4 mr-1 fill-current" />
            {savedProperties.size} Saved
          </motion.div>
        )}
      </motion.div>

      {/* Properties Grid/List */}
      <motion.div 
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`property-card group cursor-pointer ${
                viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              {/* Property Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'list' 
                  ? 'sm:w-64 sm:flex-shrink-0 h-48 sm:h-auto' 
                  : 'aspect-property'
              }`}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Property Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="property-badge bg-white/90 text-surface-800">
                    {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>

                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSaveProperty(property.id)
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    savedProperties.has(property.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-surface-600 hover:bg-white hover:text-red-500'
                  }`}
                >
                  <ApperIcon 
                    name="Heart" 
                    className={`w-4 h-4 ${savedProperties.has(property.id) ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>

              {/* Property Details */}
              <div className={`p-4 md:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                    {property.title}
                  </h3>
                  <span className="text-xl md:text-2xl font-bold text-primary ml-2">
                    {formatPrice(property.price, property.listingType)}
                  </span>
                </div>

                <p className="text-surface-600 dark:text-surface-300 mb-4 text-sm">
                  {property.address.street}, {property.address.city}, {property.address.state}
                </p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-surface-600 dark:text-surface-300">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                      {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                    </div>
                  )}
                  <div className="flex items-center">
                    <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                    {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                    {property.squareFootage.toLocaleString()} sqft
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded-full">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedProperty(property)
                  }}
                  className="w-full btn-primary text-sm py-2 group-hover:shadow-xl"
                >
                  View Details
                  <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <motion.div 
          className="text-center py-12 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <ApperIcon name="Search" className="w-8 h-8 text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
            No Properties Found
          </h3>
          <p className="text-surface-600 dark:text-surface-300 mb-6 max-w-md mx-auto">
            Try adjusting your search criteria or explore different locations to find your perfect property.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedFilter('all')
              setPropertyType('all')
              setBedrooms('any')
              setPriceRange([0, 1000000])
            }}
            className="btn-secondary"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>

                {/* Property Image */}
                <div className="aspect-property relative">
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="property-badge bg-white/90 text-surface-800">
                      {selectedProperty.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div className="mb-4 sm:mb-0">
                      <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-2">
                        {selectedProperty.title}
                      </h2>
                      <p className="text-surface-600 dark:text-surface-300">
                        {selectedProperty.address.street}, {selectedProperty.address.city}, {selectedProperty.address.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        {formatPrice(selectedProperty.price, selectedProperty.listingType)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {selectedProperty.bedrooms > 0 && (
                      <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                        <ApperIcon name="Bed" className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-lg font-semibold text-surface-900 dark:text-white">
                          {selectedProperty.bedrooms}
                        </div>
                        <div className="text-sm text-surface-600 dark:text-surface-300">
                          Bedroom{selectedProperty.bedrooms !== 1 ? 's' : ''}
                        </div>
                      </div>
                    )}
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                      <ApperIcon name="Bath" className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold text-surface-900 dark:text-white">
                        {selectedProperty.bathrooms}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-300">
                        Bathroom{selectedProperty.bathrooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                      <ApperIcon name="Square" className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold text-surface-900 dark:text-white">
                        {selectedProperty.squareFootage.toLocaleString()}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-300">
                        Sq Ft
                      </div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                      <ApperIcon name="Home" className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold text-surface-900 dark:text-white capitalize">
                        {selectedProperty.propertyType}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-300">
                        Type
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">
                      Description
                    </h3>
                    <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">
                      Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleInquiry(selectedProperty)}
                      className="btn-primary flex-1"
                    >
                      <ApperIcon name="MessageSquare" className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </button>
                    <button
                      onClick={() => toggleSaveProperty(selectedProperty.id)}
                      className={`btn-secondary flex-1 ${
                        savedProperties.has(selectedProperty.id) ? 'bg-red-50 border-red-200 text-red-600' : ''
                      }`}
                    >
                      <ApperIcon 
                        name="Heart" 
                        className={`w-5 h-5 mr-2 ${savedProperties.has(selectedProperty.id) ? 'fill-current' : ''}`} 
                      />
                      {savedProperties.has(selectedProperty.id) ? 'Saved' : 'Save Property'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature