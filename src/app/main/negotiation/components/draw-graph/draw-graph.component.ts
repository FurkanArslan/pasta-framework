import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { Observable, Subscription, zip } from 'rxjs';
import { FirebaseData, ActionsData, ConsequentData, RolesData, AntecedentData } from '../../models/data';
import { Consequent } from '../../models/consequent.model';
import { NgForm } from '@angular/forms';
import { Bid } from '../../models/bid.model';
import { Norm } from '../../models/norm/norm.model';
import { Message } from '../../models/message.model';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { DirectedGraph } from '../../models/graph.model';
import { ActorRevision } from '../../models/strategies/bid-generation/actor-revision';
import { PredicateRevision } from '../../models/strategies/bid-generation/predicate-revision';
import { NormRevision } from '../../models/strategies/bid-generation/norm-revision';
import { isNullOrUndefined } from 'util';
import { Value } from '../../models/value.model';
import { Queue } from '../../models/queue.model';

@Component({
    selector: 'app-draw-graph',
    templateUrl: './draw-graph.component.html',
    styleUrls: ['./draw-graph.component.scss']
})
export class DrawGraphComponent implements OnInit {
    normTypes = NormTypes;

    roles$: Observable<FirebaseData[]>;
    conditions$: Observable<FirebaseData[]>;
    consequents$: Observable<ConsequentData[]>;

    @ViewChild('replyForm')
    replyForm: NgForm;

    private subscription: Subscription;

    private _roles: RolesData[] = [];
    private _conditions: AntecedentData[];
    private _consequents: ConsequentData[] = [];

    private preferences: Value[] = [
        { id: '8GO8n36e03YsGJVgyWMw', name: 'Privacy', weight: 0.6 },
        { id: 'jiqjSieoLhp3amXZqkhh', name: 'Security', weight: 0.2 },
        // { id: '3', name: 'Safety', weight: 0.1 },
        { id: 'IdmViauumPNyrSIEYPB0', name: 'Reputation', weight: 0.2 },
    ];

    node_name: string;

    layout = {
        name: 'dagre',
        // rankDir: 'LR',
        directed: true,
        padding: 10,
    };

    zoom = {
        min: 1e-50,
        max: 1e50
    }

    graphData = {
        nodes: null,
        edges: null
    };

    private visitedList = {};
    private queue = new Queue();

    constructor(
        private normFactoryService: NormFactoryService,
        private ref: ChangeDetectorRef,
        private afs: AngularFirestore) {
        this.subscription = new Subscription();
    }

    ngOnInit(): void {

        this.roles$ = this.afs.collection<FirebaseData>('roles-v2').valueChanges();
        this.conditions$ = this.afs.collection<FirebaseData>('conditions-v2').valueChanges();
        this.consequents$ = this.afs.collection<ConsequentData>('consequents').valueChanges();

        // const zippedCollections$ = zip(
        //     this.afs.collection<ActionsData>('actions').valueChanges(),
        //     this.afs.collection<FirebaseData>('data').valueChanges())
        //     .subscribe(results => {
        //         const actions = results[0];
        //         const data = results[1];

        //         actions.forEach(action => data.forEach(data_ => this.consequent.push(new Consequent(data_, action))));
        //     });

        this.afs.collection<RolesData>('roles-v2').get().subscribe((querySnapshot: QuerySnapshot<RolesData>) => {
            this._roles = querySnapshot.docs.map((doc: QueryDocumentSnapshot<RolesData>) => doc.data());
        });

        this.afs.collection<AntecedentData>('conditions-v2').get().subscribe((querySnapshot: QuerySnapshot<AntecedentData>) => {
            this._conditions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<AntecedentData>) => doc.data());
        });

        this.afs.collection<ConsequentData>('consequents').get().subscribe((querySnapshot: QuerySnapshot<ConsequentData>) => {
            this._consequents = querySnapshot.docs.map((doc: QueryDocumentSnapshot<ConsequentData>) => doc.data());
        });

        // this.subscription.add(zippedCollections$);
    }

    sendBid(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            const norm = this.getNorm();

            const graph = new DirectedGraph();

            this._createOutcomeSpace2(norm, graph);

            this.graphData.nodes = [];
            this.graphData.edges = [];

            for (const [source, targets] of Array.from(graph.edges.entries())) {
                this.graphData.nodes.push({
                    data: {
                        id: source.id,
                        name: source.toNormRepresentation(true),
                        weight: 100,
                        colorCode: 'blue',
                        shapeType: 'roundrectangle',
                    }
                });

                for (const target of targets) {
                    this.graphData.edges.push({
                        data: {
                            source: source.id,
                            target: target.data.id,
                            strength: 10,
                            name: target.name
                        }
                    });
                }
            }

            this.ref.detectChanges();
        }
    }

    private _createOutcomeSpace2(root_norm: Norm, graph: DirectedGraph): void {
        console.log('Root-bid:', root_norm);
        this.visitedList[root_norm.id] = true;

        new ActorRevision(this._roles, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new PredicateRevision(this._conditions, this._consequents, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new NormRevision(this.normFactoryService).improveBid([root_norm], graph, this.preferences);

        const targets = graph.getOutEdges(root_norm);

        console.log('targets', targets);

        if (!isNullOrUndefined(targets) && targets.length > 0) {
            targets.forEach(target => {
                if (!this.visitedList[target.data.id]) {
                    this.queue.enqueue(target.data);
                } else {
                    console.log('already visited: ', target.data);
                    console.log('*********');
                }
            });
        }

        if (!this.queue.isEmpty) {
            console.log(this.queue.nodes.length);
            this._createOutcomeSpace2(this.queue.dequeue(), graph);
        }
    }

    private _createOutcomeSpace(root_norm: Norm, graph: DirectedGraph): void {
        console.log('Root-bid:', root_norm);

        new ActorRevision(this._roles, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new PredicateRevision(this._conditions, this._consequents, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new NormRevision(this.normFactoryService).improveBid([root_norm], graph, this.preferences);

        const targets = graph.getOutEdges(root_norm);

        console.log('targets', targets);
        console.log('*********');

        if (!isNullOrUndefined(targets) && targets.length > 0) {
            for (const target of targets) {
                new ActorRevision(this._roles, this.normFactoryService).improveBid([target.data], graph, this.preferences);
                new PredicateRevision(this._conditions, this._consequents, this.normFactoryService).improveBid([target.data], graph, this.preferences);
                new NormRevision(this.normFactoryService).improveBid([target.data], graph, this.preferences);

                const child_targets = graph.getOutEdges(target.data);
                console.log('child_targets', targets);
                console.log('*********');

                for (const child_target of child_targets) {
                    this.queue.enqueue(child_target.data);
                }
            }
        }

        while (!this.queue.isEmpty) {
            const child_target = this.queue.dequeue();

            new ActorRevision(this._roles, this.normFactoryService).improveBid([child_target], graph, this.preferences);
            new PredicateRevision(this._conditions, this._consequents, this.normFactoryService).improveBid([child_target], graph, this.preferences);
            new NormRevision(this.normFactoryService).improveBid([child_target], graph, this.preferences);
        }
    }

    private getNorm(): Norm {
        const values = this.replyForm.value;

        return this.normFactoryService.getOrCreateNorm(values.norm, values.subject, 'Hospital Administration', values.condition, values.what);
    }

}
