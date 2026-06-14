export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  rating: number;
  reviewsCount: number;
  specs: string[];
  description: string;
  image: string; // lucide icon identifier or a path
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedType?: string;
}

export interface CustomKitConfig {
  studentClass: string;
  subjects: string[];
  notebookType: string;
  stationeryKit: string;
  bagBrand: string;
  shoeSize: string;
  specialRequests: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customKit?: CustomKitConfig;
  total: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  serviceType: 'Pre-Book' | 'Bulk Order' | 'Standard Delivery' | 'School Kit Package';
  paymentMethod: 'COD' | 'Online';
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
  createdAt: string;
  trackingNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent' | 'Teacher';
  rating: number;
  comment: string;
  avatarSeed: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}
