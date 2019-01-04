import { Norm } from './norm/norm.model';
import { User } from './user.model';

export class Bid {
    consistOf: Norm[];
    offeredBy: User;
    offeredTo: User;
    demotes: string[];
    promotes: string[];

    constructor(offeredBy: User, offeredTo: User, norms?: Norm[], demotes?: string[], promotes?: string[]) {
        this.consistOf = norms || [];
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
        this.demotes = demotes || [];
        this.promotes = promotes || [];
    }
}
