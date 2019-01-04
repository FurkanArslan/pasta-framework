import { typestate } from 'typestate';

export enum NegotiationPhrases {
    INITIAL,
    WELCOME,
    SCENARIO_SELECTION,
    ROLE_SELECTION,
    FIRST_OFFER,
    SELECT_DEMOTES_AND_PROMOTES,
    USER_TURN,
    AGENTS_TURN
}

export class NegotiationPhrase {
    private _phrase: typestate.FiniteStateMachine<NegotiationPhrases>;

    constructor() {
        this._phrase = new typestate.FiniteStateMachine(NegotiationPhrases.INITIAL);

        this._phrase.from(NegotiationPhrases.INITIAL).toAny(NegotiationPhrases);

        this._phrase.from(NegotiationPhrases.WELCOME).to(NegotiationPhrases.SCENARIO_SELECTION);
        this._phrase.from(NegotiationPhrases.SCENARIO_SELECTION).to(NegotiationPhrases.ROLE_SELECTION);
        this._phrase.from(NegotiationPhrases.ROLE_SELECTION).to(NegotiationPhrases.FIRST_OFFER);

        // Negotiation turn states
        this._phrase.from(NegotiationPhrases.FIRST_OFFER).to(NegotiationPhrases.AGENTS_TURN);
        this._phrase.from(NegotiationPhrases.AGENTS_TURN).to(NegotiationPhrases.USER_TURN);

        // Bid generation states
        this._phrase.from(NegotiationPhrases.AGENTS_TURN).to(NegotiationPhrases.SELECT_DEMOTES_AND_PROMOTES);
        this._phrase.from(NegotiationPhrases.SELECT_DEMOTES_AND_PROMOTES).to(NegotiationPhrases.FIRST_OFFER);
    }


    /**
     * changePhrase
     * @param phrase
     */
    public changePhrase(phrase: NegotiationPhrases): void {
        if (this._phrase.canGo(phrase)) {
            this._phrase.go(phrase);
        }
    }

    bindPhraseChange(phrase: NegotiationPhrases, func, scope): void {
        this._phrase.on(phrase, (from: NegotiationPhrases) => {
            func(scope);
        });
    }

    get phrase(): typestate.FiniteStateMachine<NegotiationPhrases> {
        return this._phrase;
    }
}
