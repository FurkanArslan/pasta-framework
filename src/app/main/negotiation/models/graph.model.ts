import { isNullOrUndefined } from 'util';
import { Bid } from './bid.model';

export interface Edge {
    data: Bid;
    weight: number;
    name?: string;
}

/**
 * Represents a graph with vertices and edges.
 */
export class DirectedGraph {
    private _outEdges: Map<Bid, Edge[]>;
    private _inEdges: Map<Bid, Edge[]>;

    /**
     * Create a new instance.
     */
    constructor(edges?: Map<Bid, Edge[]>) {
        this._outEdges = edges || new Map<Bid, Edge[]>();
        this._inEdges = edges || new Map<Bid, Edge[]>();
    }


    /**
     * Add a directed edge.  This will add any vertex not already known.
     * @param source The source of the edge.
     * @param target The target of the edge.
     */
    addEdge(source: Bid, target: Bid, weight?, name?): void {
        if (this._checkCircular(source, target)) {
            // console.log(`found circular reference ${source.id} -> ${target.id}`);
            return;
        }

        const outEdgesSource = this.addNode(source)[0];
        const inEdgesTarget = this.addNode(target)[1];

        outEdgesSource.push({ data: target, weight: weight || 0, name: name });
        inEdgesTarget.push({ data: source, weight: weight || 0, name: name });
    }

    /**
     * Checks for the presence of node in parents and throws if found.
     * @param parents A list of parents already visited.
     * @param node The node to find in the parents.
     */
    private _checkCircular(node: Bid, target: Bid): boolean {
        const inEdges = this.getInEdges(node);

        if (!isNullOrUndefined(inEdges) && inEdges.length > 0) {
            if (inEdges.some(e => e.data === target)) {
                return true;
            } else {
                return inEdges.some(e => this._checkCircular(e.data, target));
            }
        } else {
            return false;
        }
    }

    /**
     * Add a node.
     * @param node The node to add.
     */
    addNode(node: Bid): [Edge[], Edge[]] {
        return [this._addOutEdge(node), this._addInEdge(node)];
    }

    private _addOutEdge(node: Bid): Edge[] {
        let outEdges = this.getOutEdges(node);

        if (outEdges === undefined) {
            outEdges = [];
            this._outEdges.set(node, outEdges);
        }

        return outEdges;
    }

    private _addInEdge(node: Bid): Edge[] {
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
    getOutEdges(node: Bid): Edge[] {
        return this._outEdges.get(node);
    }

    /**
     * Get the targets of a node
     * @param node The node to get its targets
     */
    getInEdges(node: Bid): Edge[] {
        return this._inEdges.get(node);
    }


    /**
     * Get the edges.
     */
    get edges(): Map<Bid, Edge[]> {
        return this._outEdges;
    }


    /**
     * Get the leaf nodes.
     */
    get leaves(): Bid[] {
        return [...Array.from(this._outEdges.entries())].filter(x => x[1].length === 0).map(x => x[0]);
    }


    /**
     * Create a shallow copy of this graph (copies edge map only).
     */
    shallowClone(): DirectedGraph {
        const edges = [...Array.from(this._outEdges.entries())].map<[Bid, Edge[]]>(kv => [kv[0], [...kv[1]]]);

        return new DirectedGraph(new Map<Bid, Edge[]>(edges));
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
    getAdjacencyToNode(root: Bid): Map<Bid, number> {
        const adjacencies = new Map<Bid, number>();
        const parents: Bid[] = [];

        const recurse = (node: Bid, level: number) => {
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
    private _checkCircularReference(parents: Bid[], node: Bid): void {
        const i = parents.indexOf(node);
        if (i !== -1) {
            throw new Error(`found circular reference ${parents.slice(i).join(' -> ')} -> ${node}`);
        }
    }
}
