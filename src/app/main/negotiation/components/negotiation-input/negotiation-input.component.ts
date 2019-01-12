import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';
import { Bid } from '../../models/bid.model';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';
import { NegotiationPhrase, NegotiationPhrases } from '../../models/negotiation-phrases.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { RolesData, DataBase, ConditionsData } from '../../models/data';
import { Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription, forkJoin, zip } from 'rxjs';

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

    roles$: Observable<RolesData[]>;
    conditions$: Observable<ConditionsData[]>;

    consequent: string[] = [];

    @ViewChild('replyForm')
    replyForm: NgForm;

    private currentBid: Bid;
    private subscription: Subscription;

    constructor(
        private normFactoryService: NormFactoryService,
        private afs: AngularFirestore
    ) {
        this.subscription = new Subscription();
    }

    ngOnInit(): void {
        this.roles$ = this.afs.collection<RolesData>('roles').valueChanges();
        this.conditions$ = this.afs.collection<ConditionsData>('conditions').valueChanges();

        const zippedCollections$ = zip(
            this.afs.collection<DataBase>('actions').valueChanges(),
            this.afs.collection<Data>('data').valueChanges())
            .subscribe(results => {
                const actions = results[0];
                const data = results[1];

                actions.forEach(action => data.forEach(data_ => this.consequent.push(`${action.name} ${data_.name}`)));
            });

        this.currentBid = new Bid(this.negotiation.user, this.negotiation.agent);

        this.subscription.add(zippedCollections$);
    }

    sendBid(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.currentBid.consistOf.push(norm);

            // Add the message to the chat
            this.createMessage(norm.toString());

            this.negotiation.bids.push(this.currentBid);
            this.phrase.changePhrase(NegotiationPhrases.AGENTS_TURN);
        }
    }

    addMessage(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.currentBid.consistOf.push(norm);

            // Add the message to the chat
            this.createMessage(norm.toString());
        }
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

        return this.normFactoryService.getNorm(values.norm, values.subject, this.negotiation.agent.name, values.condition, values.what);
    }

}
