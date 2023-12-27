import { Category } from "./category.interface";
import { Price } from "./price.interface";
import { ProductOption } from "./product-option.interface";
import { ProductDetail } from "./productdetail.interface";
import { UoMGroup } from "./uom-group.interface";
import { Variance } from "./variance.interface";

export interface Product {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  code: string;
  name: string;
  basePrice: number;
  sellPrice: number;
  nonMemberPrice: number;
  memberPrice: number;
  isSalesItem: boolean;
  length: number;
  width: number;
  height: number;
  volume: number;
  weight: number;
  category?: Category;
  uoMGroup?: UoMGroup;
  details?: ProductDetail[];
  prices?: Price[];
  productOptions?: ProductOption[];
  productVariances?: Variance[];
  isSelected: boolean;
}


export interface ProductList extends Array<Product> {}
