import { Norm } from './norm/norm.model';
import { User } from './user.model';

export class Bid {
    consistOf: Norm[];
    offeredBy: User;
    offeredTo: User;

    constructor(norms: Norm[], offeredBy: User, offeredTo: User){
        this.consistOf = norms;
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
    }
}
