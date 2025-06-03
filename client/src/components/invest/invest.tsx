import { useState } from 'react';
import { FiSearch, FiHome, FiMapPin, FiDollarSign, FiFilter, FiHeart, FiArrowLeft, FiX } from 'react-icons/fi';
import { createUserQuery } from '@/services/userQueriesService';

const propertyImages = {
  villa: {
    main: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    piscine: 'piscine.jpg',
    ftour: 'ftour.jpg',
    other: '9a3da.jpg'
  },
  apartment: {
    main: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    hoka1: '7oka1.jpg',
    hoka2: '7oka2.jpg',
    hoka3: '7oka3.jpg'
  },
  beachHouse: {
    main: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    beach1: 'b7ar1.jpg',
    beach2: 'b7ar2.jpg',
    beach3: 'b7ar3.jpg'
  },
  studio: {
    main: 'studio.jpg',
    studio1: 'studio1.jpg',
    studio2: 'studio2.jpg',
    studio3: 'studio3.jpg'
  },
  hero: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
};

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  featured: boolean;
  description: string;
  images: string[];
  amenities: string[];
};

type FilterOptions = {
  propertyType: string;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  moveInDate?: string;
  financing?: string;
};

export default function InvestInTunisia() {
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    moveInDate: '',
    financing: ''
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: '',
    location: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
  });

  // Sample property data with unique images for each property
  const properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Villa in Sousse',
      location: 'Sousse',
      price: 450000,
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      featured: true,
      description: 'This stunning luxury villa offers breathtaking sea views and modern amenities. Located in a prestigious neighborhood of Sousse, the property features a large swimming pool, landscaped gardens, and high-end finishes throughout.',
      images: [
        propertyImages.villa.main,
        propertyImages.villa.piscine,
        propertyImages.villa.ftour,
        propertyImages.villa.other
      ],
      amenities: ['Swimming Pool', 'Garden', 'Parking', 'Air Conditioning', 'Security System']
    },
    {
      id: 2,
      title: 'Modern Apartment in Tunis',
      location: 'Tunis',
      price: 1200,
      type: 'rent',
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      featured: false,
      description: 'Bright and spacious apartment in the heart of Tunis. Recently renovated with modern appliances and close to all amenities including shops, restaurants, and public transport.',
      images: [
        propertyImages.apartment.main,
        propertyImages.apartment.hoka1,
        propertyImages.apartment.hoka2,
        propertyImages.apartment.hoka3
      ],
      amenities: ['Balcony', 'Elevator', 'Parking', 'WiFi', 'Fully Furnished']
    },
    {
      id: 3,
      title: 'Beachfront House in Hammamet',
      location: 'Hammamet',
      price: 320000,
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      featured: true,
      description: 'Beautiful beachfront property with direct access to the sandy beach. Perfect for vacation home or permanent residence with stunning Mediterranean views.',
      images: [
        propertyImages.beachHouse.main,
        propertyImages.beachHouse.beach1,
        propertyImages.beachHouse.beach2,
        propertyImages.beachHouse.beach3
      ],
      amenities: ['Beach Access', 'Terrace', 'Fireplace', 'Parking', 'Garden']
    },
    {
      id: 4,
      title: 'Downtown Studio in Tunis',
      location: 'Tunis',
      price: 600,
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      featured: false,
      description: 'Cozy studio apartment in the vibrant downtown area, perfect for students or young professionals. Includes all utilities and is close to public transportation.',
      images: [
        propertyImages.studio.main,
        propertyImages.studio.studio1,
        propertyImages.studio.studio2,
        propertyImages.studio.studio3
      ],
      amenities: ['Fully Furnished', 'WiFi', 'Laundry', 'Security', 'Balcony']
    }
  ];

  const filteredProperties = properties
    .filter(property => property.type === activeTab)
    .filter(property => {
      if (searchQuery) {
        return (
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
        return false;
      }
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }
      return true;
    });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? null : name.includes('Price') ? parseInt(value) || null : value,
    }));
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(false);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
    setShowForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await createUserQuery(formData);
      alert(`Thank you for your interest! We'll contact you soon about ${selectedProperty?.title}`);
      setShowForm(false);
      setSuccess('Your message has been submitted successfully.');
      setSelectedProperty(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while submitting the form.');
      }
    }
  };

  const handleStartProcess = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      moveInDate: selectedProperty?.type === 'rent' ? '' : undefined,
      financing: selectedProperty?.type === 'sale' ? '' : undefined
    });
    setShowForm(true);
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative max-w-4xl w-full">
          <button
            onClick={closeImageModal}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
            aria-label="Close image modal"
          >
            <FiX size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged property view"
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </div>
    );
  };

  // Property Detail View
  if (selectedProperty && !showForm) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBackToList}
            className="flex items-center text-[#4D812C] mb-6 hover:text-[#23371c]"
          >
            <FiArrowLeft className="mr-2" /> Back to properties
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Images */}
            <div>
              <div
                className="h-96 rounded-lg mb-4 overflow-hidden cursor-zoom-in"
                onClick={() => openImageModal(selectedProperty.images[0])}
              >
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {selectedProperty.images.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="h-24 rounded overflow-hidden cursor-zoom-in"
                    onClick={() => openImageModal(img)}
                  >
                    <img
                      src={img}
                      alt={`${selectedProperty.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{selectedProperty.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <FiMapPin className="mr-1" />
                <span>{selectedProperty.location}</span>
              </div>

              <div className="bg-[#EBEBE1] p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-[#23371c]">
                    {selectedProperty.type === 'sale'
                      ? `$${selectedProperty.price.toLocaleString()}`
                      : `$${selectedProperty.price}/mo`}
                  </div>
                  <span className="bg-[#4D812C] text-white text-sm px-3 py-1 rounded">
                    {selectedProperty.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div className="font-medium">{selectedProperty.bedrooms}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                    <div className="font-medium">{selectedProperty.bathrooms}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Area</div>
                    <div className="font-medium">{selectedProperty.area} m²</div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 mb-6">{selectedProperty.description}</p>

              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {selectedProperty.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#4D812C] mr-2">•</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartProcess}
                className="w-full py-3 bg-[#4D812C] text-white font-medium rounded-lg hover:bg-[#23371c] transition-colors"
              >
                {selectedProperty.type === 'sale' ? 'Purchase This Property' : 'Rent This Property'}
              </button>
            </div>
          </div>
        </div>
        <ImageModal />
      </div>
    );
  }

  // Purchase/Rental Form
  if (selectedProperty && showForm) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setShowForm(false)}
            className="flex items-center text-[#4D812C] mb-6 hover:text-[#23371c]"
          >
            <FiArrowLeft className="mr-2" /> Back to property
          </button>

          <h1 className="text-2xl font-bold mb-2">
            {selectedProperty.type === 'sale'
              ? 'Purchase Application'
              : 'Rental Application'} for {selectedProperty.title}
          </h1>
          <p className="text-gray-600 mb-8">Please fill out the form below and you will be contacted shortly.</p>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                value={formData.fullName}
                onChange={handleFormChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            {selectedProperty.type === 'rent' && (
              <div>
                <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Move-In Date
                </label>
                <input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                  value={formData.moveInDate}
                  onChange={handleFormChange}
                />
              </div>
            )}

            {selectedProperty.type === 'sale' && (
              <div>
                <label htmlFor="financing" className="block text-sm font-medium text-gray-700 mb-1">
                  Financing Needs
                </label>
                <select
                  id="financing"
                  name="financing"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                  value={formData.financing}
                  onChange={handleFormChange}
                >
                  <option value="">Select an option</option>
                  <option value="cash">Cash Purchase</option>
                  <option value="local_bank">Local Bank Mortgage</option>
                  <option value="international_financing">International Financing</option>
                  <option value="not_sure">Not Sure Yet</option>
                </select>
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Any special requests or questions..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#4D812C] text-white font-medium rounded-lg hover:bg-[#23371c] transition-colors"
              >
                Submit Application
              </button>
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Original listing view
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-gradient-to-b from-black/30 to-black/30"
        style={{ backgroundImage: `url(${propertyImages.hero})` }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Invest in Tunisia</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover the best real estate opportunities in Tunisia for purchase or rental
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs and Search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex border-b border-gray-200 w-full sm:w-auto">
              <button
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'sale' ? 'border-b-2 border-[#4D812C] text-[#23371c]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('sale')}
                aria-label="View properties for sale"
              >
                Properties for Sale
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'rent' ? 'border-b-2 border-[#4D812C] text-[#23371c]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('rent')}
                aria-label="View properties for rent"
              >
                Properties for Rent
              </button>
            </div>

            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] sm:text-sm"
                placeholder="Search by location or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search properties"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
            <button
              className="flex items-center text-sm text-[#23371c] hover:text-[#4D812C]"
              onClick={() => setShowFilters(!showFilters)}
              aria-label={showFilters ? 'Hide filters' : 'Show filters'}
            >
              <FiFilter className="mr-1" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-[#EBEBE1] p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                    placeholder="Any location"
                    value={filters.location || ''}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                    value={filters.bedrooms || ''}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#4D812C] focus:border-[#4D812C]"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div
                key={property.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {property.featured && (
                    <div className="absolute top-2 left-2 bg-[#4D812C] text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  <button
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle save property logic here
                    }}
                    aria-label="Save property"
                  >
                    <FiHeart className="text-gray-600" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-1" size={14} />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiHome className="mr-1" size={14} />
                        <span>{property.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{property.bathrooms} baths</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {property.area} m²
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#23371c] font-bold">
                      {property.type === 'sale' ? (
                        <>${property.price.toLocaleString()}</>
                      ) : (
                        <>${property.price}/mo</>
                      )}
                    </div>
                    <button
                      className="px-3 py-1 bg-[#4D812C] text-white text-sm rounded hover:bg-[#23371c] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePropertyClick(property);
                      }}
                      aria-label={`View details for ${property.title}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#23371c] mb-6">Our Services for the Diaspora</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#EBEBE1] p-6 rounded-lg">
              <div className="bg-[#23371c] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiHome size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Property Investment</h3>
              <p className="text-gray-600">
                Expert guidance for Tunisians abroad looking to invest in real estate back home.
              </p>
            </div>
            <div className="bg-[#EBEBE1] p-6 rounded-lg">
              <div className="bg-[#23371c] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiMapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Relocation Assistance</h3>
              <p className="text-gray-600">
                Support for Tunisians moving abroad with housing search and community connections.
              </p>
            </div>
            <div className="bg-[#EBEBE1] p-6 rounded-lg">
              <div className="bg-[#23371c] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiDollarSign size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Financial Guidance</h3>
              <p className="text-gray-600">
                Advice on property financing, taxes, and legal considerations for cross-border transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16 bg-[#EBEBE1] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#23371c] mb-6">Resources for Tunisians Abroad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#4D812C]">Buying Property in Tunisia</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Legal requirements for non-residents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Tax implications for property owners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Property management services</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#4D812C]">Relocating Abroad</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Finding schools for your children</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Understanding rental markets abroad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4D812C] mr-2">•</span>
                  <span>Connecting with Tunisian communities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ImageModal />
    </div>
  );
}