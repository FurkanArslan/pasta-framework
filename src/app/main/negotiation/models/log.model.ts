import * as moment from 'moment';
import { FuseUtils } from '@fuse/utils';

export class Logs {
    logs: Log[];
}

export class Log {
    id: string;
    username: string;
    userLastName: string;
    bids: BidLog[];
    cdate: any;
    endDate: any;
    agreementUtility: number;
    agreement: BidLog;
    utilityOfUser: number;
    opponentType: 'Basic-Strategy' | 'Similarity-Based';
    numberOfTurns: number;

    constructor() {
        this.bids = [];
        this.id = FuseUtils.generateGUID();
        this.numberOfTurns = 0;
    }
}

export class BidLog {
    cdate: any;
    consistOf: string;
    offeredBy: string;
    offeredTo: string;
    utility: number;

    constructor(offeredBy: string, offeredTo: string, norms: string, utility: number) {
        this.offeredBy = offeredBy;
        this.offeredTo = offeredTo;
        this.cdate = moment().toDate();
        this.consistOf = norms;
        this.utility = utility || 0;
    }
}
