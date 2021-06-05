import { GassFamily } from "./gasFamily.model";

export interface Gas {
    gasId: number;
    gasName: string;
    gasFamily: GassFamily;
}