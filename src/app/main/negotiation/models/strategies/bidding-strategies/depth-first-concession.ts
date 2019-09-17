import { Bidding } from './bidding';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';
import { DirectedGraph } from '../../graph.model';

export class DepthFirstConcession extends Bidding {
    private _currentLevel = 0;

    constructor(normFactoryService: NormFactoryService) {
        super(normFactoryService);
    }

    public getOffer(opponentOffer: Bid, remainingTime: number): Norm {
        if (!this.isGraphGenerated) {
            this.graph = new DirectedGraph();

            this._generateGraph(opponentOffer);
            this._isGraphGenerated = true;
            this._currentLevel = this.graph.maxDepth;
        }

        const nodes = this.graph.getNodesByLevel(this._currentLevel);
        nodes.sort((a, b) => b.utility - a.utility);

        this._currentLevel = this._currentLevel > 0 ? this._currentLevel - 1 : 0;

        const randomIndex = Math.floor(Math.random() * nodes.length);

        return nodes[randomIndex];
    }
}
