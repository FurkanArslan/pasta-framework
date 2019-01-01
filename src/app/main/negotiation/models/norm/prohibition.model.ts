import { Norm } from './norm.model';

export class Prohibition extends Norm {
    constructor(subject: string, object: string, antecedent: string, consequent: string) {
        super(subject, object, antecedent, consequent);
    }
}
