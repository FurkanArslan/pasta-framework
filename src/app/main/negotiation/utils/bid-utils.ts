import { Norm } from '../models/norm/norm.model';
import { DataBase } from '../models/data';
import { Consequent } from '../models/consequent.model';

export class BidUtils {

    public static isSameNorm(norm1: Norm, norm2: Norm): boolean {
        return norm1.normType === norm2.normType &&
            norm1.hasObject === norm2.hasObject &&
            this.isSameItem(norm1.hasSubject, norm2.hasSubject) &&
            this.isSameArray(norm1.hasAntecedent, norm2.hasAntecedent) &&
            this.isSameConsequent(norm1.hasConsequent, norm2.hasConsequent);
    }

    public static isSameArray(items1: DataBase[], items2: DataBase[]): boolean {
        return items1.every(item => this.isInArray(item, items2)) &&
            items2.every(item => this.isInArray(item, items1));
    }

    public static isInArray(item: DataBase, items2: DataBase[]): boolean {
        return items2.some(item_ => this.isSameItem(item_, item));
    }

    public static isSameItem(item1: DataBase, item2: DataBase): boolean {
        return item1.id === item2.id;
    }

    public static isSameConsequent(consequentList1: Consequent[], consequentList2: Consequent[]): boolean {
        return consequentList1.every(item => consequentList2.some(item_ => this.isSameItem(item_.data, item.data) && this.isSameItem(item_.action, item.action))) &&
            consequentList2.every(item => consequentList1.some(item_ => this.isSameItem(item_.data, item.data) && this.isSameItem(item_.action, item.action)));
    }
}
