import { Message } from './message.model';
import { Scenario } from './scenario.model';

export class Negotiation {
    id: string;
    dialogs: Message[];
    scenario: Scenario;

    constructor(id, dialogs?, scenario?){
        this.id = id;
        this.dialogs = dialogs || [];
        this.scenario = scenario || new Scenario();
    }
}
