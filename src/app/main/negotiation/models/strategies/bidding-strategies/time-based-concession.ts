import { Bidding } from './bidding';
import { Bid } from '../../bid.model';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { DirectedGraph } from '../../graph.model';
import { Norm } from '../../norm/norm.model';

export class TimeBasedConcession extends Bidding {
    constructor(normFactoryService: NormFactoryService) {
        super(normFactoryService);
    }

    public getOffer(opponentOffer: Bid, remainingTime: number): Norm {
        if (!this.isGraphGenerated) {
            this.graph = new DirectedGraph();

            this._generateGraph(opponentOffer);
            this._isGraphGenerated = true;
        }

        let currentLevel = (this.graph.maxDepth * remainingTime) / 300;
        currentLevel = Math.ceil(currentLevel);

        const nodes = this.graph.getNodesByLevel(currentLevel);
        nodes.sort((a, b) => b.utility - a.utility);
        
        const randomIndex = Math.floor(Math.random() * nodes.length);

        return nodes[randomIndex];
    }
}
