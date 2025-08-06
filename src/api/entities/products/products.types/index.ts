import { SupplierEnum } from '@/shared/lib/types';
import { SubdomainName } from '@/widgets/init';

import type * as ProductJson from './product-json';

export interface Product {
  id: number;
  subdomain: SubdomainName;
  supplier: SupplierEnum;
  scrapeUid: string;
  aliProductId: number | null;

  title: string;
  category: string;
  description: string;
  descriptionHtml: string;
  gallery: ProductJson.GalleryItem[];
  specifications: ProductJson.Specification[];

  variants: ProductJson.Variant[];
  variantsSize: ProductJson.VariantSize[] | null;

  feedbackInfo: ProductJson.FeedbackInfo;
  deliveryInfo: ProductJson.DeliveryInfo;

  createdAt: Date;
  updatedAt: Date;
}

export type * as ProductJson from './product-json';
