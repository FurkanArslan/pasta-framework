import { NormTypes } from './norm-types.enum';
import { RolesData, ConditionsData } from '../data';

export abstract class Norm {
    hasSubject: RolesData;
    hasObject: string;
    hasAntecedent: ConditionsData[];
    hasConsequent: string[];
    normType: NormTypes;

    constructor(subject: RolesData, object: string, antecedent: ConditionsData[], consequent: string[]) {
        this.hasSubject = subject;
        this.hasObject = object;
        this.hasAntecedent = antecedent || [];
        this.hasConsequent = consequent || [];
    }

    public abstract toString(): string;

    get compoundConsequent(): string {
        return this.hasConsequent.reduce((consequent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.toLowerCase() : ` ${consequent_} and ${currentValue.toLowerCase()}`;
        });
    }

    get compoundAntecedent(): string {
        return this.hasAntecedent.reduce((antecedent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.name : ` ${antecedent_} and ${currentValue.name}`;
        }, '');
    }
}
