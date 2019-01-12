import { BidGeneration } from './bid-generation';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';

export class NormExtension extends BidGeneration {
    getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const optionsByNormExtension = [];
        const optionsByNormRemoving = [];

        availableBids.forEach(bid_ => {
            if (bid_.consistOf.length - bid.consistOf.length === 1) {
                if (this._includes(bid.consistOf, bid_.consistOf)) {
                    optionsByNormExtension.push(bid_);
                }
            }

            if (bid.consistOf.length - bid_.consistOf.length === 1) {
                if (this._includes(bid_.consistOf, bid.consistOf)) {
                    optionsByNormRemoving.push(bid_);
                }
            }
        });

        return optionsByNormExtension.concat(optionsByNormRemoving);
    }

    private _includes(norms1: Norm[], norms2: Norm[]): boolean {
        return norms1.every(norm_ => this._isInArray1(norm_, norms2));
    }

    private _isInArray1(norm: Norm, norms2: Norm[]): boolean {
        return norms2.some(norm_ => this._isSameNorm(norm_, norm));
    }

    private _isSameNorm(norm1: Norm, norm2: Norm): boolean {
        return norm1.normType === norm2.normType &&
            norm1.hasSubject === norm2.hasSubject &&
            norm1.hasObject === norm2.hasObject &&
            norm1.hasAntecedent === norm2.hasAntecedent &&
            norm1.hasConsequent === norm2.hasConsequent;
    }
}
