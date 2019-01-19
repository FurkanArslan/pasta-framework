import { BidGeneration } from './bid-generation';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';

export class NormRevision extends BidGeneration {

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        return availableBids
            .filter(bid_ => bid_.consistOf.length === bid.consistOf.length) // filter by norms count
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by norm difference & norm type
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                return (diff1.length === 1 && diff2.length === 1 && diff1[0].normType !== diff2[0].normType);
            });
    }
}
