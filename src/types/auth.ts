export interface Admin {
    id: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    data: {
      admin: Admin;
    }
  }