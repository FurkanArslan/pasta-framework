import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Negotiation } from '../../models/negotiation.model';
import { NegotiationPhrase } from '../../models/negotiation-phrases.model';
import { Bid } from '../../models/bid.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Value } from '../../models/value.model';

@Component({
    selector: 'app-promotion-and-demotion-selection',
    templateUrl: './promotion-and-demotion-selection.component.html',
    styleUrls: ['./promotion-and-demotion-selection.component.scss']
})
export class PromotionAndDemotionSelectionComponent implements OnInit {
    @Input() negotiation: Negotiation;
    @Input() phrase: NegotiationPhrase;

    @ViewChild('replyForm')
    replyForm: NgForm;

    values = ['Privacy', 'Safety', 'Security'];

    private currentBid: Bid;

    private bidsCollection$: AngularFirestoreCollection<Bid>;
    private valuesCollection$: AngularFirestoreCollection<Value>;

    constructor(private afs: AngularFirestore) {
        this.bidsCollection$ = this.afs.collection<Bid>('bids');
        this.valuesCollection$ = this.afs.collection<Value>('values');
    }

    ngOnInit(): void {
        this.currentBid = this.negotiation.bids[this.negotiation.bids.length - 1];
    }

    reply(event): void {
        event.preventDefault();

        this.currentBid.promotes = this.replyForm.form.value.promotes;
        this.currentBid.demotes = this.replyForm.form.value.demotes;

        const convertedData = JSON.parse(JSON.stringify(this.currentBid));
        this.bidsCollection$.add(convertedData);
    }
}
