import Head from 'next/head';
import { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Zephyr - A breeze away from home</title>
        <meta name="description" content="Modern real estate solutions for Tunisians abroad" />
      </Head>

      {/* Hero with placeholder for image */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-[#23371c] mb-4">
              For we are <span className="font-medium">Zephyr</span> 
            </h1>
            <p className="text-lg text-gray-600">A breeze away from home</p>
          </div>
        </div>
        {/* Image placeholder - replace with your actual image */}
        <div className="w-full h-64 md:h-96 bg-[#EBEBE1] relative overflow-hidden">
          {/* Replace this div with your Image component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500">[Hero image placeholder]</span>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              {/* Image placeholder */}
              <div className="bg-[#EBEBE1] h-64 md:h-96 w-full rounded-lg flex items-center justify-center">
                <span className="text-gray-500">[Mission image placeholder]</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-light text-[#23371c] mb-6">
                Our <span className="font-medium">mission</span> is simple
              </h2>
              <div className="h-px w-16 bg-[#23371c] mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Zephyr bridges the gap between Tunisians abroad and their real estate needs, 
                whether investing back home or finding housing overseas.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We combine local expertise with diaspora insights to create seamless 
                cross-border property experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-[#23371c]">
              How we <span className="font-medium">help</span>
            </h2>
            <div className="h-px w-16 bg-[#23371c] mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Invest in Tunisia",
                description: "Property investment solutions tailored for diaspora needs",
                image: "[Image 1]"
              },
              {
                title: "Rent Abroad",
                description: "Find your perfect home with community support",
                image: "[Image 2]"
              },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-[#EBEBE1] flex items-center justify-center">
                  {service.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-[#23371c] mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-light text-[#23371c] mb-6">
              Our <span className="font-medium">approach</span>
            </h2>
            <p className="text-gray-600">
              We combine technology with human insight to deliver exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Insight",
                description: "Deep understanding of Tunisian diaspora needs"
              },
              {
                title: "Verified Listings",
                description: "Only quality, authenticated properties"
              },
              {
                title: "End-to-End",
                description: "Support from search to settlement"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="h-16 w-16 bg-[#23371c] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-[#23371c] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA placeholder */}
      <div className="py-16 bg-[#23371c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Ready to begin your journey?</h2>
          <button className="px-8 py-3 bg-white text-[#23371c] rounded-lg font-medium">
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;