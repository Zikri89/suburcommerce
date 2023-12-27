// price.interface.ts

import { Product } from './product.interface';
import { PriceDetail } from './price-detail.interface';

export interface Price {
  id: number;
  name: string;
  productModel?: Product;
  details?: PriceDetail[];
  isActive: boolean;
}
