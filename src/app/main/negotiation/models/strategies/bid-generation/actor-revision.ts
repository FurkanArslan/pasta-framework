import { Bid } from '../../bid.model';
import { BidGeneration } from './bid-generation';
import { Norm } from '../../norm/norm.model';
import { NormTypes } from '../../norm/norm-types.enum';
import { FirebaseData } from '../../data';
import { NormFactoryService } from 'app/main/negotiation/factories/norm-factory.service';
import { isNullOrUndefined } from 'util';
import { DirectedGraph } from '../../graph.model';
import { Value } from '../../value.model';

export class ActorRevision extends BidGeneration {
    private _roles: FirebaseData[];

    constructor(roles: FirebaseData[], public normFactoryService: NormFactoryService) {
        super();

        this._roles = roles;
    }

    public improveBid(norms: Norm[], graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        norms.forEach(norm => {
            this._improveNorm(norm, graph, preferencesOfAgent);
        });
    }

    private _improveNorm(norm: Norm, graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        const isPromotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.action.promotes) && consequent.action.promotes.length > 0);
        const isDemotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.action.demotes) && consequent.action.demotes.length > 0);

        if (isPromotes) {
            if (norm.normType === NormTypes.AUTH) {
                this._getMoreExclusiveNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `AR(${weight.toFixed(2)})`);
                });
            }
            else if (norm.normType === NormTypes.PRO) {
                this._getMoreGeneralNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `AR(${weight.toFixed(2)})`);
                });
            }
        }

        if (isDemotes) {
            if (norm.normType === NormTypes.AUTH) {
                this._getMoreGeneralNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `AR(${weight.toFixed(2)})`);
                });
            }
            else if (norm.normType === NormTypes.PRO) {

                this._getMoreExclusiveNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `AR(${weight.toFixed(2)})`);
                });
            }
        }

        this._getEqualNorms(norm).forEach(norm_ => {
            graph.addEdge(norm, norm_, 0, `AR(0)`);
        });
    }

    private _findPreferenceWeight(preferenceId, preferencesOfAgent): number {
        const preference = preferencesOfAgent.find(pref => pref.id === preferenceId);

        return !isNullOrUndefined(preference) ? preference.weight : 0;
    };

    private _addToGraph(root_norm: Norm, norm: Norm, graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        const findPreferenceWeight = (preferenceId): number => {
            const preference = preferencesOfAgent.find(pref => pref.id === preferenceId);

            return !isNullOrUndefined(preference) ? preference.weight : 0;
        };

        const weight = norm.hasConsequent.reduce((accumulator, cons) => {
            return accumulator
                + cons.action.promotes.reduce((accumulator_, preferenceId) => this._getPromotesWeight(norm.normType, accumulator_, findPreferenceWeight(preferenceId)), 0)
                + cons.action.demotes.reduce((accumulator_, preferenceId) => this._getDemotesWeight(norm.normType, accumulator_, findPreferenceWeight(preferenceId)), 0);
        }, 0);

        graph.addEdge(root_norm, norm, weight, `ar-${weight}`);
    }

    private _getPromotesWeight(normType: NormTypes, total: number, preferenceValue: number): number {
        switch (normType) {
            case NormTypes.AUTH: return total + preferenceValue;
            case NormTypes.PRO: return total - preferenceValue;
        }
    }

    private _getDemotesWeight(normType: NormTypes, total: number, preferenceValue: number): number {
        switch (normType) {
            case NormTypes.AUTH: return total - preferenceValue;
            case NormTypes.PRO: return total + preferenceValue;
        }
    }

    private _getMoreGeneralNorms(norm: Norm): Norm[] {
        const possibleNormIds = this._getPossibleIds(norm.hasSubject.moreGeneral);

        return possibleNormIds
            .map(id => this._getRole(id))
            .map(role => this.normFactoryService.getOrCreateNorm(norm.normType, role, norm.hasObject, norm.hasAntecedent, norm.hasConsequent));
    }

    private _getMoreExclusiveNorms(norm: Norm): Norm[] {
        const possibleNormIds = this._getPossibleIds(norm.hasSubject.exclusive);

        return possibleNormIds
            .map(id => this._getRole(id))
            .map(role => this.normFactoryService.getOrCreateNorm(norm.normType, role, norm.hasObject, norm.hasAntecedent, norm.hasConsequent));
    }

    private _getEqualNorms(norm: Norm): Norm[] {

        try {
            return norm.hasSubject.equal
                .map(id => this._getRole(id))
                .map(role => this.normFactoryService.getOrCreateNorm(norm.normType, role, norm.hasObject, norm.hasAntecedent, norm.hasConsequent));
        } catch (error) {
            return [];
        }

    }

    private _getRole(role_id: string): FirebaseData {
        return this._roles.find(role => role.id === role_id);
    }

    private _getPossibleIds(array1: string[], array2?: string[]): string[] {
        if (!isNullOrUndefined(array1) && !isNullOrUndefined(array2)) {
            return array1.concat(array2);
        } else if (!isNullOrUndefined(array1)) {
            return array1;
        } else if (!isNullOrUndefined(array2)) {
            return array2;
        } else {
            return [];
        }
    }

    // public getImprovingStep(bid: Bid): Bid[] {
    //     const improvingSteps = [];

    //     bid.consistOf.forEach(norm => {
    //         improvingSteps.push(this._improveWithNorm(bid, norm));
    //     });

    //     return improvingSteps;
    // }

    // private _improveWithNorm(bid: Bid, norm: Norm): Bid[] {
    //     const possibleBids = [];
    //     const index = bid.consistOf.findIndex(norm_ => norm_.id === norm.id);

    //     const moreGeneralRoles = this._roles.filter(role => !isNullOrUndefined(role.moreGeneral) && role.moreGeneral.some(role_ => role_ === norm.hasSubject.id));
    //     const moreExclusiveRoles = norm.hasSubject.moreGeneral || [];

    //     moreGeneralRoles.forEach(role => {
    //         // const bidWithoutThisNorm = this._getBidWithoutTheNorm(bid, norm);
    //         const improvedNorm = this.normFactoryService.getNorm(norm.normType, role, norm.hasObject, norm.hasAntecedent, norm.hasConsequent);

    //         // this._addToTheList(bidWithoutThisNorm.consistOf, improvedNorm);

    //         possibleBids.push(bid.consistOf.splice(index, 1, improvedNorm));
    //     });

    //     moreExclusiveRoles.forEach(role => {
    //         const roleModel = this._roles.find(role_ => role_.id === role);
    //         // const bidWithoutThisNorm = this._getBidWithoutTheNorm(bid, norm);

    //         const improvedNorm = this.normFactoryService.getNorm(norm.normType, roleModel, norm.hasObject, norm.hasAntecedent, norm.hasConsequent);

    //         // this._addToTheList(bidWithoutThisNorm.consistOf, improvedNorm);

    //         possibleBids.push(bid.consistOf.splice(index, 1, improvedNorm));
    //     });

    //     return possibleBids;
    // }

    // private _addToTheList(norms: Norm[], norm): void {
    //     if (norms.some(norm_ => norm_.id === norm.id)) {
    //         return;
    //     }

    //     norms.push(norm);
    // }

    // private _getBidWithoutTheNorm(bid: Bid, norm: Norm): Bid {
    //     const index = bid.consistOf.findIndex(norm_ => norm_.id === norm.id);

    //     bid.consistOf = bid.consistOf.splice(index);

    //     return bid;
    // }

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {

        return availableBids
            .filter(bid_ => bid_.consistOf.length === bid.consistOf.length) // filter by norms count
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then antecedent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    return !this._isSameItem(diff1[0].hasSubject, diff2[0].hasSubject);
                }

                return false;
            });
    }

    private _isInNorm(item: Norm, items2: Norm[]): boolean {
        return items2.some(item_ => this._isSameNormExceptSubject(item_, item));
    }

    private _isSameNormExceptSubject(norm: Norm, norm1: Norm): boolean {
        return this._isSameConsequent(norm.hasConsequent, norm1.hasConsequent) &&
            this._isSameArray(norm.hasAntecedent, norm1.hasAntecedent) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType &&
            !this._isSameItem(norm.hasSubject, norm1.hasSubject);
    }
}
