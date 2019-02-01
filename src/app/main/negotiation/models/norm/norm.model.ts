import { NormTypes } from './norm-types.enum';
import { FirebaseData, FirebaseData } from '../data';
import { Consequent } from '../consequent.model';
import { FuseUtils } from '@fuse/utils';

export abstract class Norm {
    id: string;
    hasSubject: FirebaseData;
    hasObject: string;
    hasAntecedent: FirebaseData[];
    hasConsequent: Consequent[];
    normType: NormTypes;
    private _utilityValue: number;

    constructor(id: string, subject: FirebaseData, object: string, antecedent: FirebaseData[], consequent: Consequent[]) {
        this.id = id;
        this.hasSubject = subject;
        this.hasObject = object;
        this.hasAntecedent = antecedent || [];
        this.hasConsequent = consequent || [];
        this._utilityValue = 0;
    }

    get compoundConsequent(): string {
        return this.hasConsequent.reduce((consequent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.toString().toLowerCase() : ` ${consequent_} and ${currentValue.toString().toLowerCase()}`;
        }, '');
    }

    get compoundAntecedent(): string {
        return this.hasAntecedent.reduce((antecedent_, currentValue, currentIndex) => {
            return currentIndex === 0 ? currentValue.name : ` ${antecedent_} and ${currentValue.name}`;
        }, '');
    }

    set utility(newUtility: number) {
        if (newUtility && (newUtility > this._utilityValue)) {
            this._utilityValue = +newUtility.toFixed(1);
        }
    }

    get utility(): number {
        return this._utilityValue;
    }

    public abstract toString(): string;
}
