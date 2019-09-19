import { Injectable } from '@angular/core';

import { ScenarioTypes } from '../models/scenario/scenario-types.enum';

import { PhScenario } from '../models/scenario/ph-scenario.model';
import { PLScenario } from '../models/scenario/pl-scenario.model';
import { PCScenario } from '../models/scenario/pc-scenario.model';
import { Scenario } from '../models/scenario/scenario.model';

@Injectable()
export class ScenarioFactoryService {

    /**
     * name
     */
    public getScenario(scenarioType: string): Scenario {
        switch (scenarioType) {
            case ScenarioTypes.PH: return new PhScenario();
            case ScenarioTypes.PL: return new PLScenario();
            case ScenarioTypes.PC: return new PCScenario();
            default:
                return null;
        }
    }

}
