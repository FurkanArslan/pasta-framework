import { Roles } from './roles.enum';

export class User {
    id: string;
    name: string;
    avatar: string;
    role: Roles;

    constructor(id, name, avatar?, role?) {
        this.id = id;
        this.name = name;
        this.avatar = avatar || null;
        this.role = role || null;
    }
}
