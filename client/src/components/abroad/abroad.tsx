// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiHome, FiHeart, FiFilter, FiArrowLeft, FiCalendar, FiUser, FiMail, FiPhone, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('../PropertyMap'), {
  ssr: false
});

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  type: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  features: string[];
  featured?: boolean;
  coordinates: [number, number]; // Added coordinates for map
};

type Country = {
  code: string;
  name: string;
  propertyCount: number;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  moveInDate?: string;
  message: string;
};

const LiveAbroadPage = () => {
  const [activeTab, setActiveTab] = useState<'rent' | 'sale'>('rent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    message: ''
  });

  // Sample data with proper image paths and coordinates
  const countries: Country[] = [
    { code: 'fr', name: 'France', propertyCount: 124 },
    { code: 'de', name: 'Germany', propertyCount: 89 },
    { code: 'ca', name: 'Canada', propertyCount: 76 },
    { code: 'us', name: 'USA', propertyCount: 210 },
    { code: 'ae', name: 'UAE', propertyCount: 45 },
  ];

  const properties: Property[] = [
    {
      id: 1,
      title: 'Modern Apartment in Paris',
      location: 'Paris, France',
      price: 1200,
      type: 'rent',
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      images: ['/paris1.jpg', '/paris2.jpg', '/paris3.jpg'],
      description: 'Beautiful modern apartment located in the heart of Paris with easy access to public transportation and local amenities. Recently renovated with high-quality finishes.',
      features: ['Balcony', 'Fully equipped kitchen', 'Elevator', 'Security system', 'Pet friendly'],
      featured: true,
      coordinates: [48.8566, 2.3522] // Paris coordinates
    },
    {
      id: 2,
      title: 'Villa with Sea View',
      location: 'Dubai, UAE',
      price: 350000,
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      images: ['/dubai1.jpg', '/dubai2.jpg', '/dubai3.jpg'],
      description: 'Luxury villa with stunning sea views in a prestigious Dubai neighborhood. Includes private pool, landscaped garden, and smart home features.',
      features: ['Private pool', 'Smart home system', 'Garage for 2 cars', 'Maid room', 'Walk-in closets'],
      coordinates: [25.2048, 55.2708] // Dubai coordinates
    },
    {
      id: 3,
      title: 'Cozy Studio in Berlin',
      location: 'Berlin, Germany',
      price: 850,
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      images: ['/berlin1.jpg', '/berlin2.jpg', '/berlin3.jpg'],
      description: 'Charming studio apartment in a quiet Berlin neighborhood. Perfect for students or young professionals. Includes all utilities in the rent.',
      features: ['Furnished', 'Utilities included', 'Bike storage', 'Laundry room', 'Close to public transport'],
      coordinates: [52.5200, 13.4050] // Berlin coordinates
    },
    {
      id: 4,
      title: 'Family House in Montreal',
      location: 'Montreal, Canada',
      price: 425000,
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      images: ['/montreal1.jpg', '/montreal2.jpg', '/montreal3.jpg'],
      description: 'Spacious family home in a friendly Montreal suburb. Large backyard, finished basement, and close to excellent schools.',
      features: ['Finished basement', 'Large backyard', 'Fireplace', 'Hardwood floors', 'Energy efficient'],
      coordinates: [45.5017, -73.5673] // Montreal coordinates
    },
    {
      id: 5,
      title: 'Luxury Apartment in NYC',
      location: 'New York, USA',
      price: 2800,
      type: 'rent',
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      images: ['/nyc1.jpg', '/nyc2.jpg', '/nyc3.jpg'],
      description: 'High-end apartment in Manhattan with doorman, gym, and rooftop terrace. Stunning city views and premium finishes throughout.',
      features: ['Doorman', 'Gym', 'Rooftop terrace', 'Concierge', 'In-unit laundry'],
      featured: true,
      coordinates: [40.7128, -74.0060] // NYC coordinates
    },
    {
      id: 6,
      title: 'Chalet in Alps',
      location: 'Grenoble, France',
      price: 520000,
      type: 'sale',
      bedrooms: 5,
      bathrooms: 3,
      area: 320,
      images: ['/alps1.jpg', '/alps2.jpg', '/alps3.jpg'],
      description: 'Magnificent alpine chalet with panoramic mountain views. Perfect for ski enthusiasts or as a vacation rental property.',
      features: ['Mountain views', 'Ski storage', 'Fireplace', 'Sauna', 'Large terrace'],
      coordinates: [45.1885, 5.7245] // Grenoble coordinates
    },
  ];

  const filteredProperties = properties
    .filter(property => property.type === activeTab)
    .filter(property => 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(property => 
      selectedCountry ? property.location.includes(selectedCountry) : true
    )
    .filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
    setShowForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert(`Thank you for your interest, ${formData.name}! We will contact you shortly about ${selectedProperty?.title}.`);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      moveInDate: '',
      message: ''
    });
  };

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProperty) return;
    
    if (direction === 'prev') {
      setModalImageIndex(prev => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    } else {
      setModalImageIndex(prev => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Head>
          <title>{selectedProperty.title} | Tunisian Properties Abroad</title>
          <meta name="description" content={selectedProperty.description} />
        </Head>

        {/* Image Modal */}
        {showImageModal && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white text-2xl"
              aria-label="Close image modal"
            >
              <FiX size={28} />
            </button>
            
            <div className="relative w-full max-w-6xl h-full max-h-screen">
              <Image 
                src={selectedProperty.images[modalImageIndex]}
                alt={`${selectedProperty.title} - Image ${modalImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
              
              <button 
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                aria-label="Previous image"
              >
                <FiArrowLeft size={24} />
              </button>
              
              <button 
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                aria-label="Next image"
              >
                <FiArrowLeft size={24} className="transform rotate-180" />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                Image {modalImageIndex + 1} of {selectedProperty.images.length}
              </div>
            </div>
          </div>
        )}

        {/* Property Details Header */}
        <div className="bg-[#23371c] text-white py-6">
          <div className="container mx-auto px-4">
            <button 
              onClick={handleBackToList}
              className="flex items-center text-white hover:text-gray-200 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to listings
            </button>
            <h1 className="text-3xl font-bold">{selectedProperty.title}</h1>
            <div className="flex items-center mt-2">
              <FiMapPin className="mr-1" size={16} />
              <span>{selectedProperty.location}</span>
            </div>
          </div>
        </div>

        {/* Property Details Content */}
        <div className="container mx-auto px-4 py-8">
          {!showForm ? (
            <>
              {/* Image Gallery */}
              <div className="mb-8">
                <div 
                  className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4 cursor-zoom-in"
                  onClick={() => openImageModal(activeImageIndex)}
                >
                  <Image 
                    src={selectedProperty.images[activeImageIndex]} 
                    alt={selectedProperty.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 bg-gray-200 rounded overflow-hidden ${activeImageIndex === index ? 'ring-2 ring-[#23371c]' : ''}`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image 
                        src={image} 
                        alt={`${selectedProperty.title} - thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-2xl font-bold">Property Details</h2>
                      <div className="text-[#23371c] font-bold text-xl">
                        {selectedProperty.type === 'rent' ? `$${selectedProperty.price}/mo` : `$${selectedProperty.price.toLocaleString()}`}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#EBEBE1] p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Bedrooms</div>
                        <div className="font-bold">{selectedProperty.bedrooms}</div>
                      </div>
                      <div className="bg-[#EBEBE1] p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Bathrooms</div>
                        <div className="font-bold">{selectedProperty.bathrooms}</div>
                      </div>
                      <div className="bg-[#EBEBE1] p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Area</div>
                        <div className="font-bold">{selectedProperty.area} m²</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">Description</h3>
                    <p className="text-gray-700 mb-6">{selectedProperty.description}</p>

                    <h3 className="text-xl font-bold mb-3">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {selectedProperty.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-[#23371c] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                    <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-[#4D812C] text-white py-3 px-4 rounded-lg hover:bg-[#3a6a21] transition-colors mb-4"
                    >
                      {selectedProperty.type === 'rent' ? 'Rent Now' : 'Buy Now'}
                    </button>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-bold mb-2">Property Location</h4>
                      <div className="h-48 bg-gray-200 rounded-lg mb-4">
                        <MapWithNoSSR 
                          center={selectedProperty.coordinates} 
                          zoom={13} 
                          propertyLocation={selectedProperty.coordinates}
                          propertyTitle={selectedProperty.title}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{selectedProperty.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Rent/Buy Form */
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">
                {selectedProperty.type === 'rent' ? 'Rental Application' : 'Purchase Inquiry'}
              </h2>
              
              <form onSubmit={handleSubmitForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#4D812C] focus:border-[#23371c]"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#4D812C] focus:border-[#4D812C]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#4D812C] focus:border-[#4D812C]"
                        placeholder="+1 (___) ___-____"
                      />
                    </div>
                  </div>
                  
                  {selectedProperty.type === 'rent' && (
                    <div>
                      <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiCalendar className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="moveInDate"
                          name="moveInDate"
                          value={formData.moveInDate}
                          onChange={handleFormChange}
                          className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#4D812C] focus:border-[#4D812C]"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedProperty.type === 'rent' ? 'Why are you interested in renting this property?' : 'Tell us about your purchase timeline'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#4D812C] focus:border-[#4D812C]"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4D812C] text-white rounded-md hover:bg-[#3a6a21]"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>Find Your Home Abroad | Tunisian Properties</title>
        <meta name="description" content="Discover properties for rent or sale in countries with strong Tunisian communities" />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Home Abroad</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover properties for rent or sale in countries with strong Tunisian communities
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'rent' ? 'bg-[#4D812C] text-white' : 'bg-[#EBEBE1] text-black'}`}
                aria-label="View properties for rent"
              >
                For Rent
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'sale' ? 'bg-[#4D812C] text-white' : 'bg-[#EBEBE1] text-black'}`}
                aria-label="View properties for sale"
              >
                For Sale
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <label htmlFor="property-search" className="sr-only">Search properties</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                id="property-search"
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#23371c] focus:border-transparent"
                placeholder="Search by location, property type, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search properties"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-[#23371c] text-[#23371c] rounded-lg hover:bg-[#EBEBE1] transition-colors"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select 
                    id="country-select"
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23371c] focus:border-transparent rounded-lg"
                    value={selectedCountry || ''}
                    onChange={(e) => setSelectedCountry(e.target.value || null)}
                    aria-label="Select country"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      id="price-range-min"
                      type="range"
                      min="0"
                      max={activeTab === 'rent' ? 10000 : 1000000}
                      step={activeTab === 'rent' ? 100 : 10000}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                      aria-label="Minimum price"
                    />
                    <input
                      id="price-range-max"
                      type="range"
                      min="0"
                      max={activeTab === 'rent' ? 10000 : 1000000}
                      step={activeTab === 'rent' ? 100 : 10000}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button 
                    className="w-full bg-[#23371c] text-white py-2 px-4 rounded-lg hover:bg-[#4D812C] transition-colors"
                    aria-label="Apply filters"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popular Countries Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Popular Countries with Tunisian Communities</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {countries.map(country => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.name)}
              className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${selectedCountry === country.name ? 'border-[#4D812C] bg-[#EBEBE1]' : 'border-gray-200 hover:border-[#23371c]'}`}
              aria-label={`View properties in ${country.name}`}
            >
              <div className="text-4xl mb-2">
                {country.code === 'fr' ? '🇫🇷' : 
                 country.code === 'de' ? '🇩🇪' : 
                 country.code === 'ca' ? '🇨🇦' : 
                 country.code === 'us' ? '🇺🇸' : '🇦🇪'}
              </div>
              <h3 className="font-medium">{country.name}</h3>
              <p className="text-sm text-gray-500">{country.propertyCount} properties</p>
            </button>
          ))}
        </div>
      </div>

      {/* Property Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {activeTab === 'rent' ? 'Properties for Rent' : 'Properties for Sale'}
          </h2>
          <div className="text-gray-500">
            Showing {filteredProperties.length} of {properties.filter(p => p.type === activeTab).length} properties
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <div 
                key={property.id} 
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${property.featured ? 'border-[#4D812C]' : 'border-gray-200'}`}
                onClick={() => handlePropertyClick(property)}
                style={{ cursor: 'pointer' }}
                aria-label={`View details for ${property.title}`}
              >
                {property.featured && (
                  <div className="absolute top-2 left-2 bg-[#4D812C] text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
                <div className="h-48 bg-gray-200 relative">
                  <Image 
                    src={property.images[0]} 
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle save property logic here
                    }}
                    aria-label="Save property"
                  >
                    <FiHeart className="text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{property.title}</h3>
                    <div className="text-[#4D812C] font-bold">
                      {property.type === 'rent' ? `$${property.price}/mo` : `$${property.price.toLocaleString()}`}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <FiMapPin className="mr-1" size={14} />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <span className="flex items-center">
                      <FiHome className="mr-1" size={14} />
                      {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                    </span>
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Support Section */}
      <div className="bg-[#EBEBE1] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tunisian Community Support</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our platform connects you with established Tunisian communities abroad to help with your relocation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#23371c] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHome size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3">Housing Assistance</h3>
              <p className="text-gray-600">
                Get help from fellow Tunisians who can guide you through the local housing market.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#23371c] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Schooling Information</h3>
              <p className="text-gray-600">
                Resources for Tunisian families moving abroad with school-age children.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-[#23371c] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Network</h3>
              <p className="text-gray-600">
                Connect with Tunisian expats who can help you settle in your new country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAbroadPage;