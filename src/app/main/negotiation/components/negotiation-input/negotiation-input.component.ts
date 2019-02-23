import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';
import { Bid } from '../../models/bid.model';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';
import { NegotiationPhrase, NegotiationPhrases } from '../../models/negotiation-phrases.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseData, ConsequentData } from '../../models/data';
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

    roles$: Observable<FirebaseData[]>;
    conditions$: Observable<FirebaseData[]>;
    consequents$: Observable<ConsequentData[]>;

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
        this.roles$ = this.afs.collection<FirebaseData>('roles-v2').valueChanges();
        this.conditions$ = this.afs.collection<FirebaseData>('conditions-v2').valueChanges();
        this.consequents$ = this.afs.collection<ConsequentData>('consequents').valueChanges();
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
