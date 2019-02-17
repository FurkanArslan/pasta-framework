import { NormTypes } from './norm-types.enum';
import { FirebaseData } from '../data';
import { Consequent } from '../consequent.model';

export abstract class Norm {
    id: string;
    hasSubject: FirebaseData;
    hasObject: string;
    hasAntecedent: FirebaseData[];
    hasConsequent: Consequent[];
    normType: NormTypes;
    private _utilityValue: number;
    private _isInitialUtility: boolean;

    constructor(id: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[]) {
        this.id = id;
        this.hasSubject = subject;
        this.hasObject = object;
        this.hasAntecedent = antecedent || [];
        this.hasConsequent = consequent || [];
        this._utilityValue = 0;
        this._isInitialUtility = true;
    }

    get compoundConsequent(): string {
        return this.hasConsequent.reduce((consequent_, currentValue, currentIndex) => {
            if (currentIndex === 0) {
                return `${currentValue.action.name.toLowerCase()}${currentValue.data.name.toLowerCase()}`;
            } else {
                return `${consequent_} and ${currentValue.action.name.toLowerCase()}${currentValue.data.name.toLowerCase()}`;
            }
        }, '');
    }

    get compoundConsequentWithShortName(): string {
        return this.hasConsequent.reduce((consequent_, currentValue, currentIndex) => {
            if (currentIndex === 0) {
                return `${currentValue.action.shortName}${currentValue.data.shortName}`;
            } else {
                return `${consequent_} & ${currentValue.action.shortName}${currentValue.data.shortName}`;
            }
        }, '');
    }

    get compoundAntecedent(): string {
        return this.hasAntecedent.reduce((antecedent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.name : ` ${antecedent_} and ${currentValue.name}`;
        }, '');
    }

    get compoundAntecedentWithShortName(): string {
        return this.hasAntecedent.reduce((antecedent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.shortName : ` ${antecedent_} & ${currentValue.shortName}`;
        }, '');
    }

    set utility(newUtility: number) {
        if (newUtility && this._isInitialUtility) {
            this._utilityValue = +newUtility.toFixed(2);
            this._isInitialUtility = false;
        }

        if (newUtility && (newUtility > this._utilityValue)) {
            this._utilityValue = +newUtility.toFixed(2);
        }
    }

    get utility(): number {
        return this._utilityValue;
    }

    public abstract toString(): string;
    public abstract toNormRepresentation(): string;
}
