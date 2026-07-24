export interface UnitInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  openingHours: string;
  mapsUrl: string;
  consultantName?: string;
  consultantTitle?: string;
  consultantImage?: string;
}

export type ServiceCategory = 'Todos' | 'Rodas' | 'Pneus' | 'Centro automotivo';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'Rodas' | 'Pneus' | 'Centro automotivo';
  description: string;
  detailedInfo: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
}
