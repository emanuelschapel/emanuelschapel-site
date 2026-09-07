export interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string[];
}

export const resources: Resource[] = [
  {
    id: 'immediate-steps',
    title: 'What to Do When a Loved One Passes',
    description: 'A calm, step-by-step guide for the first hours and days after a loss.',
    icon: '♥',
    content: [
      'Contact authorities or hospice if needed — they will guide you on the immediate medical steps.',
      'Call Emanuel\'s Chapel at (773) 912-6745 — we are available 24 hours a day.',
      'Notify immediate family members and close friends when you are ready.',
      'Gather any documents you have access to: ID, insurance policies, military records, and prior arrangements if available.',
      'Allow yourself time and space to grieve — our team handles the details so your family can focus on each other.',
    ],
  },
  {
    id: 'planning-checklist',
    title: 'Funeral Planning Checklist',
    description: 'A practical checklist to help families organize arrangements and important decisions.',
    icon: '✓',
    content: [
      'Choose a funeral home and contact them promptly.',
      'Decide between burial and cremation.',
      'Select a date, time, and location for the service.',
      'Notify family, friends, clergy, and employers.',
      'Prepare an obituary and share with local publications if desired.',
      'Arrange flowers, music, and personalized elements.',
      'Review any pre-arrangements or insurance policies.',
      'Gather necessary documents: death certificate copies, Social Security info, military records.',
    ],
  },
  {
    id: 'burial-vs-cremation',
    title: 'Burial vs. Cremation: Understanding Your Options',
    description: 'A compassionate overview of the differences to help families make an informed choice.',
    icon: '⚘',
    content: [
      'Burial preserves the body for viewing, visitation, and graveside committal — a time-honored tradition for many families.',
      'Cremation is a flexible, often more affordable option that still allows for meaningful memorial services.',
      'Both options can include visitation, memorial services, and personalized tributes.',
      'Religious, cultural, and personal beliefs often guide this decision — our team respects and supports all preferences.',
      'Our funeral directors are available to answer your questions and help you understand both options fully.',
    ],
  },
  {
    id: 'veterans-benefits',
    title: 'Veterans Burial Benefits',
    description: 'An overview of burial benefits and honors available to veterans and their families.',
    icon: '★',
    content: [
      'Veterans may be eligible for burial in a national or state veterans cemetery at no cost.',
      'The VA provides burial allowances to eligible veterans, subject to conditions.',
      'Military funeral honors — including flag presentation — are available upon request.',
      'Presidential Memorial Certificates are available to the families of honorably discharged veterans.',
      'Contact Emanuel\'s Chapel and let us know of your loved one\'s service — we will coordinate all honors on your behalf.',
    ],
  },
  {
    id: 'grief-support',
    title: 'Grief Support Resources',
    description: 'You do not have to grieve alone. Here are resources to help support you and your family.',
    icon: '✦',
    content: [
      'Give yourself permission to grieve in your own way and at your own pace — there is no timeline.',
      'Connect with family, faith communities, or trusted friends for support.',
      'Local grief support groups are available through many hospitals, churches, and community organizations.',
      'The National Alliance for Grieving Children offers resources for bereaved families: childrengrieve.org',
      'The Grief Recovery Method offers free resources and trained specialists: griefrecoverymethod.com',
      'If grief feels overwhelming, speaking with a licensed counselor or therapist can provide meaningful support.',
    ],
  },
  {
    id: 'understanding-costs',
    title: 'Understanding Funeral Costs',
    description: 'A transparent overview of what shapes funeral costs and how to make informed decisions.',
    icon: '◇',
    content: [
      'Funeral costs depend on the type of service chosen: burial services generally include more goods and coordination.',
      'The Federal Trade Commission\'s Funeral Rule requires funeral homes to provide itemized pricing upon request.',
      'Families are never required to purchase a package — services can be arranged individually based on need and budget.',
      'Pre-planning your arrangements today can lock in current pricing and relieve financial uncertainty for your family.',
      'Contact Emanuel\'s Chapel to request our General Price List or to speak with a director about your specific needs.',
    ],
  },
];
