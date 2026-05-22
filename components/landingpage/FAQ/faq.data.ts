import { FaqItem, FaqSectionMeta } from "./faq.types";

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "What is the admission requirements?",
    answer:
      "Admission usually requires filling out the online admission form or visiting the school office in person. You will need to provide previous academic records, birth certificate, and passport-size photographs.",
  },
  {
    id: 2,
    question: "What facilities does the school provide?",
    answer:
      "The school provides modern classrooms, a well-stocked library, computer labs, science laboratories, a sports ground, a cafeteria, and a dedicated medical room for student health needs.",
  },
  {
    id: 3,
    question: "How can parents track student progress?",
    answer:
      "Parents can track student progress through our online portal, which is updated regularly with grades, attendance records, and teacher feedback. Parent-teacher meetings are also held every term.",
  },
  {
    id: 4,
    question: "What is the school fee payment process?",
    answer:
      "School fees can be paid online via the parent portal using credit/debit cards or bank transfers. You can also pay in person at the school's finance office during working hours.",
  },
  {
    id: 5,
    question: "Does the school provide transportation services?",
    answer:
      "Yes, the school provides safe and reliable bus transportation covering most areas of the city. Routes and schedules are available on the school website and can be customized upon request.",
  },
  {
    id: 6,
    question: "What extracurricular activities are available?",
    answer:
      "We offer a wide range of extracurricular activities including football, basketball, music, drama, debate club, robotics, painting, and various cultural clubs to ensure holistic student development.",
  },
];

export const faqSectionMeta: FaqSectionMeta = {
  badge: "Frequently Asked Questions",
  heading: "Know More About eSchool",
  description:
    "We've got answers! Explore our comprehensive collection of frequently asked questions to find solutions to common queries.",
};
