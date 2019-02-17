import { Bid } from '../../bid.model';
import { BidGeneration } from './bid-generation';
import { Norm } from '../../norm/norm.model';
import { FirebaseData } from '../../data';
import { Consequent } from '../../consequent.model';
import { NormFactoryService } from 'app/main/negotiation/factories/norm-factory.service';
import { DirectedGraph } from '../../graph.model';
import { Value } from '../../value.model';
import { isNullOrUndefined } from 'util';
import { NormTypes } from '../../norm/norm-types.enum';

export class PredicateRevision extends BidGeneration {

    private _conditions: FirebaseData[];

    constructor(conditions: FirebaseData[], public normFactoryService: NormFactoryService) {
        super();

        this._conditions = conditions;
    }

    public improveBid(norms: Norm[], graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        norms.forEach(norm => {
            this._improveNorm(norm, graph, preferencesOfAgent);

            // improvingNorms.forEach(norm_ => {
            //     this._addToGraph(norm, norm_, graph, preferencesOfAgent);
            // });
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
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `PR(${weight.toFixed(2)})`);
                });

            }
            else if (norm.normType === NormTypes.PRO) {
                this._getMoreGeneralNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `PR(${weight.toFixed(2)})`);
                });
            }
        }

        if (isDemotes) {
            if (norm.normType === NormTypes.AUTH) {
                this._getMoreGeneralNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `PR(${weight.toFixed(2)})`);
                });
            }
            else if (norm.normType === NormTypes.PRO) {
                this._getMoreExclusiveNorms(norm).forEach(norm_ => {
                    const weight = norm.hasConsequent.reduce((accumulator, cons) => {
                        return accumulator
                            + cons.action.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                            + cons.action.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
                    }, 0);

                    graph.addEdge(norm, norm_, +weight.toFixed(2), `PR(${weight.toFixed(2)})`);
                });

            }
        }

        this._getEqualNorms(norm).forEach(norm_ => {
            graph.addEdge(norm, norm_, 0, `PR(0)`);
        });
    }

    private _getEqualNorms(norm: Norm): Norm[] {
        let possibleNorms: Norm[] = [];

        norm.hasAntecedent.forEach((oldAntecedent, index) => {
            const improvements = this._getPossibleIds(oldAntecedent.equal)
                .map(id => this._getAntecedent(id))
                .map(newAntecedent => this.normFactoryService.getOrCreateNorm(
                    norm.normType,
                    norm.hasSubject,
                    norm.hasObject,
                    norm.hasAntecedent.map((value, i) => index === i ? newAntecedent : value),
                    norm.hasConsequent)
                );

            possibleNorms = possibleNorms.concat(improvements);
        });

        return possibleNorms;
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

        graph.addEdge(root_norm, norm, weight);
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


    private _getMoreGeneralNorms(root_norm: Norm): Norm[] {
        let possibleNorms: Norm[] = [];

        root_norm.hasAntecedent.forEach((oldAntecedent, index) => {
            const improvements = this._getPossibleIds(oldAntecedent.exclusive)
                .map(id => this._getAntecedent(id))
                .map(newAntecedent => this.normFactoryService.getOrCreateNorm(
                    root_norm.normType,
                    root_norm.hasSubject,
                    root_norm.hasObject,
                    root_norm.hasAntecedent.map((value, i) => index === i ? newAntecedent : value),
                    root_norm.hasConsequent)
                );

            possibleNorms = possibleNorms.concat(improvements);
        });

        if (root_norm.hasAntecedent.length >= 2) {
            for (let index = 0; index < root_norm.hasAntecedent.length; index++) {
                const tempNorm = this.normFactoryService.getOrCreateNorm(
                    root_norm.normType,
                    root_norm.hasSubject,
                    root_norm.hasObject,
                    root_norm.hasAntecedent.splice(index, 1),
                    root_norm.hasConsequent);

                possibleNorms.push(tempNorm);
            }
        }

        return possibleNorms;
    }

    private _getMoreExclusiveNorms(root_norm: Norm): Norm[] {
        let possibleNorms: Norm[] = [];

        root_norm.hasAntecedent.forEach((oldAntecedent, index) => {
            const improvements = this._getPossibleIds(oldAntecedent.moreGeneral)
                .map(id => this._getAntecedent(id))
                .map(newAntecedent => this.normFactoryService.getOrCreateNorm(
                    root_norm.normType,
                    root_norm.hasSubject,
                    root_norm.hasObject,
                    root_norm.hasAntecedent.map((value, i) => index === i ? newAntecedent : value),
                    root_norm.hasConsequent)
                );

            possibleNorms = possibleNorms.concat(improvements);
        });

        this._conditions.forEach(condition => {
            if (!this._isIncludeAntecedent(condition, root_norm.hasAntecedent)) {
                possibleNorms.push(
                    this.normFactoryService.getOrCreateNorm(
                        root_norm.normType,
                        root_norm.hasSubject,
                        root_norm.hasObject,
                        root_norm.hasAntecedent.concat(condition),
                        root_norm.hasConsequent)
                );
            }
        });

        return possibleNorms;
    }

    private _checkAncestor = (candidate: FirebaseData, antecedent: FirebaseData): boolean => {
        const ancestors = !isNullOrUndefined(antecedent.exclusive) ? antecedent.exclusive.map(antecedent_ => this._getAntecedent(antecedent_)) : [];

        for (const ancestor of ancestors) {
            if (ancestor.id === candidate.id) {
                return true;
            } else if (!isNullOrUndefined(ancestor.exclusive) && ancestor.exclusive.length > 0) {
                return this._checkAncestor(candidate, ancestor);
            }
        }

        return false;
    }

    private _isIncludeAntecedent(candidate: FirebaseData, antecedents: FirebaseData[]): boolean {
        return antecedents.some(antecedent => {
            return candidate.id === antecedent.id || this._checkAncestor(candidate, antecedent) || this._checkAncestor(antecedent, candidate);
        });
    }

    private _isComprise(candidate: FirebaseData, antecedents: FirebaseData[]): boolean {
        const checkAncestor = (antecedent: FirebaseData): boolean => {
            const ancestors = !isNullOrUndefined(antecedent.exclusive) ? antecedent.exclusive.map(antecedent_ => this._getAntecedent(antecedent_)) : [];

            for (const ancestor of ancestors) {
                if (ancestor.id === candidate.id) {
                    return true;
                } else if (!isNullOrUndefined(ancestor.exclusive) && ancestor.exclusive.length > 0) {
                    return checkAncestor(ancestor);
                }
            }

            return false;
        };

        for (const antecedent of antecedents) {
            const checkIsComprise = checkAncestor(antecedent);

            if (checkIsComprise) {
                return true;
            }
        }

        return false;
    }

    private _getAntecedent(antecedent_id: string): FirebaseData {
        return this._conditions.find(condition => condition.id === antecedent_id);
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

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        const filteredBids = availableBids.filter(bid_ => bid_.consistOf.length === bid.consistOf.length); // filter by norms count

        const optionsByAntecedentRevision = filteredBids
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptAntecedent, this)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then antecedent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    const diffAntecedent1 = this._differenceAntecedent(diff1[0].hasAntecedent, diff2[0].hasAntecedent);
                    const diffAntecedent2 = this._differenceAntecedent(diff2[0].hasAntecedent, diff1[0].hasAntecedent);

                    return diffAntecedent1.length < 2 && diffAntecedent2.length < 2;
                }

                return false;
            });

        const optionsByConsequentRevision = filteredBids
            .filter(bid_ => bid_.consistOf.some(norm => this._isInNorm(norm, bid.consistOf, this._isSameNormExceptConsequent, this)))  // filter by similarity
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by first norm difference & norm type then consequent difference
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                if (diff1.length === 1 && diff2.length === 1 && diff1[0].normType === diff2[0].normType) {
                    const diffConsequent1 = this._differenceConsequent(diff1[0].hasConsequent, diff2[0].hasConsequent);
                    const diffConsequent2 = this._differenceConsequent(diff2[0].hasConsequent, diff1[0].hasConsequent);

                    return diffConsequent1.length < 2 && diffConsequent2.length < 2;
                }

                return false;
            });

        return optionsByAntecedentRevision.concat(optionsByConsequentRevision);
    }

    private _isInNorm(item: Norm, items2: Norm[], compareFunc, scope): boolean {
        return items2.some(item_ => compareFunc(item_, item, scope));
    }

    private _isSameNormExceptAntecedent(norm: Norm, norm1: Norm, scope): boolean {
        return scope._isSameConsequent(norm.hasConsequent, norm1.hasConsequent) &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }

    private _isSameNormExceptConsequent(norm: Norm, norm1: Norm, scope): boolean {
        return scope._isSameArray(norm.hasAntecedent, norm1.hasAntecedent) &&
            scope._isSameItem(norm.hasSubject, norm1.hasSubject) &&
            norm.hasObject === norm1.hasObject &&
            norm.normType === norm1.normType;
    }

    private _differenceAntecedent(antecedents1: FirebaseData[], antecedents2: FirebaseData[]): FirebaseData[] {
        return antecedents1.filter(antecedent1 => !this._isInArray(antecedent1, antecedents2));
    }

    private _differenceConsequent(consequents1: Consequent[], consequents2: Consequent[]): Consequent[] {
        return consequents1.filter(consequent1 => !consequents2.includes(consequent1));
    }
}
