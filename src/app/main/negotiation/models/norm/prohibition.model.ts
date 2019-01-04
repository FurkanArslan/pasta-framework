import { Norm } from './norm.model';
import { NormTypes } from './norm-types.enum';

export class Prohibition extends Norm {
    constructor(subject: string, object: string, antecedent: string, consequent: string) {
        super(subject, object, antecedent, consequent);

        this.normType = NormTypes.PRO;
    }
}
