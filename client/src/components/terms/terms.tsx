import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Tunisian Diaspora Real Estate</title>
        <meta name="description" content="Read our terms and conditions for using our real estate investment and rental services" />
      </Head>

      <main className="min-h-screen bg-white text-[#4D812C]">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
              Please read these terms carefully before using our real estate investment and rental services.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using this platform, you accept and agree to be bound by the terms and provisions of this agreement. 
                  If you do not agree to abide by these terms, please do not use this service.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">2. Service Description</h2>
                <p className="mb-4">
                  Our platform provides three main services:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Real estate investment opportunities in Tunisia for Tunisians living abroad</li>
                  <li>Rental housing solutions in foreign countries for Tunisian migrants</li>
                  <li>Useful resources and assistance for the Tunisian diaspora</li>
                </ul>
                <p>
                  We act as an intermediary platform and do not own the properties listed.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">3. User Responsibilities</h2>
                <p className="mb-4">
                  As a user of our platform, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide accurate and complete information when creating an account</li>
                  <li>Use the platform only for lawful purposes</li>
                  <li>Not engage in any fraudulent activities</li>
                  <li>Verify all property details independently before making commitments</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">4. Investment Risks</h2>
                <p className="mb-4">
                  Real estate investment carries inherent risks. Our platform provides information but does not guarantee:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>The accuracy of property listings</li>
                  <li>Future property values</li>
                  <li>Legal status of properties</li>
                  <li>Return on investment</li>
                </ul>
                <p>
                  We strongly recommend consulting with legal and financial professionals before making investment decisions.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">5. Rental Services</h2>
                <p className="mb-4">
                  For our rental services abroad, please note:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>We facilitate connections but are not party to rental agreements</li>
                  <li>Rental terms are between you and the property owner/manager</li>
                  <li>Community support services are voluntary and we do not guarantee their availability</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">6. Diaspora Resources</h2>
                <p className="mb-4">
                  The information provided regarding education, relocation, and other diaspora services is for general guidance only. 
                  We strive for accuracy but cannot guarantee all information is current or complete.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">7. Privacy Policy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Please refer to our separate Privacy Policy for information on how we collect, 
                  use, and protect your personal data.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">8. Limitation of Liability</h2>
                <p className="mb-4">
                  To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, 
                  special, consequential, or exemplary damages resulting from:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Your use or inability to use the service</li>
                  <li>Unauthorized access to or alteration of your transmissions or data</li>
                  <li>Any transactions entered into through our platform</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">9. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these terms at any time. Continued use of the platform after changes 
                  constitutes acceptance of the new terms.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-[#23371c]">10. Governing Law</h2>
                <p className="mb-4">
                  These terms shall be governed by and construed in accordance with Tunisian law. Any disputes shall be 
                  subject to the exclusive jurisdiction of the Tunisian courts.
                </p>
              </div>

              <div className="mt-16 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at 
                  <a href="mailto:legal@tndiasporaproperty.com" className="text-[#4D812C] hover:underline ml-1">
                    legal@tndiasporaproperty.com
                  </a>.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}