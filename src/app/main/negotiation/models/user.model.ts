export class User {
    id: string;
    name: string;
    avatar: string;

    constructor(id, name, avatar?) {
        this.id = id;
        this.name = name;
        this.avatar = avatar || null;
    }
}
