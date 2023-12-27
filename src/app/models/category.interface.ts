export interface Category {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  name: string;
  description: string;
  productCount: number;
  lineNo: number;
}
