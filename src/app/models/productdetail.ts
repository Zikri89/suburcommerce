export interface ProductDetail {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  fileName: string;
  fileType: string;
  isDefault: boolean;
  targetUrl: string;
  imageUrl: string;
  data: string;
}
