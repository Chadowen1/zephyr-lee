import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Tunisian Diaspora Real Estate Platform</title>
        <meta name="description" content="Read our privacy policy to understand how we protect your data" />
      </Head>

      <main className="min-h-screen bg-white text-[#4D812C]">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-lg md:text-xl text-white">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* Introduction */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Introduction</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Welcome to our platform connecting Tunisians abroad with real estate opportunities in Tunisia and 
                      housing solutions overseas. We are committed to protecting your privacy and ensuring the security 
                      of your personal information.
                    </p>
                    <p>
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                      you use our services, including our website, mobile applications, and related services.
                    </p>
                  </div>
                </article>

                {/* Information We Collect */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Information We Collect</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Personal Identification Information:</strong> Name, email address, phone number, 
                        nationality, residency status when you register an account or make inquiries.
                      </li>
                      <li>
                        <strong>Real Estate Preferences:</strong> Property types, locations, budget ranges, and 
                        other search criteria you provide.
                      </li>
                      <li>
                        <strong>Financial Information:</strong> Limited payment information when processing transactions 
                        (though we use secure third-party payment processors).
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Information about how you interact with our platform, including 
                        search history, property views, and session duration.
                      </li>
                      <li>
                        <strong>Location Data:</strong> Approximate location information to provide localized services 
                        and property listings.
                      </li>
                    </ul>
                  </div>
                </article>

                {/* How We Use Your Information */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">How We Use Your Information</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We use the information we collect for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To provide and maintain our real estate and relocation services</li>
                      <li>To personalize your experience and show relevant property listings</li>
                      <li>To connect buyers with sellers and renters with landlords</li>
                      <li>To facilitate communication between users on our platform</li>
                      <li>To improve our services and develop new features</li>
                      <li>To provide customer support and respond to inquiries</li>
                      <li>To send important notices and updates about our services</li>
                      <li>To detect and prevent fraud and unauthorized activities</li>
                    </ul>
                  </div>
                </article>

                {/* Data Sharing and Disclosure */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Data Sharing and Disclosure</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>With Property Professionals:</strong> When you express interest in a property, we may 
                        share your contact information with the relevant real estate agent or property owner.
                      </li>
                      <li>
                        <strong>Service Providers:</strong> We may engage third-party companies to perform services 
                        on our behalf (e.g., payment processing, data analysis, customer support).
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> If required by law or in response to valid legal process.
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, 
                        or acquisition.
                      </li>
                    </ul>
                    <p>
                      We do not sell your personal information to third parties for their marketing purposes.
                    </p>
                  </div>
                </article>

                {/* Data Security */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Data Security</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal 
                      information, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of sensitive data in transit and at rest</li>
                      <li>Regular security assessments and testing</li>
                      <li>Access controls and authentication mechanisms</li>
                      <li>Secure development practices</li>
                    </ul>
                    <p>
                      However, no method of transmission over the Internet or electronic storage is 100% secure, 
                      and we cannot guarantee absolute security.
                    </p>
                  </div>
                </article>

                {/* International Data Transfers */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">International Data Transfers</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      As our platform serves Tunisians both in Tunisia and abroad, your information may be 
                      transferred to, stored, and processed in countries outside your country of residence, 
                      including Tunisia and other countries where our service providers operate.
                    </p>
                    <p>
                      We will take all steps reasonably necessary to ensure your data is treated securely and 
                      in accordance with this Privacy Policy.
                    </p>
                  </div>
                </article>

                {/* Your Rights */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Your Rights</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Right to access and receive a copy of your personal data</li>
                      <li>Right to rectify inaccurate or incomplete data</li>
                      <li>Right to request deletion of your personal data</li>
                      <li>Right to restrict or object to processing of your data</li>
                      <li>Right to data portability</li>
                      <li>Right to withdraw consent (where processing is based on consent)</li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us using the information provided below.
                    </p>
                  </div>
                </article>

                {/* Changes to This Policy */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Changes to This Policy</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any changes by 
                      posting the new Privacy Policy on this page and updating the -Last Updated- date at the 
                      bottom of this policy.
                    </p>
                    <p>
                      We encourage you to review this Privacy Policy periodically for any changes. Changes to this 
                      Privacy Policy are effective when they are posted on this page.
                    </p>
                  </div>
                </article>

                {/* Contact Us */}
                <article>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#23371c]">Contact Us</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>By email: privacy@tndiasporaproperty.com</li>
                      <li>By mail: [Your Company Address, Tunisia]</li>
                    </ul>
                  </div>
                </article>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
                <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;