import { Message } from './message.model';
import { Scenario } from './scenario/scenario.model';
import { User } from './user.model';
import { Bid } from './bid.model';

export class Negotiation {
    id: string;
    dialogs: Message[];
    bids: Bid[];
    scenario: Scenario;
    user: User;
    agent: User;

    constructor(id, user, agent?, dialogs?, bids?) {
        this.id = id;
        this.user = user;
        this.agent = agent || null;
        this.dialogs = dialogs || [];
        this.bids = bids || [];
    }
}
