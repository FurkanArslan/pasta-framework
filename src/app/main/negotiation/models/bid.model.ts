import { Norm } from './norm/norm.model';
import { User } from './user.model';
import { Value } from './value.model';

// import firebase = require('firebase');
import { firestore } from 'firebase/app';
import { isNullOrUndefined } from 'util';
import { NormFactoryService } from '../factories/norm-factory.service';

export class Bid {
    id: string;
    cdate: any;
    consistOf: Norm[];
    offeredBy: User;
    offeredTo: User;

    constructor(id: string, offeredBy: User, offeredTo: User, norms?: Norm[], cdate?: any) {
        this.id = id;
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
        this.cdate = cdate || firestore.FieldValue.serverTimestamp();
        this.consistOf = norms;

        // if (!isNullOrUndefined(norms)) {
        //     this.consistOf = norms.map(norm => new NormFactoryService().getNorm(norm.normType, norm.hasSubject, norm.hasObject, norm.hasAntecedent, norm.hasConsequent));
        // } else {
        //     this.consistOf = [];
        // }
    }
}
