import { Bid } from '../../bid.model';
import { BidGeneration } from './bid-generation';
import { Norm } from '../../norm/norm.model';

export class ActorRevision extends BidGeneration {
    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {

        return availableBids
            .filter(bid_ => bid_.consistOf.length === bid.consistOf.length) // filter by norms count
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then antecedent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    return !this._isSameItem(diff1[0].hasSubject, diff2[0].hasSubject);
                }

                return false;
            });

        // return availableBids.filter(bid_ => bid_.consistOf.length === bid.consistOf.length && bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf)));
    }

    private _isInNorm(item: Norm, items2: Norm[]): boolean {
        return items2.some(item_ => this._isSameNormExceptSubject(item_, item));
    }

    private _isSameNormExceptSubject(norm: Norm, norm1: Norm): boolean {
        return this._isSameConsequent(norm.hasConsequent, norm1.hasConsequent) &&
            this._isSameArray(norm.hasAntecedent, norm1.hasAntecedent) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType &&
            !this._isSameItem(norm.hasSubject, norm1.hasSubject);
    }
}
