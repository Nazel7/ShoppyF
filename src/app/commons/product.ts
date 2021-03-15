import {LocalNgModuleData} from "@angular/compiler-cli/src/ngtsc/scope";

export class Product {
    id: number;
    sku : String;
    name : String;
    description : String;
    unitPrice : number;
    imageUrl : String;
    active : boolean;
    unitInStock : number;
    dateCreated : Date;
    lastUpdated : Date
}
