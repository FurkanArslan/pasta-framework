import { Bid } from './bid.model';
import { DirectedGraph } from './graph.model';

/**
 * A node for priority linked list / stack and such
 */
class PriorityNode {
    key: Bid;
    priority: number;

    constructor(key: Bid, priority: number) {
        this.key = key;
        this.priority = priority;
    }
}

/**
 * A priority queue with highest priority always on top
 * This queue is sorted by priority for each enqueue
 */
class PriorityQueue {

    nodes: PriorityNode[] = [];

    /**
	 * Enqueue a new node
	 * @param {number} priority
	 * @param {Bid} key     
	 */
    enqueue(priority: number, data: Bid): void {
        this.nodes.push(new PriorityNode(data, priority));
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    /**
	 * Dequeue the highest priority key
	 */
    dequeue(): PriorityNode {
        return this.nodes.shift();
    }

    /**
	 * Checks if empty
	 */
    get isEmpty(): boolean {
        return !this.nodes.length;
    }
}

export class UniformCostSearch {
    // private nodes: PriorityQueue;

    // infinity = 1 / 0;

    // constructor() {
    //     this.nodes = new PriorityQueue();
    // }

    // public getShortestPath(root: Bid, goal: Bid, graph: DirectedGraph): void {
    //     const previous = {}, path = [];

    //     this.nodes.enqueue(0, root);
    //     previous[root.id] = null;

    //     while (!this.nodes.isEmpty) {
    //         let smallest = this.nodes.dequeue();

    //         if (smallest.key.id === goal.id) {
    //             // Compute the path
    //             while (previous[smallest.key.id]) {
    //                 path.push(smallest.key);
    //                 smallest = previous[smallest.key.id];
    //             }
    //             break;
    //         } else {
    //             // const children = graph.getOutEdges(smallest.key);

    //             for (const child of children) {
    //                 const cost = smallest.priority + child.weight;
    //                 previous[child.data.id] = smallest;
    //                 // this.nodes.enqueue(cost, child.data);
    //             }
    //         }
    //     }

    //     console.log(path.concat(root).reverse());
    // }
}
