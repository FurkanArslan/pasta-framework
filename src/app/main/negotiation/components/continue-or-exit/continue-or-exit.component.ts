import { Component, OnInit, Input } from '@angular/core';
import { Negotiation } from '../../models/negotiation.model';
import { NegotiationPhrase, NegotiationPhrases } from '../../models/negotiation-phrases.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-continue-or-exit',
    templateUrl: './continue-or-exit.component.html',
    styleUrls: ['./continue-or-exit.component.scss']
})
export class ContinueOrExitComponent {
    @Input() negotiation: Negotiation;
    @Input() phrase: NegotiationPhrase;

    constructor(private router: Router) { }

    onExit(event): void {
        event.preventDefault();

        this.router.navigate(['']);
    }

    onContinue(event): void {
        event.preventDefault();

        this.phrase.changePhrase(NegotiationPhrases.USER_TURN);
    }
}
