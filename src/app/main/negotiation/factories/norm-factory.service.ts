import { Injectable } from '@angular/core';
import { Norm } from '../models/norm/norm.model';
import { NormTypes } from '../models/norm/norm-types.enum';
import { Authorization } from '../models/norm/authorization.model';
import { Prohibition } from '../models/norm/prohibition.model';
import { Commitment } from '../models/norm/commitment.model';

@Injectable()
export class NormFactoryService {

    /**
     * 
     * @param normType 
     * @param subject 
     * @returns {Norm}
     */
    public getNorm(normType: string, subject: string, object: string, antecedent: string, consequent: string): Norm {
        switch (normType) {
            case NormTypes.AUTH: return new Authorization(subject, object, antecedent, consequent);
            case NormTypes.PRO: return new Prohibition(subject, object, antecedent, consequent);
            case NormTypes.COM: return new Commitment(subject, object, antecedent, consequent);
            default: return null;
        }
    }

}
