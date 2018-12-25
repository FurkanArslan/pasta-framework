export enum NegotiationPhrase {
    WELCOME,
    SCENARIO_SELECTION,
    ROLE_SELECTION
}

export class NegotiationPhrases {
    phrase: NegotiationPhrase;

    constructor(){
        this.phrase = NegotiationPhrase.WELCOME;
    }
}
