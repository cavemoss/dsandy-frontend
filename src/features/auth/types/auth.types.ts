export interface AuthState {
  credentials: {
    email: string;
    password: string;
  };
  // action
  handleLogin: () => Promise<void>;
  setCredentials: (partial: Partial<this['credentials']>) => void;
}
