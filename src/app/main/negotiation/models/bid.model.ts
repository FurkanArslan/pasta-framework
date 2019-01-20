import { Norm } from './norm/norm.model';
import { User } from './user.model';
import { Value } from './value.model';

// import firebase = require('firebase');
import { firestore } from 'firebase/app';

export class Bid {
    id: string;
    cdate: any;
    consistOf: Norm[];
    offeredBy: User;
    offeredTo: User;
    demotes: Value[];
    promotes: Value[];
    private _utilityValue: number;

    constructor(id: string, offeredBy: User, offeredTo: User, norms?: Norm[], demotes?: Value[], promotes?: Value[], cdate?: any) {
        this.id = id;
        this.consistOf = norms || [];
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
        this.demotes = demotes || [];
        this.promotes = promotes || [];
        this.cdate = cdate || firestore.FieldValue.serverTimestamp();
        this._utilityValue = 0;
    }

    set utility(newUtility: number) {
        if (newUtility && (newUtility > this._utilityValue)) {
            this._utilityValue = +newUtility.toFixed(1);
        }
    }

    get utility(): number {
        return this._utilityValue;
    }
}
