import { Bid } from '../../bid.model';
import { FuseUtils } from '@fuse/utils';

export class PredicateRevision {

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const optionsByAntecedentRevision = [];
        const optionsByConsequentRevision = [];

        for (const bid_ of availableBids) {
            for (const norm of bid_.consistOf) {
                for (const norm1 of bid.consistOf) {
                    if (norm.hasSubject === norm1.hasSubject &&
                        norm.hasObject === norm1.hasObject &&
                        norm.normType === norm1.normType) {

                        if (norm.hasConsequent === norm1.hasConsequent && norm.hasAntecedent !== norm1.hasAntecedent) {
                            optionsByAntecedentRevision.push(bid_);
                        }

                        if (norm.hasAntecedent === norm1.hasAntecedent && norm.hasConsequent !== norm1.hasConsequent) {
                            optionsByConsequentRevision.push(bid_);
                        }

                        break;
                    }
                }
            }
        }

        const op1 = this._getOptionsByConsequentRevision(optionsByConsequentRevision, bid);
        const op2 = this._getOptionsByAntecedentRevision(optionsByAntecedentRevision, bid);

        return op1.concat(op2);
    }

    private _getOptionsByAntecedentRevision(bids: any[], other_bid: Bid): any {
        const options: Bid[] = [];

        for (const bid_ of bids) {
            const filteredNorms = bid_.consistOf.filter(norm => !FuseUtils.searchInObj(other_bid, norm.hasAntecedent));

            if (filteredNorms.length === 1) {
                options.push(bid_);
            }
        }

        return options;
    }

    private _getOptionsByConsequentRevision(bids: Bid[], other_bid: Bid): Bid[] {
        const options: Bid[] = [];

        for (const bid_ of bids) {
            const filteredNorms = bid_.consistOf.filter(norm => !FuseUtils.searchInObj(other_bid, norm.hasConsequent));

            if (filteredNorms.length === 1) {
                options.push(bid_);
            }
        }

        return options;
    }
}
