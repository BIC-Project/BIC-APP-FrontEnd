import { GassFamily } from "./gasFamily.model";

export interface Gas {
    gasId?: string;
    gasName?: string;
    gasFamily?: GassFamily;
}