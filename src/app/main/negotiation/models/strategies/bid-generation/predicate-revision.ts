import { Bid } from '../../bid.model';
import { BidGeneration } from './bid-generation';
import { Norm } from '../../norm/norm.model';

export class PredicateRevision extends BidGeneration {

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const optionsByAntecedentRevision = availableBids.filter(bid_ => {
            return bid_.consistOf.length === bid.consistOf.length && bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptAntecedent, this));
        });

        const optionsByConsequentRevision = availableBids.filter(bid_ => {
            return bid_.consistOf.length === bid.consistOf.length && bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptConsequent, this));
        });

        return optionsByAntecedentRevision.concat(optionsByConsequentRevision);
    }

    protected _isInNorm(item: Norm, items2: Norm[], compareFunc, scope): boolean {
        return items2.some(item_ => compareFunc(item_, item, scope));
    }

    private _isSameNormExceptAntecedent(norm: Norm, norm1: Norm, scope): boolean {
        return scope._isSameConsequent(norm.hasConsequent, norm1.hasConsequent) &&
            !(scope._isSameArray(norm.hasAntecedent, norm1.hasAntecedent)) &&
            norm.hasAntecedent.length === norm1.hasAntecedent.length &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }

    private _isSameNormExceptConsequent(norm: Norm, norm1: Norm, scope): boolean {
        return !(scope._isSameConsequent(norm.hasConsequent, norm1.hasConsequent)) &&
            norm.hasConsequent.length === norm1.hasConsequent.length &&
            scope._isSameArray(norm.hasAntecedent, norm1.hasAntecedent) &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }
}
