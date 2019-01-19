import { Norm } from './norm/norm.model';
import { User } from './user.model';
import { Value } from './value.model';

// import firebase = require('firebase');
import {database} from 'firebase';
export class Bid {
    id: string;
    cdate: any;
    consistOf: Norm[];
    offeredBy: User;
    offeredTo: User;
    demotes: Value[];
    promotes: Value[];

    constructor(id: string, offeredBy: User, offeredTo: User, norms?: Norm[], demotes?: Value[], promotes?: Value[], cdate?: any) {
        this.id = id;
        this.consistOf = norms || [];
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
        this.demotes = demotes || [];
        this.promotes = promotes || [];
        this.cdate = cdate || database.ServerValue.TIMESTAMP;
    }
}
