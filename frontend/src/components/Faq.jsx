import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the platform work for non-smartphone users?",
      answer: "Non-smartphone users can access the platform via USSD or IVR services. They can register, browse jobs, and apply using simple numeric inputs or voice navigation."
    },
    {
      question: "Is there a fee to use the platform?",
      answer: "The platform is free for workers to browse and apply for jobs. Job providers pay a nominal fee for posting jobs and accessing additional features."
    },
    {
      question: "How secure is the payment system?",
      answer: "We use encrypted transactions to ensure secure and reliable payments between job providers and workers. Additionally, a rating system fosters transparency and trust."
    },
    {
      question: "Can I use the platform in my language?",
      answer: "Yes! The platform supports multiple languages to cater to diverse users. You can choose your preferred language during registration or through settings."
    },
    {
      question: "What types of jobs are available on the platform?",
      answer: "The platform offers a wide range of jobs, including construction, domestic work, delivery services, and more. Job providers can specify job details and requirements."
    },
    {
      question: "How do I rate a worker or job provider?",
      answer: "After a job is completed, both workers and providers can rate each other based on their experience. These ratings ensure a trustworthy and reliable ecosystem."
    }
  ];

  return (
    <div className="faq-container flex flex-col items-center mx-auto my-8 p-8 max-w-7xl bg-gray-100 rounded-lg shadow-lg">
      <div className="faq-section mt-12 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item mb-6 p-4 bg-white rounded-lg shadow-md">
            <div
              className="flex items-center text-xl font-semibold mb-2 cursor-pointer text-blue-600"
              onClick={() => toggleFaq(index)}
            >
              <FontAwesomeIcon icon={openIndex === index ? faChevronUp : faChevronDown} className="mr-2" />
              {faq.question}
            </div>
            {openIndex === index && (
              <p className="text-lg text-gray-700 p-5">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;