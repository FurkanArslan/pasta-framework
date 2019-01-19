import { Bid } from '../../bid.model';
import { BidGeneration } from './bid-generation';
import { Norm } from '../../norm/norm.model';
import { ConditionsData } from '../../data';

export class PredicateRevision extends BidGeneration {

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const filteredBids = availableBids.filter(bid_ => bid_.consistOf.length === bid.consistOf.length); // filter by norms count

        const optionsByAntecedentRevision = filteredBids
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptAntecedent, this)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then antecedent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    const diffAntecedent1 = this._differenceAntecedent(diff1[0].hasAntecedent, diff2[0].hasAntecedent);
                    const diffAntecedent2 = this._differenceAntecedent(diff2[0].hasAntecedent, diff1[0].hasAntecedent);

                    return diffAntecedent1.length < 2 && diffAntecedent2.length < 2;
                }

                return false;
            });

        const optionsByConsequentRevision = filteredBids
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptConsequent, this)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then consequent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    const diffConsequent1 = this._differenceConsequent(diff1[0].hasConsequent, diff2[0].hasConsequent);
                    const diffConsequent2 = this._differenceConsequent(diff2[0].hasConsequent, diff1[0].hasConsequent);

                    return diffConsequent1.length < 2 && diffConsequent2.length < 2;
                }

                return false;
            });

        return optionsByAntecedentRevision.concat(optionsByConsequentRevision);
    }

    private _isInNorm(item: Norm, items2: Norm[], compareFunc, scope): boolean {
        return items2.some(item_ => compareFunc(item_, item, scope));
    }

    private _isSameNormExceptAntecedent(norm: Norm, norm1: Norm, scope): boolean {
        return scope._isSameConsequent(norm.hasConsequent, norm1.hasConsequent) &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }

    private _isSameNormExceptConsequent(norm: Norm, norm1: Norm, scope): boolean {
        return scope._isSameArray(norm.hasAntecedent, norm1.hasAntecedent) &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }

    private _differenceAntecedent(antecedents1: ConditionsData[], antecedents2: ConditionsData[]): ConditionsData[] {
        return antecedents1.filter(antecedent1 => !this._isInArray(antecedent1, antecedents2));
    }

    private _differenceConsequent(consequents1: string[], consequents2: string[]): string[] {
        return consequents1.filter(consequent1 => !consequents2.includes(consequent1));
    }
}
