import * as mongodb from "mongodb";

//Task 1.2 starts...

export interface Contacts{
    name: string;
    phone: number;
    email:string;
    _id:mongodb.ObjectId;
}

//task 1.2 continues...