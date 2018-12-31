import { Roles } from './roles.enum';

export enum ScenarioTypes {
    PH = '1',
    PL = '2',
    PC = '3'
}

export class Scenario {
    scenarioType: ScenarioTypes;
    role1: Roles;
    role2: Roles;

    constructor(scenarioType, role1, role2) {
        this.scenarioType = scenarioType || null;
        this.role1 = role1;
        this.role2 = role2;
    }
}
