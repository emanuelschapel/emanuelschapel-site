// PHASE 1: Static sample obituary data
// PHASE 2: Replace with API call to obituary management system (CMS or custom backend)

export interface Obituary {
  id: string;
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  serviceDate: string;
  serviceTime: string;
  serviceLocation: string;
  shortBio: string;
  imageUrl?: string;
  hasLivestream: boolean;
  isSampleData: boolean;
}

export const obituaries: Obituary[] = [
  {
    id: 'sample-001',
    name: 'Earl Bester',
    dateOfBirth: '1948',
    dateOfPassing: 'May 2026',
    serviceDate: 'Friday, May 29, 2026',
    serviceTime: '11:00 AM – 12:00 PM',
    serviceLocation: 'Cornerstone Community Church, 608 E. Ward Ave., Ottawa, IL 61350',
    shortBio: 'A beloved husband, father, and community servant. Earl dedicated his life to his family and faith, leaving a legacy of warmth and generosity that touched all who knew him.',
    hasLivestream: false,
    isSampleData: true,
  },
  {
    id: 'sample-002',
    name: 'Gregory D. Green',
    dateOfBirth: '1955',
    dateOfPassing: 'May 2026',
    serviceDate: 'Thursday, May 22, 2026',
    serviceTime: '11:00 AM – 12:00 PM',
    serviceLocation: "Emanuel's Chapel, Large Chapel",
    shortBio: 'Gregory was a proud Chicagoan who gave freely of his time, talents, and laughter. He is remembered for his devotion to his grandchildren and his lifelong love of music.',
    hasLivestream: false,
    isSampleData: true,
  },
  {
    id: 'sample-003',
    name: 'Margaret Louise Williams',
    dateOfBirth: '1942',
    dateOfPassing: 'June 2026',
    serviceDate: 'Saturday, June 7, 2026',
    serviceTime: '10:00 AM – 11:30 AM',
    serviceLocation: "Emanuel's Chapel, Main Chapel",
    shortBio: 'A devoted mother of five and grandmother of eleven, Margaret spent her life nurturing others. Her faith, grace, and cooking brought comfort to everyone at her table.',
    hasLivestream: false,
    isSampleData: true,
  },
];
