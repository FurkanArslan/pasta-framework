import { Bid } from '../../bid.model';

export interface BidGeneration {
    getBidOptions(availableBids: Bid[], bid: Bid): Bid[];
}
