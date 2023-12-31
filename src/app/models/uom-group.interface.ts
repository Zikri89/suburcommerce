// uom-group.interface.ts

import { UoMGroupDetail } from "./uom-group-detail.interface";

export interface UoMGroup {
  id: number;
  alias?: string | null;
  remarks: string;
  isInActive: boolean;
  code: string;
  details: UoMGroupDetail[];
}
