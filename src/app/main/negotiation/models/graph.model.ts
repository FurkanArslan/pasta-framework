import { isNullOrUndefined } from 'util';
import { Norm } from './norm/norm.model';

export interface Edge {
    data: Norm;
    weight: number;
    name?: string;
}

/**
 * Represents a graph with vertices and edges.
 */
export class DirectedGraph {
    private _outEdges: Map<Norm, Edge[]>;
    private _inEdges: Map<Norm, Edge[]>;

    private _maxDepth: number;

    /**
     * Create a new instance.
     */
    constructor(edges?: Map<Norm, Edge[]>) {
        this._outEdges = edges || new Map<Norm, Edge[]>();
        this._inEdges = edges || new Map<Norm, Edge[]>();

        this._maxDepth = 0;
    }


    /**
     * Add a directed edge.  This will add any vertex not already known.
     * @param source The source of the edge.
     * @param target The target of the edge.
     */
    addEdge(source: Norm, target: Norm, weight?, name?): void {
        if (this._checkCircular(source, target)) {
            // console.log(`found circular reference ${source.id} -> ${target.id}`);
            return;
        }

        const outEdgesSource = this.addNode(source)[0];
        const inEdgesTarget = this.addNode(target)[1];

        if (this._checkSameChildExits(outEdgesSource, target)) {
            return;
        }

        this._setTargetUtility(source, target, weight || 0);
        this._setDepth(source, target);

        outEdgesSource.push({ data: target, weight: weight || 0, name: name });
        inEdgesTarget.push({ data: source, weight: weight || 0, name: name });
    }

    /**
     * @param  {} outEdges
     * @param  {} target
     * @returns boolean
     */
    private _checkSameChildExits(outEdges, target): boolean {
        if (outEdges.length > 0) {
            if (outEdges.some(e => e.data.id === target.id)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks for the presence of node in parents and throws if found.
     * @param parents A list of parents already visited.
     * @param node The node to find in the parents.
     */
    private _checkCircular(node: Norm, target: Norm): boolean {
        const inEdges = this.getInEdges(node);

        if (!isNullOrUndefined(inEdges) && inEdges.length > 0) {
            if (inEdges.some(e => e.data.id === target.id)) {
                return true;
            } else {
                return inEdges.some(e => this._checkCircular(e.data, target));
            }
        } else {
            return false;
        }
    }

    private _setTargetUtility(source, target, weight): void {
        target.utility = +source.utility + weight;

        const outEdgesOfTarget = this.getOutEdges(target);

        for (const edge of outEdgesOfTarget) {
            this._setTargetUtility(target, edge.data, edge.weight);
        }
    }

    private _setDepth(source, target): void{
        target.level = source.level + 1;
        this.maxDepth = source.level + 1;

        const outEdgesOfTarget = this.getOutEdges(target);

        for (const edge of outEdgesOfTarget) {
            this._setDepth(target, edge.data);
        }
    }

    /**
     * Add a node.
     * @param node The node to add.
     */
    addNode(node: Norm): [Edge[], Edge[]] {
        return [this._addOutEdge(node), this._addInEdge(node)];
    }

    private _addOutEdge(node: Norm): Edge[] {
        let outEdges = this.getOutEdges(node);

        if (outEdges === undefined) {
            outEdges = [];
            this._outEdges.set(node, outEdges);
        }

        return outEdges;
    }

    private _addInEdge(node: Norm): Edge[] {
        let inEdges = this.getInEdges(node);

        if (inEdges === undefined) {
            inEdges = [];
            this._inEdges.set(node, inEdges);
        }

        return inEdges;
    }

    /**
     * Get the targets of a node
     * @param node The node to get its targets
     */
    getOutEdges(node: Norm): Edge[] {
        return this._outEdges.get(node);
    }

    /**
     * Get the targets of a node
     * @param node The node to get its targets
     */
    getInEdges(node: Norm): Edge[] {
        return this._inEdges.get(node);
    }


    /**
     * Get the edges.
     */
    get edges(): Map<Norm, Edge[]> {
        return this._outEdges;
    }


    /**
     * Get the leaf nodes.
     */
    get leaves(): Norm[] {
        return [...Array.from(this._outEdges.entries())].filter(x => x[1].length === 0).map(x => x[0]);
    }

    /**
     * Get the nodes
     * @returns Norm
     */
    get nodes(): Norm[] {
        return [...Array.from(this._outEdges.entries())].map(x => x[0]);
    }

    getNode(nodeId): Norm {
        return [...Array.from(this._outEdges.entries())].map(x => x[0]).find(x => x.id === nodeId);
    }

    /**
     * @param  {number} level
     * @returns Norm
     */
    getNodesByLevel(level: number): Norm[] {
        return [...Array.from(this._outEdges.entries())].map(x => x[0]).filter(x => x.level === level);
    }

    /**
     * Create a shallow copy of this graph (copies edge map only).
     */
    shallowClone(): DirectedGraph {
        const edges = [...Array.from(this._outEdges.entries())].map<[Norm, Edge[]]>(kv => [kv[0], [...kv[1]]]);

        return new DirectedGraph(new Map<Norm, Edge[]>(edges));
    }


    /**
     * Return a graph which is the reverse of this graph.
     */
    reverse(): DirectedGraph {
        const rev = new DirectedGraph();

        for (const [source, targets] of Array.from(this._outEdges.entries())) {
            // add vertex explicitly in case there are no targets
            rev.addNode(source);

            for (const target of targets) {
                rev.addEdge(target.data, source, target.weight, target.name);
            }
        }

        return rev;
    }


    /**
     * Gets the path length of each reachable node to the given vertex.
     * @param root The root vertex.
     */
    getAdjacencyToNode(root: Norm): Map<Norm, number> {
        const adjacencies = new Map<Norm, number>();
        const parents: Norm[] = [];

        const recurse = (node: Norm, level: number) => {
            parents.push(node);
            const adj = adjacencies.get(node);

            if (adj === undefined || adj < level) {
                adjacencies.set(node, level);
                const children = this._outEdges.get(node);

                if (children === undefined) {
                    throw new Error(`unknown node '${node}'`);
                }

                for (const child of children) {
                    this._checkCircularReference(parents, child.data);
                    recurse(child.data, level + 1);
                }
            }

            parents.pop();
        };

        recurse(root, 0);
        return adjacencies;
    }


    /**
     * Checks for the presence of node in parents and throws if found.
     * @param parents A list of parents already visited.
     * @param node The node to find in the parents.
     */
    private _checkCircularReference(parents: Norm[], node: Norm): void {
        const i = parents.indexOf(node);
        if (i !== -1) {
            throw new Error(`found circular reference ${parents.slice(i).join(' -> ')} -> ${node}`);
        }
    }

    public get maxDepth(): number {
        return this._maxDepth;
    }

    public set maxDepth(value: number) {
        if (value > this._maxDepth) {
            this._maxDepth = value;
        }
    }
}
