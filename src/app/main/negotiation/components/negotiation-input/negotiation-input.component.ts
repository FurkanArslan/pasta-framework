import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';
import { Bid } from '../../models/bid.model';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';
import { NegotiationPhrase, NegotiationPhrases } from '../../models/negotiation-phrases.model';

@Component({
    selector: 'app-negotiation-input',
    templateUrl: './negotiation-input.component.html',
    styleUrls: ['./negotiation-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationInputComponent implements OnInit {
    @Input() negotiation: Negotiation;
    @Input() phrase: NegotiationPhrase;

    subjects: string[];
    objects: string[];
    actions: string[];
    conditions: string[];
    normField = '';

    normTypes = NormTypes;

    @ViewChild('replyForm')
    replyForm: NgForm;

    private currentBid: Bid;

    constructor(
        private normFactoryService: NormFactoryService
    ) {
    }

    ngOnInit(): void {
        this.currentBid = new Bid(this.negotiation.user, this.negotiation.agent);
        const options = this.negotiation.scenario.getOptions(this.negotiation.user.role);

        this.subjects = options.subject;
        this.objects = options.object;
        this.actions = options.actions;
        this.conditions = options.conditions;
    }

    reply(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the message to the chat
            const message = this.getMessage();
            this.createMessage(message);

            // Add the norm to the bid
            const norm = this.getNorm();
            this.currentBid.consistOf.push(norm);

            this.negotiation.bids.push(this.currentBid);
            this.phrase.changePhrase(NegotiationPhrases.AGENTS_TURN);
        }
    }

    addMessage(event): void {
        event.preventDefault();

        if (this.replyForm.valid) {
            // Add the message to the chat
            const message = this.getMessage();
            this.createMessage(message);

            // Add the norm to the bid
            const norm = this.getNorm();
            this.currentBid.consistOf.push(norm);

            this.createMessage('And');
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

    private getMessage(): string {
        const values = this.replyForm.value;
        let message = `${values.who} is ${values.norm}`;

        if (values.norm === NormTypes.COM) {
            message += ` to ${values.whom} to do ${values.what} under ${values.condition}`;
        } else {
            message += ` by ${values.whom} from ${values.what} under ${values.condition}`;
        }

        return message;
    }

    private getNorm(): Norm {
        const values = this.replyForm.value;

        return this.normFactoryService.getNorm(values.norm, values.who, values.whom, values.condition, values.what);
    }

}
