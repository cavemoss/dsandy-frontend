export interface GalleryItem {
  src: string;
  previewSrc: string;
}

export interface Variant {
  title: string;
  priceUSD: number;
  imgSrcPreview: string;
  imgSrc: string;
  inStock: boolean;
}

export interface VariantSize {
  label: string;
  inStock: boolean;
}

export interface Specification {
  title: string;
  value: string;
}

export interface FeedbackInfo {
  rating: number;
  displayReviews: string;
  displaySold: string;
}

export interface CourierCompany {
  iconSrc: string;
}

export interface DeliveryInfo {
  durationDays: [number, number];
  courierCompanies: CourierCompany[];
}
