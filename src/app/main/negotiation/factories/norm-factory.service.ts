import { Injectable } from '@angular/core';
import { Norm } from '../models/norm/norm.model';
import { NormTypes } from '../models/norm/norm-types.enum';
import { Authorization } from '../models/norm/authorization.model';
import { Prohibition } from '../models/norm/prohibition.model';
import { Commitment } from '../models/norm/commitment.model';
import { FirebaseData } from '../models/data';
import { Consequent } from '../models/consequent.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/observable';
import { BidUtils } from '../utils/bid-utils';

import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable()
export class NormFactoryService {
    private _norms: Norm[];
    private _norms$: AngularFirestoreCollection<Norm>;
    private _normSubscription$: Subscription;

    constructor(private afs: AngularFirestore) {
        this._norms$ = this.afs.collection<Norm>('norms');

        this._trackNormsChanges();
    }

    private _trackNormsChanges(): void {
        this._normSubscription$ = this._norms$.valueChanges().subscribe(norms => {
            this._norms = norms.map(norm => this.getNorm(norm.normType, norm.hasSubject, norm.hasObject, norm.hasAntecedent, norm.hasConsequent, norm.id));
        });
    }

    public destroySubscription(): void {
        this._normSubscription$.unsubscribe();
    }

    /**
     * @param  {string} normType
     * @param  {FirebaseData} subject
     * @param  {string} object
     * @param  {FirebaseData[]} antecedent
     * @param  {Consequent[]} consequent
     * @returns {Norm}
     */
    public getNorm(normType: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[], id?: string): Norm {
        switch (normType) {
            case NormTypes.AUTH: return new Authorization(id, subject, object, antecedent, consequent);
            case NormTypes.PRO: return new Prohibition(id, subject, object, antecedent, consequent);
            case NormTypes.COM: return new Commitment(id, subject, object, antecedent, consequent);
            default: return null;
        }
    }

    /**
     * @param  {string} normType
     * @param  {FirebaseData} subject
     * @param  {string} object
     * @param  {FirebaseData[]} antecedent
     * @param  {Consequent[]} consequent
     * @returns Norm
     */
    public getOrCreateNorm(normType: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[]): Norm {
        const tempNorm = this.getNorm(normType, subject, object, antecedent, consequent);

        const foundedNorm = this._norms.find(norm => BidUtils.isSameNorm(norm, tempNorm));

        if (!isNullOrUndefined(foundedNorm)) {
            return foundedNorm;
        } else {
            tempNorm.id = this.afs.createId();
            const convertedData = JSON.parse(JSON.stringify(tempNorm));
            this._norms$.doc(tempNorm.id).set(convertedData);

            return tempNorm;
        }
    }

}
