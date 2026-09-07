export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What should I do first when a loved one passes?',
    answer: 'First, take a moment to breathe — you do not have to navigate this alone. If your loved one passes at home, contact your local authorities or hospice provider. Then call Emanuel\'s Chapel at (773) 912-6745. Our team is available to guide you through every next step with compassion and clarity, 24 hours a day.',
    category: 'Immediate Need',
  },
  {
    id: 'faq-2',
    question: 'Can Emanuel\'s Chapel help if my loved one is at a hospital or nursing facility?',
    answer: 'Yes. We can arrange transport directly from hospitals, nursing homes, hospice facilities, or private residences. Simply call us and let us know the location — our professional staff will coordinate everything from there.',
    category: 'Immediate Need',
  },
  {
    id: 'faq-3',
    question: 'Do you offer both burial and cremation services?',
    answer: 'Yes, Emanuel\'s Chapel offers a full range of burial and cremation services. Whether your family prefers a traditional burial with visitation and graveside service, or a cremation with or without a memorial, our team will help you understand every option and make the choice that is right for your loved one.',
    category: 'Services',
  },
  {
    id: 'faq-4',
    question: 'Can we personalize the service?',
    answer: 'Absolutely. We believe every service should be as unique as the life it honors. Families can incorporate personal music, photo and video tributes, memory displays, flowers, custom programs, and meaningful themes that reflect who their loved one truly was.',
    category: 'Services',
  },
  {
    id: 'faq-5',
    question: 'Do you assist with veteran funeral honors?',
    answer: 'Yes. Emanuel\'s Chapel is proud to assist veterans and their families in coordinating military funeral honors, including flag presentation, honor guard coordination, and VA benefit assistance. Please let us know of your loved one\'s military service when you call.',
    category: 'Veterans',
  },
  {
    id: 'faq-6',
    question: 'How can I request pricing information?',
    answer: 'We are happy to provide complete pricing information by phone or through our online pricing request form. Emanuel\'s Chapel is committed to transparency — we want families to have the information they need to make confident decisions without pressure or confusion.',
    category: 'Pricing',
  },
  {
    id: 'faq-7',
    question: 'Can I plan ahead for my own arrangements?',
    answer: 'Yes, and we encourage it. Pre-planning allows you to document your wishes clearly, reduce the emotional burden on your family, and make thoughtful decisions without time pressure. Our team offers private consultations and can walk you through all available options at your own pace.',
    category: 'Planning Ahead',
  },
  {
    id: 'faq-8',
    question: 'How do I contact Emanuel\'s Chapel for immediate assistance?',
    answer: 'Call us anytime at (773) 912-6745. Our team is available around the clock for families who need immediate support. You can also submit our Immediate Need form online and a team member will contact you as quickly as possible.',
    category: 'Contact',
  },
  {
    id: 'faq-9',
    question: 'What is the General Price List and how do I receive one?',
    answer: 'The General Price List is a legally required disclosure that outlines our pricing for all funeral goods and services. You may request a copy by calling our office, visiting in person, or completing our online pricing request form. We are happy to walk through it with you.',
    category: 'Pricing',
  },
  {
    id: 'faq-10',
    question: 'How long does it take to complete arrangements?',
    answer: 'The timeline for completing arrangements varies based on the type of service and the specific wishes of your family. Our directors will guide you through the process step by step and keep you informed every step of the way. Most arrangements can be completed within one or two consultations.',
    category: 'Services',
  },
];
