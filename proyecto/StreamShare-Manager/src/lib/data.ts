import { NetflixIcon } from '@/components/icons/NetflixIcon';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { DisneyPlusIcon } from '@/components/icons/DisneyPlusIcon';
import { BinanceIcon } from '@/components/icons/BinanceIcon';
import { ZelleIcon } from '@/components/icons/ZelleIcon';
import { PagoMovilIcon } from '@/components/icons/PagoMovilIcon';
import type { StreamingService, PaymentMethod, User, Payment, UserSubscription, AccountInventoryItem } from './types';
import { subDays, format } from 'date-fns';

export const streamingServices: StreamingService[] = [
  { id: 'netflix', name: 'Netflix', logo: NetflixIcon, price: 5.99, description: '1 Screen, HD Quality' },
  { id: 'spotify', name: 'Spotify', logo: SpotifyIcon, price: 4.99, description: 'Premium Individual Plan' },
  { id: 'disneyplus', name: 'Disney+', logo: DisneyPlusIcon, price: 6.99, description: 'Includes Star+ and ESPN' },
  { id: 'hbo', name: 'HBO Max', logo: () => 'HBO', price: 5.50, description: 'Standard Plan' },
];

export const paymentMethods: PaymentMethod[] = [
    { name: 'Pago Móvil', logo: PagoMovilIcon },
    { name: 'Zelle', logo: ZelleIcon },
    { name: 'Binance Pay', logo: BinanceIcon },
]

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', registeredAt: format(subDays(new Date(), 45), 'yyyy-MM-dd'), activeSubscriptions: 2 },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', registeredAt: format(subDays(new Date(), 120), 'yyyy-MM-dd'), activeSubscriptions: 1 },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', registeredAt: format(subDays(new Date(), 10), 'yyyy-MM-dd'), activeSubscriptions: 0 },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@example.com', registeredAt: format(subDays(new Date(), 200), 'yyyy-MM-dd'), activeSubscriptions: 3 },
];

export const payments: Payment[] = [
  { id: 'pay-1', userId: 'user-1', userName: 'Alice Johnson', serviceId: 'netflix', serviceName: 'Netflix', amount: 5.99, paymentMethod: 'Zelle', date: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm'), status: 'pending' },
  { id: 'pay-2', userId: 'user-2', userName: 'Bob Williams', serviceId: 'spotify', serviceName: 'Spotify', amount: 4.99, paymentMethod: 'Pago Móvil', date: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm'), status: 'approved' },
  { id: 'pay-3', userId: 'user-4', userName: 'Diana Prince', serviceId: 'disneyplus', serviceName: 'Disney+', amount: 6.99, paymentMethod: 'Binance Pay', date: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm'), status: 'approved' },
  { id: 'pay-4', userId: 'user-1', userName: 'Alice Johnson', serviceId: 'hbo', serviceName: 'HBO Max', amount: 5.50, paymentMethod: 'Zelle', date: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm'), status: 'rejected' },
];

export const userSubscriptions: UserSubscription[] = [
    { 
        id: 'sub-1', 
        serviceId: 'netflix', 
        serviceName: 'Netflix', 
        serviceLogo: NetflixIcon, 
        expiryDate: '2024-08-15', 
        credentials: { email: 'user-a@stream.com', password: 'password123', profile: 'Profile 1' },
        status: 'active'
    },
    { 
        id: 'sub-2', 
        serviceId: 'spotify', 
        serviceName: 'Spotify', 
        serviceLogo: SpotifyIcon, 
        expiryDate: '2024-08-20', 
        credentials: { email: 'user-b@stream.com', password: 'password456' },
        status: 'active'
    },
    { 
        id: 'sub-3', 
        serviceId: 'disneyplus', 
        serviceName: 'Disney+', 
        serviceLogo: DisneyPlusIcon, 
        expiryDate: '2024-07-30', 
        credentials: { email: 'user-c@stream.com', password: 'password789', profile: 'Main Profile' },
        status: 'expired'
    },
    { 
        id: 'sub-4', 
        serviceId: 'hbo', 
        serviceName: 'HBO Max', 
        serviceLogo: () => 'HBO', 
        expiryDate: '2024-08-18', 
        credentials: {},
        status: 'pending'
    },
];

export const accountInventory: AccountInventoryItem[] = [
    { id: 'inv-1', serviceName: 'Netflix', masterEmail: 'master_netflix_1@provider.com', totalProfiles: 5, assignedProfiles: 3, availableProfiles: 2 },
    { id: 'inv-2', serviceName: 'Netflix', masterEmail: 'master_netflix_2@provider.com', totalProfiles: 5, assignedProfiles: 5, availableProfiles: 0 },
    { id: 'inv-3', serviceName: 'Spotify', masterEmail: 'master_spotify_fam@provider.com', totalProfiles: 6, assignedProfiles: 4, availableProfiles: 2 },
    { id: 'inv-4', serviceName: 'Disney+', masterEmail: 'master_disney_1@provider.com', totalProfiles: 7, assignedProfiles: 6, availableProfiles: 1 },
];
