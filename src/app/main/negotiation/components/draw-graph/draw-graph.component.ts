import { Component, OnInit, ViewChild } from '@angular/core';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { Observable, Subscription, zip } from 'rxjs';
import { FirebaseData, ActionsData } from '../../models/data';
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

@Component({
    selector: 'app-draw-graph',
    templateUrl: './draw-graph.component.html',
    styleUrls: ['./draw-graph.component.scss']
})
export class DrawGraphComponent implements OnInit {
    normTypes = NormTypes;

    roles$: Observable<FirebaseData[]>;
    conditions$: Observable<FirebaseData[]>;

    consequent: Consequent[] = [];

    @ViewChild('replyForm')
    replyForm: NgForm;

    private subscription: Subscription;

    private _roles: FirebaseData[] = [];
    private _conditions: FirebaseData[];

    private preferences: Value[] = [
        { id: '1', name: 'Privacy', weight: 0.6 },
        { id: '2', name: 'Security', weight: 0.2 },
        // { id: '3', name: 'Safety', weight: 0.1 },
        { id: '4', name: 'Reputation', weight: 0.2 },
    ];

    node_name: string;

    layout = {
        name: 'dagre',
        rankDir: 'LR',
        directed: true,
        padding: 0
    };

    graphData = {
        nodes: [
            { data: { id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle' } },
            { data: { id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
            { data: { id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle' } },
            { data: { id: 'd', name: 'Sales', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
            { data: { id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
            { data: { id: 'f', name: 'Loan', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle' } },
            { data: { id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse' } },
            { data: { id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse' } }
        ],
        edges: [
            { data: { source: 'a', target: 'b', strength: 10 } },
            { data: { source: 'b', target: 'c', strength: 10 } },
            { data: { source: 'c', target: 'd', strength: 10 } },
            { data: { source: 'c', target: 'e', strength: 10 } },
            { data: { source: 'c', target: 'f', strength: 10 } },
            { data: { source: 'e', target: 'j', strength: 10 } },
            { data: { source: 'e', target: 'k', strength: 10 } }
        ]
    };


    constructor(
        private normFactoryService: NormFactoryService,
        private afs: AngularFirestore) {
        this.subscription = new Subscription();
    }

    ngOnInit(): void {

        this.roles$ = this.afs.collection<FirebaseData>('roles').valueChanges();
        this.conditions$ = this.afs.collection<FirebaseData>('conditions').valueChanges();

        const zippedCollections$ = zip(
            this.afs.collection<ActionsData>('actions').valueChanges(),
            this.afs.collection<FirebaseData>('data').valueChanges())
            .subscribe(results => {
                const actions = results[0];
                const data = results[1];

                actions.forEach(action => data.forEach(data_ => this.consequent.push(new Consequent(data_, action))));
            });

        this.afs.collection<FirebaseData>('roles').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this._roles = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data());
        });

        this.afs.collection<FirebaseData>('conditions').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this._conditions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data());
        });

        this.subscription.add(zippedCollections$);
    }

    sendBid(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            const norm = this.getNorm();

            const graph = new DirectedGraph();

            this._createOutcomeSpace(norm, graph);

            console.log(graph.leaves);
        }
    }

    private _createOutcomeSpace(root_norm: Norm, graph: DirectedGraph): void {
        console.log('Root-bid:', root_norm);

        new ActorRevision(this._roles, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new PredicateRevision(this._conditions, this.normFactoryService).improveBid([root_norm], graph, this.preferences);
        new NormRevision(this.normFactoryService).improveBid([root_norm], graph, this.preferences);

        const targets = graph.getOutEdges(root_norm);

        console.log('targets', targets);
        console.log('*********');

        if (!isNullOrUndefined(targets) && targets.length > 0) {
            targets.forEach(target => {
                this._createOutcomeSpace(target.data, graph);
            });
        }
    }

    private getNorm(): Norm {
        const values = this.replyForm.value;

        return this.normFactoryService.getNorm(values.norm, values.subject, 'Hospital Administration', values.condition, values.what);
    }

}
