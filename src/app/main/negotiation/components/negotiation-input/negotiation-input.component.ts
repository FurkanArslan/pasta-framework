import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';
import { Bid } from '../../models/bid.model';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';
import { NegotiationPhrase, NegotiationPhrases } from '../../models/negotiation-phrases.model';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { FirebaseData, ConsequentData, RolesData } from '../../models/data';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Consequent } from '../../models/consequent.model';

@Component({
    selector: 'app-negotiation-input',
    templateUrl: './negotiation-input.component.html',
    styleUrls: ['./negotiation-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationInputComponent implements OnInit {
    @Input() negotiation: Negotiation;
    @Input() phrase: NegotiationPhrase;

    normTypes = NormTypes;

    roles: FirebaseData[];
    conditions: FirebaseData[];
    consequents: ConsequentData[];

    consequent: Consequent[] = [];

    @ViewChild('replyForm')
    replyForm: NgForm;

    // private currentBid: Bid;
    private subscription: Subscription;

    private bids: Bid[] = [];
    private norms: Norm[] = [];

    constructor(
        private normFactoryService: NormFactoryService,
        private afs: AngularFirestore
    ) {
        this.subscription = new Subscription();
    }

    ngOnInit(): void {
        this.afs.collection<RolesData>('roles-v2').get().subscribe((querySnapshot: QuerySnapshot<RolesData>) => {
            this.roles = querySnapshot.docs.map((doc: QueryDocumentSnapshot<RolesData>) => doc.data()).sort((a, b) => this._sortByName(a, b));
        });

        this.afs.collection<FirebaseData>('conditions-v2').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this.conditions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data()).sort((a, b) => this._sortByName(a, b));
        });

        this.afs.collection<ConsequentData>('consequents').get().subscribe((querySnapshot: QuerySnapshot<ConsequentData>) => {
            this.consequents = querySnapshot.docs.map((doc: QueryDocumentSnapshot<ConsequentData>) => doc.data()).sort((a, b) => this._sortByName(a, b));
        });
    }

    private _sortByName(a: FirebaseData, b: FirebaseData): number {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();

        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    }

    sendBid(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.norms.push(norm);

            const currentBid = this._getOrCreateBid();

            // Add the message to the chat
            this.createMessage(norm.toString());

            this.negotiation.bids.push(currentBid);

            setTimeout(() => {
                this.phrase.changePhrase(NegotiationPhrases.AGENTS_TURN);
            }, 1000);
        }
    }

    addMessage(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.norms.push(norm);

            // Add the message to the chat
            this.createMessage(norm.toString());
        }
    }

    private _getOrCreateBid(): Bid {
        const id = this.afs.createId();
        const newBid = new Bid(id, this.negotiation.user, this.negotiation.agent, this.norms);

        return newBid;
    }

    /**
     * Create Automated Message
     */
    private createMessage(message): void {
        // Message
        const newMessage = new Message(this.negotiation.user.id, message, true);

        // Add the message to the chat
        this.negotiation.dialogs.push(newMessage);
    }

    private getNorm(): Norm {
        const values = this.replyForm.value;

        return this.normFactoryService.getOrCreateNorm(values.norm, values.subject, this.negotiation.agent.name, [values.condition], [values.what]);
    }

}
