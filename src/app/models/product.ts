import { Category } from "./category";
import { Price } from "./price";
import { ProductOption } from "./product-option";
import { ProductDetail } from "./productdetail";
import { UoMGroup } from "./uom-group";
import { Variance } from "./variance";

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
