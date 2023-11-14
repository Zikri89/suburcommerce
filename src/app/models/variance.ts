import { VarianceDetail, VarianceDetailSelected } from './variance-detail';

export interface Variance {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  name: string;
  isMustFilled: boolean;
  isMultipleAnswer: boolean;
  products: any[];
  details?: VarianceDetail[];
  isSelected: boolean;
}

export interface VarianceSelected {
  name: string;
  details?: VarianceDetailSelected[];
}
