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
      answer:
        "Non-smartphone users can access the platform via USSD or IVR services. They can register, browse jobs, and apply using simple numeric inputs or voice navigation.",
      color: "bg-blue-100", // Light blue background for this FAQ
    },
    {
      question: "Is there a fee to use the platform?",
      answer:
        "The platform is free for workers to browse and apply for jobs. Job providers pay a nominal fee for posting jobs and accessing additional features.",
      color: "bg-green-100", // Light green background for this FAQ
    },
    {
      question: "How secure is the payment system?",
      answer:
        "We use encrypted transactions to ensure secure and reliable payments between job providers and workers. Additionally, a rating system fosters transparency and trust.",
      color: "bg-yellow-100", // Light yellow background for this FAQ
    },
    {
      question: "Can I use the platform in my language?",
      answer:
        "Yes! The platform supports multiple languages to cater to diverse users. You can choose your preferred language during registration or through settings.",
      color: "bg-purple-100", // Light purple background for this FAQ
    },
    {
      question: "What types of jobs are available on the platform?",
      answer:
        "The platform offers a wide range of jobs, including construction, domestic work, delivery services, and more. Job providers can specify job details and requirements.",
      color: "bg-pink-100", // Light pink background for this FAQ
    },
    {
      question: "How do I rate a worker or job provider?",
      answer:
        "After a job is completed, both workers and providers can rate each other based on their experience. These ratings ensure a trustworthy and reliable ecosystem.",
      color: "bg-indigo-100", // Light indigo background for this FAQ
    },
  ];

  return (
    <div className="faq-container flex flex-col items-center mx-auto my-8 p-8 max-w-7xl relative">
      <div className="faq-section mt-12 w-full">
        <div className="items-center text-center mb-16">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj text-center">
              Frequently Asked Questions
            </span>
          </span>
        </div>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item mb-6 p-4 rounded-lg shadow-md transition-all duration-300 ${faq.color} ${openIndex === index ? 'border-2 border-gray-500' : ''}`}
          >
            <div
              className="flex items-center text-xl font-semibold mb-2 cursor-pointer text-black"
              onClick={() => toggleFaq(index)}
            >
              <FontAwesomeIcon
                icon={openIndex === index ? faChevronUp : faChevronDown}
                className="mr-2"
              />
              {faq.question}
            </div>
            {openIndex === index && (
              <p className="text-lg text-black p-5">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
