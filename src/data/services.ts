export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'burial',
    title: 'Burial Services',
    shortDescription: 'Dignified traditional burial arrangements with compassionate guidance for your family every step of the way.',
    fullDescription: 'Our burial services provide a meaningful, time-honored farewell for your loved one. We coordinate every detail with care — from preparation and visitation to graveside committal — so your family can focus on honoring a life well lived.',
    icon: '✦',
    features: ['Full preparation and care', 'Visitation and viewing', 'Funeral service coordination', 'Graveside committal service', 'Transportation to cemetery', 'Coordination with cemetery of choice'],
  },
  {
    id: 'cremation',
    title: 'Cremation Services',
    shortDescription: 'Respectful cremation options with meaningful memorial choices that honor your loved one\'s wishes.',
    fullDescription: 'Cremation offers families flexibility while still providing meaningful opportunities to gather, remember, and celebrate a life. Our team guides you through each option with honesty and care.',
    icon: '✦',
    features: ['Direct cremation', 'Cremation with memorial service', 'Selection of quality urns', 'Certificate of cremation', 'Return of cremated remains', 'Scattering guidance and options'],
  },
  {
    id: 'memorial',
    title: 'Memorial & Celebration of Life',
    shortDescription: 'Beautiful, personalized memorial services that truly reflect the unique life of your loved one.',
    fullDescription: 'A celebration of life is a meaningful way to honor who your loved one was — their passions, their relationships, and their legacy. Our team helps you create a tribute as unique as the person you are remembering.',
    icon: '✦',
    features: ['Custom memorial programs', 'Photo and video tributes', 'Personalized décor and themes', 'Memorial music coordination', 'Reception coordination', 'Live-stream options (coming Phase 2)'],
  },
  {
    id: 'veteran',
    title: 'Veteran Funeral Services',
    shortDescription: 'Honoring those who served with the dignity, respect, and military honors they rightfully deserve.',
    fullDescription: 'Emanuel\'s Chapel is proud to honor the men and women who served our country. We coordinate all military honors, benefits assistance, and tribute elements to ensure a fitting farewell for our veterans.',
    icon: '✦',
    features: ['Military honors coordination', 'Flag presentation ceremony', 'VA burial benefits assistance', 'Presidential Memorial Certificate request', 'Honor guard coordination', 'Veteran-specific tribute options'],
  },
  {
    id: 'transportation',
    title: 'Transportation & Coordination',
    shortDescription: 'Professional fleet services for respectful transport of your loved one and family members.',
    fullDescription: 'Our professional fleet includes hearses and limousines for dignified, respectful transportation throughout every stage of service. Our experienced staff ensures every detail is handled with care.',
    icon: '✦',
    features: ['24-hour removal services', 'Professional hearse fleet', 'Family limousine service', 'Out-of-area transfer coordination', 'Airport transfer coordination', 'Local and regional transport'],
  },
  {
    id: 'personalized',
    title: 'Personalized Tributes',
    shortDescription: 'Meaningful personal touches that reflect your loved one\'s unique story, passions, and legacy.',
    fullDescription: 'Every life is a story worth telling. Our personalized tribute options let families create deeply meaningful services — from custom programs and floral arrangements to memory displays and tribute videos.',
    icon: '✦',
    features: ['Custom memorial programs', 'Memory table arrangements', 'Tribute video production assistance', 'Specialty floral arrangements', 'Personalized keepsakes', 'Online memorial pages (Phase 2)'],
  },
  {
    id: 'preplanning',
    title: 'Pre-Planning Support',
    shortDescription: 'Give your family the gift of peace of mind by planning ahead with compassionate guidance today.',
    fullDescription: 'Pre-planning allows you to document your wishes, relieve your family of difficult decisions, and ensure your service reflects who you truly are. Our team makes the process simple and reassuring.',
    icon: '✦',
    features: ['Confidential consultation', 'Documentation of wishes', 'Review of service options', 'Budget planning guidance', 'Pre-arrangement paperwork', 'Flexible planning timeline'],
  },
];
