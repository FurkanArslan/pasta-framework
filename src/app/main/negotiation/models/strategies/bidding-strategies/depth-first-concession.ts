import { Bidding } from './bidding';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';
import { DirectedGraph } from '../../graph.model';
import { isNullOrUndefined } from 'util';
import { LogService } from '../../../logs.service';

export class DepthFirstConcession extends Bidding {
    private _currentLevel = 0;

    constructor(normFactoryService: NormFactoryService, logService: LogService) {
        super(normFactoryService, logService);
    }

    public getOffer(opponentOffer: Bid, remainingTime: number): Norm {
        if (!this.isGraphGenerated) {
            this.graph = new DirectedGraph();

            this._generateGraph(opponentOffer);
            this._isGraphGenerated = true;
            this._currentLevel = this.graph.maxDepth;

            this._logGraphData();
        }

        const findInGraph = this.graph.getNode(opponentOffer.consistOf[0].id);

        if (isNullOrUndefined(findInGraph)) {
            this._generateGraph(opponentOffer, true);

            this._logGraphData();
        }

        const nodes = this.graph.getNodesByLevel(this._currentLevel);
        nodes.sort((a, b) => b.utility - a.utility);

        this._currentLevel = this._currentLevel > 0 ? this._currentLevel - 1 : 0;

        const randomIndex = Math.floor(Math.random() * nodes.length);

        return nodes[randomIndex];
    }
}
