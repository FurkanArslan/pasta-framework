import { Bidding } from './bidding';
import { Bid } from '../../bid.model';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { DirectedGraph } from '../../graph.model';
import { Norm } from '../../norm/norm.model';

import { LogService } from '../../../logs.service';
import { isNullOrUndefined } from 'util';

export class TimeBasedConcession extends Bidding {
    constructor(normFactoryService: NormFactoryService, logService: LogService) {
        super(normFactoryService, logService);
    }

    public getOffer(opponentOffer: Bid, remainingTime: number): Norm {
        if (!this.isGraphGenerated) {
            this.graph = new DirectedGraph();

            this._generateGraph(opponentOffer);
            this._isGraphGenerated = true;

            this._logGraphData();
        }

        const findInGraph = this.graph.getNode(opponentOffer.consistOf[0].id);

        if (isNullOrUndefined(findInGraph)) {
            this._generateGraph(opponentOffer, true);

            this._logGraphData();
        }

        let currentLevel = (this.graph.maxDepth * remainingTime) / 300;
        currentLevel = Math.ceil(currentLevel);

        const nodes = this.graph.getNodesByLevel(currentLevel);
        nodes.sort((a, b) => b.utility - a.utility);

        const randomIndex = Math.floor(Math.random() * nodes.length);

        return nodes[randomIndex];
    }
}
