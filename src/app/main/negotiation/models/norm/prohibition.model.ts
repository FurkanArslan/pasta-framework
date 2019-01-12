import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { RolesData, ConditionsData } from '../data';

export class Prohibition extends Norm {
    constructor(subject: RolesData, object: string, antecedent: ConditionsData[], consequent: string[]) {
        super(subject, object, antecedent, consequent);

        this.normType = NormTypes.PRO;
    }

    public toString(): string {
        return `${this.hasSubject.name} is prohibited by ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }
}
