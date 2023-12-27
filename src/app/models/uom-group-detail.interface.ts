// uom-group-detail.interface.ts

import { UoM } from "./uom.interface";

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
