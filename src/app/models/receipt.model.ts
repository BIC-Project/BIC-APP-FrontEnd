import { Customer } from "./customer.model";
import { Location } from "./location.model";
import { ReceiptType } from "./receiptType.enum";

export interface Receipt {
    receiptId?: number;
    receiptType?: ReceiptType;
    dateTime?: Date;
    receiptNo?: string;
    customer?: Customer;
    location?: Location;
    vehicleNo?: string;
    deliveryPersonName?: string;
    deliveryPersonContact?: string;
    allCylinders?: string;
    receiptStatus?: boolean;
}