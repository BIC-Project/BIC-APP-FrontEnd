import { Customer } from "./customer.model";
import { Cylinder } from "./cylinder.model";
import { Location } from "./location.model";

export interface CompositeLocationCustomerCylinder {
    location: Location;
    customer: Customer;
    cylinder: Cylinder;
}