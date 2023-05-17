import { Role } from "./role";

export class User {
    id!: number;
    username!: string;
    password!:string;
    authorities!: Role[];
    token?: string; //question mark means an optional in typescript
}
