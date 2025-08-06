declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;

    GOOGLE_MAPS_API_KEY: string;

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    STRIPE_SECRET_KEY: string;
  }
}
