import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Negotiation } from '../../models/negotiation.model';
import { NegotiationPhrase } from '../../models/negotiation-phrases.model';
import { Bid } from '../../models/bid.model';

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

    constructor() { }

    ngOnInit(): void {
        this.currentBid = this.negotiation.bids[this.negotiation.bids.length - 1];
    }

    reply(event): void {
        event.preventDefault();

        this.setDemotesAndPromotes(this.replyForm.form.value);
    }

    private setDemotesAndPromotes(values: any): any {
        this.currentBid.promotes = values.promotes;
        this.currentBid.demotes = values.demotes;

        console.log(this.currentBid);
    }

}
