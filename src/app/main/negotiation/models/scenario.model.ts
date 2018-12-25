export enum ScenarioTypes {
    PH = '1',
    PA = '2',
    PC = '3'
}

export class Scenario {
    scenarioType: ScenarioTypes;

    constructor(scenarioType?) {
        this.scenarioType = scenarioType || null;
    }
}
