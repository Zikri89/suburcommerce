// uom-group-detail.interface.ts

import { UoM } from "./uom";

export interface UoMGroupDetail {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  sequenceNo: string;
  alternateQuantity: number;
  alternateUoM?: UoM;
  baseUoM?: UoM;
  baseQuantity: number;
  isSelected: boolean;
}
