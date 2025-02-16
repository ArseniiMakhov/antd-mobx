export type User = {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  status: 'active' | 'inactive';
  phone: string;
  address: string;
  activityHistory: string[];
}