// price.interface.ts

import { Product } from './product';
import { PriceDetail } from './price-detail';

export interface Price {
  id: number;
  name: string;
  productModel?: Product;
  details?: PriceDetail[];
  isActive: boolean;
}
