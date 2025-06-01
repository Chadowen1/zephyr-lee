import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaChartLine,
  FaHome,
  FaGlobe,
  FaHandshake,
  FaUserFriends,
  FaShieldAlt,
} from "react-icons/fa";

export default function HomePage() {
  // Sample property data for the featured sections
  const featuredTunisiaProperties = [
    {
      id: 1,
      title: "Seaside Villa in Hammamet",
      price: "€250,000",
      location: "Hammamet, Tunisia",
      type: "Villa",
      beds: 4,
      baths: 3,
      image: "/hammamet.jpg",
    },
    {
      id: 2,
      title: "Modern Apartment in Tunis",
      price: "€120,000",
      location: "Lac 2, Tunis",
      type: "Apartment",
      beds: 3,
      baths: 2,
      image: "/tunis.jpg",
    },
    {
      id: 3,
      title: "Commercial Space in Sousse",
      price: "€180,000",
      location: "Sousse Medina",
      type: "Commercial",
      beds: 0,
      baths: 1,
      image: "/mall.jpg",
    },
  ];

  const featuredAbroadProperties = [
    {
      id: 4,
      title: "Cozy Apartment in Paris",
      price: "€1,200/mo",
      location: "11th Arrondissement, Paris",
      type: "Apartment",
      beds: 1,
      baths: 1,
      image: "/paris.jpg",
    },
    {
      id: 5,
      title: "Family Home in Montreal",
      price: "$2,100/mo",
      location: "Plateau Mont-Royal, Montreal",
      type: "House",
      beds: 3,
      baths: 2,
      image: "/canada.jpg",
    },
    {
      id: 6,
      title: "Studio in Berlin",
      price: "€850/mo",
      location: "Kreuzberg, Berlin",
      type: "Studio",
      beds: 1,
      baths: 1,
      image: "/berlin.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[80vh] max-h-[800px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/gooding.jpg"
          alt="Beautiful Tunisian coastline with modern buildings"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 container mx-auto">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your Gateway to Smart Real Estate
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Invest in Tunisia or find your perfect home abroad with our
              trusted platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/invest"
                className="bg-[#1A2B1F] hover:bg-[#3a6722] text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                Invest in Tunisia
              </Link>
              <Link
                href="/abroad"
                className="bg-white hover:bg-gray-100 text-[#0e1812] font-medium py-3 px-6 rounded-lg text-center transition-colors"
              >
                Find Housing Abroad
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* Search Bar - Fixed Version */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Find Your Perfect Property
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="location-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <select
                id="location-select"
                name="location"
                aria-label="Select property location"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Any Location</option>
                <option>Tunis</option>
                <option>Sousse</option>
                <option>Hammamet</option>
                <option>Paris, France</option>
                <option>Montreal, Canada</option>
                <option>Berlin, Germany</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="type-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Property Type
              </label>
              <select
                id="type-select"
                name="type"
                aria-label="Select property type"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Any Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price Range
              </label>
              <select
                id="price-select"
                name="price"
                aria-label="Select price range"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Any Price</option>
                <option>Under €50,000</option>
                <option>€50,000 - €100,000</option>
                <option>€100,000 - €200,000</option>
                <option>€200,000+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                aria-label="Search properties"
                className="w-full bg-[#1A2B1F] hover:bg-[#3a6722] text-white py-2 px-4 rounded-md flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

  

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Zephyr?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by thousands of Tunisians worldwide for their real estate
              and relocation needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-4xl text-[#4D812C] mb-4" />,
                title: "Secure Transactions",
                description:
                  "Our platform ensures all financial transactions are protected with bank-level security.",
              },
              {
                icon: (
                  <FaUserFriends className="text-4xl text-[#4D812C] mb-4" />
                ),
                title: "Diaspora Community",
                description:
                  "Connect with fellow Tunisians abroad who can help with your relocation process.",
              },
              {
                icon: <FaChartLine className="text-4xl text-[#4D812C] mb-4" />,
                title: "Investment Expertise",
                description:
                  "Get expert advice on the best real estate investment opportunities in Tunisia.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest in Tunisia Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Invest in Tunisia
              </h2>
              <p className="text-lg text-gray-600">
                Discover lucrative real estate opportunities in your homeland
              </p>
            </div>
            <Link
              href="/invest"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1A2B1F] hover:bg-[#3a6722]"
            >
              View All Properties
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTunisiaProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-[#4D812C]">
                      {property.price}
                    </span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex text-sm text-gray-500">
                    <span className="mr-3">{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rent Abroad Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Find Housing Abroad
              </h2>
              <p className="text-lg text-gray-600">
                Quality properties in popular destinations for Tunisians
              </p>
            </div>
            <Link
              href="/abroad"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1A2B1F] hover:bg-[#3a6722]"
            >
              Browse All Listings
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAbroadProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-[#0e1812]">
                      {property.price}
                    </span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex text-sm text-gray-500">
                    <span className="mr-3">{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Services Section */}
      <section className="py-16 bg-[#0e1812] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Diaspora Support Services
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Comprehensive assistance for Tunisians living abroad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaHome className="text-3xl mb-4" />,
                title: "Property Management",
                description:
                  "We manage your Tunisian properties while you&apos;re abroad",
              },
              {
                icon: <FaGlobe className="text-3xl mb-4" />,
                title: "Relocation Assistance",
                description:
                  "Help with visas, schools, and settling in your new country",
              },
              {
                icon: <FaHandshake className="text-3xl mb-4" />,
                title: "Legal Support",
                description: "Experts in cross-border real estate transactions",
              },
              {
                icon: <FaChartLine className="text-3xl mb-4" />,
                title: "Investment Advice",
                description: "Maximize returns on your Tunisian investments",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-[#1a2b1f] p-6 rounded-lg text-center"
              >
                {service.icon}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from Tunisians who found their perfect home or investment
              through Zephyr
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed B.",
                location: "Paris, France",
                quote:
                  "Zephyr helped me find an apartment in Paris with other Tunisians in the building. The community support was invaluable.",
                image: "/ahmed.jpg",
              },
              {
                name: "Salma K.",
                location: "Montreal, Canada",
                quote:
                  "Investing in Tunisia from abroad was seamless with Zephyr guidance. I now own two properties in Tunis.",
                image: "/salma.jpg",
              },
              {
                name: "Mohamed S.",
                location: "Berlin, Germany",
                quote:
                  "The relocation package helped my family settle in Germany with school information and local contacts.",
                image: "/hamma.jpg",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1A2B1F] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Real Estate Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re investing in Tunisia or looking for a home abroad,
            we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white hover:bg-gray-100 text-[#0e1812] font-medium py-3 px-8 rounded-lg text-center transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg text-center transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}