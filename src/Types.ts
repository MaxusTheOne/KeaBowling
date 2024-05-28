export interface Reservation {
  bookingInformation?: {
    id: number;
    booking_typeid: number;
    user_id: number;
    people_amount: number;
    reservation_time: Date;
    booking_type: string;
  };
  bookingType?: {
    is_child_friendly?: boolean;
    id: number;
  };
  user?: User;
}

export interface ReservationType {
  id: number;
  userId: number;
  userMail: string;
  bookingType: string;
  peopleAmount: number;
  reservationDateTime: Date;
  reservationLengthMinutes: number;
  childFriendly: boolean;
}

export interface User {
  id: number;
  created: Date;
  edited?: Date;
  email: string;
  roles: string[];
  username: string;
}

export interface APIUser {
  id: string;
  created: string;
  edited?: string;
  email: string;
  username: string;
  roles: string[];
}

export interface Equipment {
  id: number;
  name: string;
  description: string;
  brand: string;
  type: string;
  stockAmount: number;
}

export interface EquipmentDTO {
  name: string;
  description: string;
  brand: string;
  type: string;
  stockAmount: number;
}

export interface Product {
  receiptId?: number;
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface Schedule {
  id: number;
  username: string;
  start: Date;
  end: Date;
}
