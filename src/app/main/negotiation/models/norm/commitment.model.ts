import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { RolesData, ConditionsData } from '../data';
import { Consequent } from '../consequent.model';

export class Commitment extends Norm {
    constructor(id: string, subject: RolesData, object: string, antecedent: ConditionsData[], consequent: Consequent[]) {
        super(id, subject, object, antecedent, consequent);

        this.normType = NormTypes.COM;
    }

    public toString(): string {
        return `${this.hasSubject.name} is committed to ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }
}
