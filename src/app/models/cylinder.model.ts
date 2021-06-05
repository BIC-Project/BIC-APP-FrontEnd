import { CylinderUnit } from "./cylinderUnit.enum";
import { Gas } from "./gas.model";

export interface Cylinder {
    cylinderId: number;
    gas: Gas;
    cylinderCapacity: number;
    cylinderUnit: CylinderUnit;
}