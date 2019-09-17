import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { FirebaseData, ConsequentData, RolesData } from '../data';
import { Consequent } from '../consequent.model';

export class Authorization extends Norm {
    constructor(id: string, subject: RolesData, object: string, antecedent: FirebaseData[], consequent: ConsequentData[]) {
        super(id, subject, object, antecedent, consequent);

        this.normType = NormTypes.AUTH;
    }

    public toString(): string {
        // return `${this.hasSubject.name} is authorized by ${this.hasObject} to ${this.compoundConsequent} when ${this.compoundAntecedent}.`;

        // const subject = this.hasSubject.shortName === 'GO' ? 'I want' : `${this.hasSubject.name} wants`;

        // if (this.hasAntecedent[0].shortName === 'true') {
        //     return `${subject} to ${this.compoundConsequent}`;
        // }

        // return `${subject} to ${this.compoundConsequent} if ${this.compoundAntecedent}.`;

        return `${this.hasSubject.name} may ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
    }

    public toNormRepresentation(isIncludeUtility: boolean): string {
        const representation = `A(${this.hasSubject.shortName}, HA, ${this.compoundAntecedentWithShortName}, ${this.compoundConsequentWithShortName})`;

        return isIncludeUtility ? `${representation}:${this.utility}` : representation;
    }
}
