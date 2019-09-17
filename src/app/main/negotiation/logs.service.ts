import { Injectable } from '@angular/core';
import { Log, BidLog, Logs } from './models/log.model';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import { Bid } from './models/bid.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class LogService {
    private _log: Log;

    private _logs$: AngularFirestoreDocument<Logs>;
    private _logs: Logs;

    constructor(private afs: AngularFirestore, ) {
        this._logs$ = afs.doc<Logs>('logs-v2/2');
        this._logs$.valueChanges().subscribe(data => {
            this._logs = data;

            if (isNullOrUndefined(this._log)) {
                this.createLog();
            }
        });
    }

    setUserInfo(userName, userLastName, opponentType): void {
        this._log.username = userName;
        this._log.userLastName = userLastName;
        this._log.opponentType = opponentType;

        this.saveLog();
    }

    saveLog(): void {
        const index = this._logs.logs.findIndex(x => x.id === this._log.id);

        this._logs.logs.splice(index, 1, this._log);

        const convertedData = JSON.parse(JSON.stringify(this._logs));

        this._logs$.update(convertedData);
    }

    createLog(): void {
        this._log = new Log();

        this._logs.logs.push(this._log);

        const convertedData = JSON.parse(JSON.stringify(this._logs));

        this._logs$.update(convertedData);
    }

    saveStartDate(date: Date): void {
        this._log.cdate = date;

        this.saveLog();
    }

    saveEndDate(date: Date): void {
        this._log.endDate = date;

        this.saveLog();
    }

    addNewBid(bid: Bid): void {
        this._log.bids.push(new BidLog(bid.offeredBy.name, bid.offeredTo.name, bid.consistOf[0].toNormRepresentation(false), bid.consistOf[0].utility));
        this._log.numberOfTurns += 1;

        this.saveLog();
    }

    saveAgreement(bid: Bid, utility: number): void {
        this._log.agreement = new BidLog(bid.offeredBy.name, bid.offeredTo.name, bid.consistOf[0].toNormRepresentation(false), utility);
        this._log.agreementUtility = utility;

        this.saveLog();
    }

    saveUserUtility(utility: number): void {
        this._log.utilityOfUser = utility;

        this.saveLog();
    }
}
