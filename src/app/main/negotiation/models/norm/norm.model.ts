import { NormTypes } from './norm-types.enum';
import { FirebaseData, ConsequentData, RolesData, AntecedentData } from '../data';

export abstract class Norm {
    id: string;
    hasSubject: RolesData;
    hasObject: string;
    hasAntecedent: AntecedentData[];
    hasConsequent: ConsequentData[];
    normType: NormTypes;
    private _utilityValue: number;
    private _isInitialUtility: boolean;

    constructor(id: string, subject: RolesData, object: string, antecedent: AntecedentData[], consequent: ConsequentData[]) {
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
                return `${currentValue.name.toLowerCase()}`;
            } else {
                return `${consequent_} and ${currentValue.name.toLowerCase()}`;
            }
        }, '');
    }

    get compoundConsequentWithShortName(): string {
        return this.hasConsequent.reduce((consequent_, currentValue, currentIndex) => {
            if (currentIndex === 0) {
                return `${currentValue.shortName}`;
            } else {
                return `${consequent_} & ${currentValue.shortName}`;
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
    public abstract toNormRepresentation(isIncludeUtility: boolean): string;
}
