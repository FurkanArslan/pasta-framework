import { Bid } from '../../bid.model';
import { FuseUtils } from '@fuse/utils';
import { BidGeneration } from './bid-generation';

export class ActorRevision implements BidGeneration {
    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const optionsByObjectRevision = [];
        const optionsBySubjectRevision = [];

        for (const bid_ of availableBids) {
            for (const norm of bid_.consistOf) {
                for (const norm1 of bid.consistOf) {
                    if (norm.hasConsequent === norm1.hasConsequent &&
                        norm.hasAntecedent === norm1.hasAntecedent &&
                        norm.normType === norm1.normType) {

                        if (norm.hasSubject === norm1.hasSubject && norm.hasObject !== norm1.hasObject) {
                            optionsByObjectRevision.push(bid_);
                        }

                        if (norm.hasAntecedent === norm1.hasAntecedent && norm.hasConsequent !== norm1.hasConsequent) {
                            optionsBySubjectRevision.push(bid_);
                        }

                        break;
                    }
                }
            }
        }

        const op1 = this._getOptionsBySubjectRevision(optionsBySubjectRevision, bid);
        const op2 = this._getOptionsByObjectRevision(optionsByObjectRevision, bid);

        return op1.concat(op2);
    }

    private _getOptionsByObjectRevision(bids: any[], other_bid: Bid): any {
        const options: Bid[] = [];

        for (const bid_ of bids) {
            const filteredNorms = bid_.consistOf.filter(norm => !FuseUtils.searchInObj(other_bid, norm.hasObject));

            if (filteredNorms.length === 1) {
                options.push(bid_);
            }
        }

        return options;
    }

    private _getOptionsBySubjectRevision(bids: Bid[], other_bid: Bid): Bid[] {
        const options: Bid[] = [];

        for (const bid_ of bids) {
            const filteredNorms = bid_.consistOf.filter(norm => !FuseUtils.searchInObj(other_bid, norm.hasSubject));

            if (filteredNorms.length === 1) {
                options.push(bid_);
            }
        }

        return options;
    }
}
