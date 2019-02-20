import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { Value } from '../../models/value.model';
import { Negotiation } from '../../models/negotiation.model';
import { NegotiationPhrase } from '../../models/negotiation-phrases.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-preferences-selection',
    templateUrl: './preferences-selection.component.html',
    styleUrls: ['./preferences-selection.component.scss']
})
export class PreferencesSelectionComponent implements OnInit {
    @Input() negotiation: Negotiation;
    @Input() phrase: NegotiationPhrase;

    valuesCollection$: AngularFirestoreCollection<Value>;

    @ViewChild('replyForm')
    replyForm: NgForm;

    constructor(private afs: AngularFirestore) { 
        this.valuesCollection$ = this.afs.collection<Value>('values');
    }

    ngOnInit(): void {
    }

    reply(event): void {
        event.preventDefault();

        console.log(this.replyForm.form.value);
    }

}
