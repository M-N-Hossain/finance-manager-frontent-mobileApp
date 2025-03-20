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

// Entry types
export interface Entry {
  id: string;
  amount: number;
  title: string;
  date: string;
  category: Category;
}

export interface EntryCreate {
  amount: number;
  title: string;
  // date: string;
  category: string;
}

export interface EntryState {
  entries: Entry[];
  isLoading: boolean;
  error: string | null;
}