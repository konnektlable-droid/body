export interface Service {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  image: string;
  features: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: string;
}
