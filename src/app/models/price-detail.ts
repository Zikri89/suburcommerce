// price-detail.interface.ts

import { UoMGroup } from './uom-group'; // Import the UoMGroup interface
import { UoM } from './uom'; // Import the UoM interface

export interface PriceDetail {
  id: number;
  lineNo: number;
  uoMGroup?: UoMGroup; // Import the UoMGroup interface
  uoM?: UoM; // Import the UoM interface
  baseQuantity: number;
  basePrice: number;
  basePercentage: number;
}
