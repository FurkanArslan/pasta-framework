import { FirebaseData, ActionsData } from './data';

export class Consequent {
    data: FirebaseData;
    action: ActionsData;

    constructor(data: FirebaseData, action: ActionsData) {
        this.data = data;
        this.action = action;
    }

    public toString(): string {
        return `${this.action.name} ${this.data.name}`;
    }
}
