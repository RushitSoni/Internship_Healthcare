export class RegisterWithExternal {
    firstName: string;
    lastName: string;
    userId: string;
    accessToken: string;
    provider: string;
    email:string
    

    constructor(firstName: string, lastName: string, userId: string, accessToken: string, provider: string,email:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.accessToken = accessToken;
        this.provider = provider;
        this.email=email
    }
}