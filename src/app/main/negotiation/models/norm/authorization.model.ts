import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { FirebaseData } from '../data';
import { Consequent } from '../consequent.model';

export class Authorization extends Norm {
    constructor(id: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[]) {
        super(id, subject, object, antecedent, consequent);

        this.normType = NormTypes.AUTH;
    }

    public toString(): string {
        return `${this.hasSubject.name} is authorized by ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }

    public toNormRepresentation(): string {
        return `A(${this.hasSubject.shortName}, HA, ${this.compoundAntecedentWithShortName}, ${this.compoundConsequentWithShortName}):${this.utility}`;
    }
}
