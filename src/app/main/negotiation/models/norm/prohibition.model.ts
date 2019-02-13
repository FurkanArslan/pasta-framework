import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { FirebaseData } from '../data';
import { Consequent } from '../consequent.model';

export class Prohibition extends Norm {
    constructor(id: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[]) {
        super(id, subject, object, antecedent, consequent);

        this.normType = NormTypes.PRO;
    }

    public toString(): string {
        return `${this.hasSubject.name} is prohibited by ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }

    public toNormRepresentation(): string {
        return `P(${this.hasSubject.shortName}, HA, not ${this.compoundAntecedentWithShortName}, ${this.compoundConsequentWithShortName}):${this.utility}`;
    }

}
