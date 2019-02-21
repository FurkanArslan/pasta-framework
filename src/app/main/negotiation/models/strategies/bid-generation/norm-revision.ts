import { BidGeneration } from './bid-generation';
import { Bid } from '../../bid.model';
import { Norm } from '../../norm/norm.model';
import { DirectedGraph } from '../../graph.model';
import { Value } from '../../value.model';
import { isNullOrUndefined } from 'util';
import { NormTypes } from '../../norm/norm-types.enum';
import { NormFactoryService } from 'app/main/negotiation/factories/norm-factory.service';

export class NormRevision extends BidGeneration {

    constructor(public normFactoryService: NormFactoryService) {
        super();
    }

    public improveBid(norms: Norm[], graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        norms.forEach(norm => {
            this._improveNorm(norm, graph, preferencesOfAgent);

            // this._addToGraph(norm, improvingNorm, graph, preferencesOfAgent);
        });
    }

    private _improveNorm(norm: Norm, graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        // const isPromotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.promotes) && consequent.promotes.length > 0);
        // const isDemotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.demotes) && consequent.demotes.length > 0);

        const isPromotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.promotes) && consequent.promotes.includes('8GO8n36e03YsGJVgyWMw'));
        const isDemotes = norm.hasConsequent.some(consequent => !isNullOrUndefined(consequent.demotes) && consequent.demotes.includes('8GO8n36e03YsGJVgyWMw'));

        if (isPromotes && norm.normType === NormTypes.PRO) {
            const newNorm = this.normFactoryService.getOrCreateNorm(NormTypes.AUTH, norm.hasSubject, norm.hasObject, norm.hasAntecedent, norm.hasConsequent);

            const weight = newNorm.hasConsequent.reduce((accumulator, cons) => {
                return accumulator
                    + cons.promotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                    + cons.demotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
            }, 0);

            graph.addEdge(norm, newNorm, +weight.toFixed(2), `NR(${weight.toFixed(2)})`);
        }

        if (isDemotes && norm.normType === NormTypes.AUTH) {
            const newNorm = this.normFactoryService.getOrCreateNorm(NormTypes.PRO, norm.hasSubject, norm.hasObject, norm.hasAntecedent, norm.hasConsequent);

            const weight = newNorm.hasConsequent.reduce((accumulator, cons) => {
                return accumulator
                    + cons.promotes.reduce((accumulator_, preferenceId) => accumulator_ - this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0)
                    + cons.demotes.reduce((accumulator_, preferenceId) => accumulator_ + this._findPreferenceWeight(preferenceId, preferencesOfAgent), 0);
            }, 0);

            graph.addEdge(norm, newNorm, +weight.toFixed(2), `NR(${weight.toFixed(2)})`);
        }
    }

    private _findPreferenceWeight(preferenceId, preferencesOfAgent: Value[]): number {
        const preference = preferencesOfAgent.find(pref => pref.id === preferenceId);

        return !isNullOrUndefined(preference) ? preference.weight : 0;
    }

    private _addToGraph(root_norm: Norm, norm: Norm, graph: DirectedGraph, preferencesOfAgent: Value[]): void {
        const findPreferenceWeight = (preferenceId): number => {
            const preference = preferencesOfAgent.find(pref => pref.id === preferenceId);

            return !isNullOrUndefined(preference) ? preference.weight : 0;
        };

        const weight = norm.hasConsequent.reduce((accumulator, cons) => {
            return accumulator
                + cons.promotes.reduce((accumulator_, preferenceId) => this._getPromotesWeight(norm.normType, accumulator_, findPreferenceWeight(preferenceId)), 0)
                + cons.demotes.reduce((accumulator_, preferenceId) => this._getDemotesWeight(norm.normType, accumulator_, findPreferenceWeight(preferenceId)), 0);
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

    public getBidOptions(availableBids: Bid[], bid: Bid): Bid[] {
        return availableBids
            .filter(bid_ => bid_.consistOf.length === bid.consistOf.length) // filter by norms count
            .filter(bid_ => !this._includes(bid.consistOf, bid_.consistOf)) // filter by similarity
            .filter(bid_ => {                                               // filter by norm difference & norm type
                const diff1 = this._differenceNorms(bid_.consistOf, bid.consistOf);
                const diff2 = this._differenceNorms(bid.consistOf, bid_.consistOf);

                return (diff1.length === 1 && diff2.length === 1 && diff1[0].normType !== diff2[0].normType);
            });
    }
}
