import { NormTypes } from './norm-types.enum';

export abstract class Norm {
    hasSubject: string;
    hasObject: string;
    hasAntecedent: string;
    hasConsequent: string;
    normType: NormTypes;

    constructor(subject: string, object: string, antecedent: string, consequent: string) {
        this.hasSubject = subject;
        this.hasObject = object;
        this.hasAntecedent = antecedent;
        this.hasConsequent = consequent;
    }
}
