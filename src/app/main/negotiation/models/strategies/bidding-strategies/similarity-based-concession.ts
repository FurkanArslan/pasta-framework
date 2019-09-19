import { Bidding } from './bidding';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';
import { DirectedGraph } from '../../graph.model';
import { FirebaseData } from '../../data';
import { isNullOrUndefined } from 'util';
import { LogService } from '../../../logs.service';

export class SimilarityBasedConcession extends Bidding {

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

        nodes.forEach((node: Norm) => node.similarity = this.findSimilarityBetweenNorms(node, opponentOffer.consistOf[0]));
        nodes.sort((a: Norm, b: Norm) => b.similarity - a.similarity);

        return nodes[0];
    }

    private findSimilarityBetweenNorms(possibleNorm: Norm, opponentNorm: Norm): number {
        const distanceRole = this.distanceBetweenData(possibleNorm.hasSubject, opponentNorm.hasSubject, this.roles);
        const distanceCondition = this.distanceBetweenData(possibleNorm.hasAntecedent[0], opponentNorm.hasAntecedent[0], this.conditions);
        const distanceConsequent = this.distanceBetweenData(possibleNorm.hasConsequent[0], opponentNorm.hasConsequent[0], this.consequents);

        const distanceNormType = opponentNorm.normType === possibleNorm.normType ? 0 : 1;

        return (0.2 * Math.pow(0.67, distanceRole)) + (0.2 * Math.pow(0.67, distanceCondition))
            + (0.2 * Math.pow(0.67, distanceConsequent)) + (0.4 * Math.pow(0.67, distanceNormType));

        // return (0.2 * Math.pow(0.67, distanceRole)) + 0.2 * distanceCondition + 0.2 * distanceConsequent + 0.4 * distanceNormType;
    }

    distanceBetweenData(data1: FirebaseData, data2: FirebaseData, allData: FirebaseData[]): number {
        let distance = 0;
        let tempData = { ...data1 };

        if (tempData.id === data2.id) {
            return distance;
        }

        while (!isNullOrUndefined(tempData.moreGeneral) && tempData.moreGeneral.length > 0) {
            if (tempData.id === data2.id) {
                return distance;
            }

            distance = distance + 1;
            tempData = allData.find((x: FirebaseData) => x.id === tempData.moreGeneral[0]);
        }

        distance = 0;
        tempData = { ...data1 };

        while (!isNullOrUndefined(tempData.exclusive) && tempData.exclusive.length > 0) {
            if (tempData.id === data2.id) {
                return distance;
            }

            distance = distance + 1;
            tempData = allData.find((x: FirebaseData) => x.id === tempData.exclusive[0]);
        }

        return distance;
    }

    private distanceToRoot(root: FirebaseData, data: FirebaseData, allData: FirebaseData[]): number {
        let distance = 0;
        let tempRoot = { ...root };

        while (!isNullOrUndefined(tempRoot.moreGeneral) && tempRoot.moreGeneral.length > 0) {
            if (tempRoot.id === data.id) {
                break;
            }

            distance = distance + 1;
            tempRoot = allData.find((x: FirebaseData) => x.id === tempRoot.moreGeneral[0]);
        }

        return distance;
    }

    private findRoot(data: FirebaseData[]): FirebaseData {
        let root = data[0];

        while (!isNullOrUndefined(root.exclusive) && root.exclusive.length > 0) {
            root = data.find(x => x.id === root.exclusive[0]);
        }

        return root;
    }
}
