import Head from 'next/head';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Tunisian Diaspora Real Estate Platform</title>
        <meta name="description" content="Get in touch with our team for real estate investments in Tunisia or rental housing abroad" />
      </Head>

      <main className="min-h-screen bg-white text-black">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-[#EBEBE1]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Contact Our Team</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Whether you&apos;re looking to invest in Tunisian real estate or find housing abroad, our team is here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6 text-[#23371c]">Send us a message</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          id="first-name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-transparent"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="last-name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-transparent"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="investment">Real Estate Investment in Tunisia</option>
                        <option value="rental">Rental Housing Abroad</option>
                        <option value="diaspora-support">Diaspora Support Services</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-transparent"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#4D812C] hover:bg-[#23371c] text-white font-medium py-3 px-6 rounded-md transition duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:w-1/2">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-[#23371c]">Our Offices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      <div className="bg-[#EBEBE1] p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-[#23371c]">Tunisia Headquarters</h3>
                        <p className="text-gray-700 mb-2">123 Real Estate Avenue</p>
                        <p className="text-gray-700 mb-2">Tunis, Tunisia 1000</p>
                        <p className="text-gray-700">+216 12 345 678</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-[#23371c]">How We Can Help</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#4D812C] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">Assistance with property search and investment in Tunisia</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#4D812C] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">Support finding rental housing in your destination country</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#4D812C] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">Connections with Tunisian communities abroad</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#4D812C] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-700">Relocation and settlement assistance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}