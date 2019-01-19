import { Roles } from './roles.enum';
import { Value } from './value.model';

export class User {
    id: string;
    name: string;
    avatar: string;
    role: Roles;
    preferences: Value[];

    constructor(id, name, avatar?, role?, preferences?) {
        this.id = id;
        this.name = name;
        this.avatar = avatar || null;
        this.role = role || null;
        this.preferences = preferences || null;
    }
}
