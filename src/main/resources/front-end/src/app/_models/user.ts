import { Role } from "./role";

export class User {
    hasRole(role: string[]) {
      throw new Error('Method not implemented.');
    }
    id!: number;
    username!: string;
    password!:string;
    authorities!: Role[];
    token?: string | null; //question mark means an optional in typescript

    constructor(id:number,username:string,password:string,authorities:Role[],token:string){
        this.id=id;
        this.username=username;
        this.password=password;
        this.authorities=authorities;
        this.token=token;
    }
}
