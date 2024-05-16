export interface reservation {
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
  user?: user;
}

export interface user {
  id: number;
  date_created: Date;
  date_edited?: Date;
  date_last_login?: Date;
  email: string;
  name: string;
  roles: string[];
  username: string;
}
