import { Roles } from '../roles.enum';

export abstract class Scenario {
    role1: Roles;
    role2: Roles;
    actions: any[];

    constructor(role1, role2, actions?) {
        this.role1 = role1;
        this.role2 = role2;
        this.actions = actions || [];
    }

    abstract getOptions(selectedRole: Roles): {subject: any[], object: any[], actions: any[], conditions: any[]};
}
