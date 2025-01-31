import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the platform work for non-smartphone users?",
      answer: "Our platform is designed to be accessible to everyone. For non-smartphone users, we provide:\n\n• Simple SMS-based job alerts\n• Voice call support in local languages\n• USSD-based job applications\n• Offline registration at local centers",
      category: "Platform Access",
    },
    {
      question: "Is there a fee to use the platform?",
      answer: "We believe in making job opportunities accessible to all:\n\n• Workers: Free registration and job applications\n• Basic job search: Always free\n• Job alerts: Free SMS notifications\n• Premium features: Optional paid services for employers",
      category: "Pricing",
    },
    {
      question: "How secure is the payment system?",
      answer: "Your security is our top priority:\n\n• End-to-end encrypted transactions\n• Multiple payment options (UPI, bank transfer, cash)\n• Escrow service for large payments\n• 24/7 fraud prevention monitoring",
      category: "Security",
    },
    {
      question: "Can I use the platform in my language?",
      answer: "Yes! We support multiple Indian languages:\n\n• Hindi, English, and major regional languages\n• Voice support in local dialects\n• Multi-language SMS alerts\n• Local language customer support",
      category: "Language Support",
    },
    {
      question: "What types of jobs are available?",
      answer: "We offer diverse job opportunities:\n\n• Construction and labor work\n• Domestic help and housekeeping\n• Delivery and logistics\n• Factory and manufacturing\n• Agriculture and farming\n• Security services",
      category: "Jobs",
    },
    {
      question: "How does the rating system work?",
      answer: "Our rating system ensures quality and trust:\n\n• Two-way rating system\n• Verified reviews only\n• Performance badges for consistent service\n• Dispute resolution support",
      category: "Ratings",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl opacity-20"></div>
            <h2 className="relative text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-4">
            Find answers to common questions about our platform
          </p>
        </div>
        

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto grid gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div className="pr-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 mr-3 text-blue-600 bg-blue-50 rounded-lg text-sm font-bold">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                  </div>
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              
              <div
                className={`transition-all duration-200 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a
              href="#contact"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
