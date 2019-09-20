import { DirectedGraph, Edge } from '../../graph.model';
import { Bid } from '../../bid.model';
import { ActorRevision } from '../../strategies/bid-generation/actor-revision';
import { PredicateRevision } from '../../strategies/bid-generation/predicate-revision';
import { NormRevision } from '../../strategies/bid-generation/norm-revision';
import { isNullOrUndefined } from 'util';
import { NormFactoryService } from '../../../factories/norm-factory.service';
import { RolesData, FirebaseData, ConsequentData } from '../../data';
import { Value } from '../../value.model';
import { Queue } from '../../queue.model';
import { Norm } from '../../norm/norm.model';
import { LogService } from 'app/main/negotiation/logs.service';

export abstract class Bidding {
    graph: DirectedGraph;
    protected _isGraphGenerated: boolean;
    private _visitedList = {};
    private queue = new Queue();

    private _roles: RolesData[] = [];
    private _conditions: FirebaseData[];
    private _consequents: ConsequentData[] = [];
    private _preferences: Value[];

    constructor(protected normFactoryService: NormFactoryService, protected logService: LogService) {
        this._isGraphGenerated = false;
    }

    protected _generateGraph(root_bid: Bid, isEnhance?: boolean): void {
        let targets: any[] = null;
        this._visitedList[root_bid.consistOf[0].id] = true;

        new ActorRevision(this.roles, this.normFactoryService).improveBid(root_bid.consistOf, this.graph, this.preferences);
        new PredicateRevision(this.conditions, this.consequents, this.normFactoryService).improveBid(
            root_bid.consistOf,
            this.graph,
            this.preferences
        );
        new NormRevision(this.normFactoryService).improveBid(root_bid.consistOf, this.graph, this.preferences);

        targets = this.graph.getOutEdges(root_bid.consistOf[0]);

        if (!isNullOrUndefined(targets) && targets.length > 0) {
            targets.forEach(target => {
                if (!this._visitedList[target.data.id]) {
                    this.queue.enqueue(target.data);
                }
            });
        }

        if (!this.queue.isEmpty) {
            const bid = {
                ...root_bid,
                consistOf: [this.queue.dequeue()]
            };

            this._generateGraph(bid, isEnhance);
        }

        if (isEnhance) {
            targets = this.graph.getOutEdges(root_bid.consistOf[0]);

            if (!isNullOrUndefined(targets) && targets.length > 0 && targets.every(x => this._visitedList[x.data.id])) {
                this._updateWeightAndLevel(root_bid);
            }
        }
    }

    protected _logGraphData(): void {
        const graphData: string[] = [];

        for (const [source, targets] of Array.from(this.graph.edges.entries())) {
            targets.forEach(target =>
                graphData.push(
                    `${source.toNormRepresentation(true)} -> ${target.data.toNormRepresentation(true)}, ${target.name}, level: ${
                        target.data.level
                    }`
                )
            );
        }

        this.logService.saveGraph(graphData);
    }

    protected _updateWeightAndLevel(root_bid: Bid): void {
        const node = root_bid.consistOf[0];
        const targets = this.graph.getOutEdges(node);

        let minValue = 10000;
        let minChildNode = null;

        targets.forEach((edge: Edge) => {
            const utility = edge.data.utility - edge.weight;

            if (minValue > utility) {
                minValue = utility;
                minChildNode = edge.data;
            }
        });

        if (minValue > node.utility) {
            node.utility = minValue;
            node.level = minChildNode.level - 1;
        }
    }

    public get roles(): RolesData[] {
        return this._roles;
    }

    public set roles(value: RolesData[]) {
        this._roles = value;
    }

    public get conditions(): FirebaseData[] {
        return this._conditions;
    }

    public set conditions(value: FirebaseData[]) {
        this._conditions = value;
    }

    public get isGraphGenerated(): boolean {
        return this._isGraphGenerated;
    }

    public get consequents(): ConsequentData[] {
        return this._consequents;
    }

    public set consequents(value: ConsequentData[]) {
        this._consequents = value;
    }

    public get preferences(): Value[] {
        return this._preferences;
    }

    public set preferences(value: Value[]) {
        this._preferences = value;
    }

    public abstract getOffer(opponentOffer: Bid, remainingTime?: number): Norm;
}
