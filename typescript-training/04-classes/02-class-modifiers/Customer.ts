class Customer {

    //--------------------------------------------------------
    // private _firstName: string;
    // private _lastName: string;
    
    // constructor(firstName: string, lastName: string) {
    //     this._firstName = firstName;
    //     this._lastName = lastName;
    // }

    // above and below codes are the same 

    constructor(private _firstName: string,
        private _lastName: string) {

    }

    //---------------------------------------------------------

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
}

// let's create an instance
let myCustomer = new Customer("Martin", "Dixon");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);