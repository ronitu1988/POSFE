export type StaffRole = "owner" | "front_desk" | "technician" | "user";

export interface StaffMember {
  id: number;
  display_name: string;
  role: StaffRole;
  is_active: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
  user: StaffMember;
}

export interface ApiErrorResponse {
  detail?: string;
}