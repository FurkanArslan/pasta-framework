import { Injectable } from '@angular/core';
import { Log, BidLog } from '../models/log.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { firestore } from 'firebase/app';
import { Bid } from '../models/bid.model';

@Injectable()
export class PastaService {
    private _log: Log;
    private _logs$: AngularFirestoreCollection<Log>;

    constructor(private afs: AngularFirestore, ) {
        this._logs$ = this.afs.collection<Log>('logs');
        this.createLog();
    }

    setUserInfo(userName, userLastName): void {
        this._log.username = userName;
        this._log.userLastName = userLastName;

        this.saveLog();
    }

    saveLog(): void {
        const convertedData = JSON.parse(JSON.stringify(this._log));
        this._logs$.doc(this._log.id).set(convertedData);
    }

    createLog(): void {
        this._log = new Log();
        this._log.id = this.afs.createId();
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

        this.saveLog();
    }

    saveAgreement(bid: Bid, utility: number): void {
        this._log.agreement = new BidLog(bid.offeredBy.name, bid.offeredTo.name, bid.consistOf[0].toNormRepresentation(false), utility);
        this._log.agreementUtility = utility;

        this.saveLog();
    }

    saveUserUtility(utility: number): void{
        this._log.utilityOfUser = utility;

        this.saveLog();
    }
}
