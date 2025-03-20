// auth types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

// category types
export interface Category {
  id: string;
  title: string;
}

export interface CategoryCreate {
  title: string;
  description: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

// Entity types
export interface Entity {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
}

export interface EntityCreate {
  amount: number;
  description: string;
  date: string;
  categoryId: string;
}

export interface EntityState {
  entries: Entity[];
  isLoading: boolean;
  error: string | null;
}