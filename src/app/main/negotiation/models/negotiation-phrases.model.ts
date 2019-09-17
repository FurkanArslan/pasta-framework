import { typestate } from 'typestate';

export enum NegotiationPhrases {
    INITIAL,
    WELCOME,
    SCENARIO_SELECTION,
    ROLE_SELECTION,
    PREFERENCE_SELECTION,
    SELECT_DEMOTES_AND_PROMOTES,
    USER_TURN,
    AGENTS_TURN,
    CONTINUE_OR_EXIT,
    EXIT
}

export class NegotiationPhrase {
    private _phrase: typestate.FiniteStateMachine<NegotiationPhrases>;

    constructor() {
        this._phrase = new typestate.FiniteStateMachine(NegotiationPhrases.INITIAL);

        this._phrase.from(NegotiationPhrases.INITIAL).toAny(NegotiationPhrases);
        this._phrase.from(NegotiationPhrases.WELCOME).toAny(NegotiationPhrases);

        this._phrase.from(NegotiationPhrases.PREFERENCE_SELECTION).to(NegotiationPhrases.USER_TURN);

        // Negotiation turn states
        this._phrase.from(NegotiationPhrases.USER_TURN).to(NegotiationPhrases.AGENTS_TURN);
        this._phrase.from(NegotiationPhrases.AGENTS_TURN).to(NegotiationPhrases.CONTINUE_OR_EXIT);
        this._phrase.from(NegotiationPhrases.AGENTS_TURN).to(NegotiationPhrases.EXIT);
        this._phrase.from(NegotiationPhrases.USER_TURN).to(NegotiationPhrases.EXIT);

        // Bid generation states
        this._phrase.from(NegotiationPhrases.AGENTS_TURN).to(NegotiationPhrases.SELECT_DEMOTES_AND_PROMOTES);
        this._phrase.from(NegotiationPhrases.SELECT_DEMOTES_AND_PROMOTES).to(NegotiationPhrases.CONTINUE_OR_EXIT);

        this._phrase.from(NegotiationPhrases.CONTINUE_OR_EXIT).to(NegotiationPhrases.EXIT);
        this._phrase.from(NegotiationPhrases.CONTINUE_OR_EXIT).to(NegotiationPhrases.USER_TURN);
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
