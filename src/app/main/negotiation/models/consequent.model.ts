import { DataBase, ActionsData } from './data';

export class Consequent {
    data: DataBase;
    action: ActionsData;

    constructor(data: DataBase, action: ActionsData) {
        this.data = data;
        this.action = action;
    }

    public toString(): string {
        return `${this.action.name} ${this.data.name}`;
    }
}
