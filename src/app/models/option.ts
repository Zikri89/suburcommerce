// option.interface.ts

import { OptionCategory } from './option-category';

export interface Option {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  name: string;
  productName: string;
  optionCategory?: OptionCategory;
  basePrice: number;
  parentOption: string;
  isProduct: boolean;
  fileName: string;
  data: string;
  imageUrl: string;
  isSelected: boolean;
}
