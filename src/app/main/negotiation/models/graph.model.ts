
export interface Edge<T> {
    data: T;
    weight: number;
    name?: string;
}

/**
 * Represents a graph with vertices and edges.
 */
export class DirectedGraph<T> {
    private _edges: Map<T, Edge<T>[]>;


    /**
     * Create a new instance.
     */
    constructor(edges?: Map<T, Edge<T>[]>) {
        this._edges = edges || new Map<T, Edge<T>[]>();
    }


    /**
     * Add a directed edge.  This will add any vertex not already known.
     * @param source The source of the edge.
     * @param target The target of the edge.
     */
    addEdge(source: T, target: T, weight?, name?): void {
        const targets = this.addVertex(source);
        this.addVertex(target);

        targets.push({ data: target, weight: weight || 0, name: name });
    }


    /**
     * Add a vertex.
     * @param vertex The vertex to add.
     */
    addVertex(vertex: T): Edge<T>[] {
        let targets = this._edges.get(vertex);

        if (targets === undefined) {
            targets = [];
            this._edges.set(vertex, targets);
        }

        return targets;
    }


    /**
     * Get the edges.
     */
    edges(): Map<T, Edge<T>[]> {
        return this._edges;
    }


    /**
     * Get the leaf nodes.
     */
    leaves(): T[] {
        return [...Array.from(this._edges.entries())].filter(x => x[1].length === 0).map(x => x[0]);
    }


    /**
     * Create a shallow copy of this graph (copies edge map only).
     */
    shallowClone(): DirectedGraph<T> {
        const edges = [...Array.from(this._edges.entries())].map<[T, Edge<T>[]]>(kv => [kv[0], [...kv[1]]]);

        return new DirectedGraph<T>(new Map<T, Edge<T>[]>(edges));
    }


    /**
     * Return a graph which is the reverse of this graph.
     */
    reverse(): DirectedGraph<T> {
        const rev = new DirectedGraph<T>();

        for (const [source, targets] of Array.from(this._edges.entries())) {
            // add vertex explicitly in case there are no targets
            rev.addVertex(source);

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
    getAdjacencyToNode(root: T): Map<T, number> {
        const adjacencies = new Map<T, number>();
        const parents: T[] = [];

        const recurse = (node: T, level: number) => {
            parents.push(node);
            const adj = adjacencies.get(node);

            if (adj === undefined || adj < level) {
                adjacencies.set(node, level);
                const children = this._edges.get(node);

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
    private _checkCircularReference(parents: T[], node: T): void {
        const i = parents.indexOf(node);
        if (i !== -1) {
            throw new Error(`found circular reference ${parents.slice(i).join(' -> ')} -> ${node}`);
        }
    }
}