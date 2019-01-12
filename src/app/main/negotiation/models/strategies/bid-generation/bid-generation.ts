import { Bid } from '../../bid.model';
import { DataBase } from '../../data';
import { Norm } from '../../norm/norm.model';

export abstract class BidGeneration {
    public abstract getBidOptions(availableBids: Bid[], bid: Bid): Bid[];

    protected _isSameConsequent(consequent1: string[], consequent2: string[]): boolean {
        return consequent1.every(consequent_ => consequent2.includes(consequent_)) &&
            consequent2.every(consequent_ => consequent1.includes(consequent_));
    }

    // protected _isInNorm(item: Norm, items2: Norm[], compareFunc): boolean {
    //     return items2.some(item_ => compareFunc(item_, item));
    // }

    protected _isSameArray(items1: DataBase[], items2: DataBase[]): boolean {
        return items1.every(item => this._isInArray(item, items2));
    }

    protected _isInArray(item: DataBase, items2: DataBase[]): boolean {
        return items2.some(item_ => this._isSameItem(item_, item));
    }

    protected _isSameItem(item1: DataBase, item2: DataBase): boolean {
        return item1.id === item2.id;
    }
}
