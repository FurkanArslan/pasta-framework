import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NormTypes } from '../../models/norm/norm-types.enum';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-negotiation-input',
    templateUrl: './negotiation-input.component.html',
    styleUrls: ['./negotiation-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationInputComponent implements OnInit {
    @Input() negotiation: Negotiation;

    subjects: string[];
    objects: string[];
    actions: string[];
    conditions: string[];

    normField = '';

    normTypes = NormTypes;

    @ViewChild('replyForm')
    replyForm: NgForm;

    constructor() { }

    ngOnInit(): void {
        const options = this.negotiation.scenario.getOptions(this.negotiation.user.role);

        this.subjects = options.subject;
        this.objects = options.object;
        this.actions = options.actions;
        this.conditions = options.conditions;
    }

    reply(event): void {
        event.preventDefault();

        console.log(this.replyForm.valid);
        console.log(this.replyForm.value);
    }

}
