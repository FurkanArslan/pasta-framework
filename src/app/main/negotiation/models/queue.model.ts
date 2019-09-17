import { Norm } from './norm/norm.model';

export class Queue {
    nodes: Norm[] = [];

    /**
     * Enqueue a new node
     * @param {Node} key     
     */
    enqueue(data: Norm): void {
        const isInTheList = this.nodes.some(node => node.id === data.id);

        if (!isInTheList) {
            this.nodes.push(data);
        }
    }

    dequeue(): Norm {
        return this.nodes.shift();
    }

    /**
     * Checks if empty
     */
    get isEmpty(): boolean {
        return !this.nodes.length;
    }
}
