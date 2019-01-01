import { Scenario } from './scenario.model';
import { Roles } from '../roles.enum';

export class PhScenario extends Scenario {
    constructor() {
        super(Roles.POLICE, Roles.HOSPITAL);
    }

    getOptions(selectedRole: Roles): { subject: any[], object: any[], actions: any[], conditions: any[] } {
        return {
            subject: [`One ${selectedRole}`, `All ${selectedRole}`],
            object: selectedRole === this.role1 ? [this.role2] : [this.role1],
            actions: ['Access Data', 'Share Data'],
            conditions: []
        };
    }
}
