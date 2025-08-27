import type { SVGProps } from "react";

export interface StreamingService {
  id: string;
  name: string;
  logo: React.ComponentType<SVGProps<SVGSVGElement>>;
  price: number;
  description: string;
}

export interface UserSubscription {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceLogo: React.ComponentType<SVGProps<SVGSVGElement>>;
  expiryDate: string;
  credentials: {
    email?: string;
    password?: string;
    profile?: string;
  };
  status: 'active' | 'expired' | 'pending';
}

export interface PaymentMethod {
  name: string;
  logo: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  paymentMethod: 'Pago Móvil' | 'Zelle' | 'Binance Pay';
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  proof?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  activeSubscriptions: number;
}

export interface AccountInventoryItem {
  id: string;
  serviceName: string;
  masterEmail: string;
  totalProfiles: number;
  assignedProfiles: number;
  availableProfiles: number;
}
