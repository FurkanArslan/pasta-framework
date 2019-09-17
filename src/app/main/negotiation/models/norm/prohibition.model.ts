import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';
import { FirebaseData, ConsequentData, RolesData } from '../data';
import { Consequent } from '../consequent.model';

export class Prohibition extends Norm {
    constructor(id: string, subject: RolesData, object: string, antecedent: FirebaseData[], consequent: ConsequentData[]) {
        super(id, subject, object, antecedent, consequent);

        this.normType = NormTypes.PRO;
    }

    public toString(): string {
        // let subject = '';

        // if (this.hasSubject.shortName === 'All') {
        //     subject = 'anyone';
        // } else if (this.hasSubject.shortName === 'GO') {
        //     subject = 'any government officer';
        // } else if (this.hasSubject.shortName === 'GA') {
        //     subject = 'whole government agency';
        // }

        // if (this.hasAntecedent[0].shortName === 'true') {
        //     return `I cannot allow ${subject} to ${this.compoundConsequent}`;
        // }

        // return `I cannot allow ${subject} to ${this.compoundConsequent} unless ${this.compoundAntecedent}.`;

        if (this.hasAntecedent[0].shortName === 'true') {
            return `${this.hasSubject.name} should not ${this.compoundConsequent} when ${this.compoundAntecedent}.`;
        }

        return `${this.hasSubject.name} should not ${this.compoundConsequent} when not ${this.compoundAntecedent}.`;
    }

    public toNormRepresentation(isIncludeUtility: boolean): string {
        let representation = `P(${this.hasSubject.shortName}, HA, not ${this.compoundAntecedentWithShortName}, ${this.compoundConsequentWithShortName})`;

        if (this.hasAntecedent[0].shortName === 'true') {
            representation = `P(${this.hasSubject.shortName}, HA, ${this.compoundAntecedentWithShortName}, ${this.compoundConsequentWithShortName})`;
        }

        return isIncludeUtility ? `${representation}:${this.utility}` : representation;
    }

}
