import { Bid } from '../../bid.model';
import { DataBase } from '../../data';
import { Norm } from '../../norm/norm.model';

export abstract class BidGeneration {
    public abstract getBidOptions(availableBids: Bid[], bid: Bid): Bid[];

    // protected _isInNorm(item: Norm, items2: Norm[], compareFunc): boolean {
    //     return items2.some(item_ => compareFunc(item_, item));
    // }

    protected _includes(norms1: Norm[], norms2: Norm[]): boolean {
        return norms1.every(norm_ => this._isContainTheNorm(norm_, norms2));
    }

    protected _isContainTheNorm(norm: Norm, norms2: Norm[]): boolean {
        return norms2.some(norm_ => this._isSameNorm(norm_, norm));
    }

    protected _isSameNorm(norm1: Norm, norm2: Norm): boolean {
        return norm1.normType === norm2.normType &&
            norm1.hasObject === norm2.hasObject &&
            this._isSameItem(norm1.hasSubject, norm2.hasSubject) &&
            this._isSameArray(norm1.hasAntecedent, norm2.hasAntecedent) &&
            this._isSameConsequent(norm1.hasConsequent, norm2.hasConsequent);
    }

    protected _isSameArray(items1: DataBase[], items2: DataBase[]): boolean {
        return items1.every(item => this._isInArray(item, items2)) &&
            items2.every(item => this._isInArray(item, items1));
    }

    protected _isInArray(item: DataBase, items2: DataBase[]): boolean {
        return items2.some(item_ => this._isSameItem(item_, item));
    }

    protected _isSameItem(item1: DataBase, item2: DataBase): boolean {
        return item1.id === item2.id;
    }

    protected _isSameConsequent(consequent1: string[], consequent2: string[]): boolean {
        return consequent1.every(consequent_ => consequent2.includes(consequent_)) &&
            consequent2.every(consequent_ => consequent1.includes(consequent_));
    }

    protected _differenceNorms(norms1: Norm[], norms2: Norm[]): Norm[] {
        return norms1.filter(norm1 => !norms2.some(norm2 => this._isSameNorm(norm1, norm2)));
    }
}
