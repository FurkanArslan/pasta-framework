import { Message } from './message.model';
import { Scenario } from './scenario.model';
import { User } from './user.model';

export class Negotiation {
    id: string;
    dialogs: Message[];
    scenario: Scenario;
    user: User;
    agent: User;

    constructor(id, user, dialogs?) {
        this.id = id;
        this.user = user;
        this.dialogs = dialogs || [];
    }
}
