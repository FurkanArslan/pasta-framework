import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { RolesData, ConditionsData } from '../data';

export class Commitment extends Norm {
    constructor(subject: RolesData, object: string, antecedent: ConditionsData[], consequent: string[]) {
        super(subject, object, antecedent, consequent);

        this.normType = NormTypes.COM;
    }

    public toString(): string {
        return `${this.hasSubject.name} is committed to ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }
}
