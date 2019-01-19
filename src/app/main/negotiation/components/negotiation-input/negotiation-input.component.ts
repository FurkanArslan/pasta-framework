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
import { isNullOrUndefined } from 'util';

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

        this.afs.collection<Bid>('bids').valueChanges().subscribe(bids_ => {
            this.bids = bids_;
        });

        // this.currentBid = new Bid(this.afs.createId(), this.negotiation.user, this.negotiation.agent);

        this.subscription.add(zippedCollections$);
    }

    sendBid(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.norms.push(norm);
            // this.currentBid.consistOf.push(norm);

            const currentBid = this._getOrCreateBid();

            // Add the message to the chat
            this.createMessage(norm.toString());

            this.negotiation.bids.push(currentBid);
            this.phrase.changePhrase(NegotiationPhrases.AGENTS_TURN);
        }
    }

    addMessage(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the norm to the bid
            const norm = this.getNorm();
            this.norms.push(norm);
            // this.currentBid.consistOf.push(norm);

            // Add the message to the chat
            this.createMessage(norm.toString());
        }
    }

    private _getOrCreateBid(): Bid {
        const foundedBid = this.bids
            .filter(bid_ => bid_.consistOf.length === this.norms.length)
            .find(bid_ => this._includes(this.norms, bid_.consistOf));

        return !isNullOrUndefined(foundedBid) ? foundedBid : new Bid(this.afs.createId(), this.negotiation.user, this.negotiation.agent, this.norms);
    }

    private _includes(norms1: Norm[], norms2: Norm[]): boolean {
        return norms1.every(norm_ => this._isContainTheNorm(norm_, norms2));
    }

    private _isContainTheNorm(norm: Norm, norms2: Norm[]): boolean {
        return norms2.some(norm_ => this._isSameNorm(norm_, norm));
    }

    private _isSameNorm(norm1: Norm, norm2: Norm): boolean {
        return norm1.normType === norm2.normType &&
            norm1.hasObject === norm2.hasObject &&
            this._isSameItem(norm1.hasSubject, norm2.hasSubject) &&
            this._isSameArray(norm1.hasAntecedent, norm2.hasAntecedent) &&
            this._isSameConsequent(norm1.hasConsequent, norm2.hasConsequent);
    }

    private _isSameArray(items1: DataBase[], items2: DataBase[]): boolean {
        return items1.every(item => this._isInArray(item, items2)) &&
            items2.every(item => this._isInArray(item, items1));
    }

    private _isInArray(item: DataBase, items2: DataBase[]): boolean {
        return items2.some(item_ => this._isSameItem(item_, item));
    }

    private _isSameItem(item1: DataBase, item2: DataBase): boolean {
        return item1.id === item2.id;
    }

    private _isSameConsequent(consequent1: string[], consequent2: string[]): boolean {
        return consequent1.every(consequent_ => consequent2.includes(consequent_)) &&
            consequent2.every(consequent_ => consequent1.includes(consequent_));
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
