import { Bidding } from './bidding';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Bid } from '../bid.model';
import { Norm } from '../norm/norm.model';

export class DepthFirstConcession extends Bidding {
    public getOffer(opponentOffer: Bid, remainingTime?: number): Norm {
        throw new Error('Method not implemented.');
    }

    constructor(normFactoryService: NormFactoryService) {
        super(normFactoryService);
    }
}
