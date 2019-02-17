import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { NegotiationPhrases, NegotiationPhrase } from '../../models/negotiation-phrases.model';
import { Negotiation } from '../../models/negotiation.model';
import { ScenarioFactoryService } from '../../factories/scenario-factory.service';
import { isNull, isNullOrUndefined } from 'util';
import { Bid } from '../../models/bid.model';
import { Roles } from '../../models/roles.enum';

import { DirectedGraph } from '../../models/graph.model';
import { NormExtension } from '../../models/strategies/bid-generation/norm-extension';
import { ActorRevision } from '../../models/strategies/bid-generation/actor-revision';
import { PredicateRevision } from '../../models/strategies/bid-generation/predicate-revision';
import { Value } from '../../models/value.model';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { NormRevision } from '../../models/strategies/bid-generation/norm-revision';
import { FirebaseData } from '../../models/data';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';

@Component({
    selector: 'negotiation-view',
    templateUrl: './negotiation-view.component.html',
    styleUrls: ['./negotiation-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationViewComponent implements OnInit, OnDestroy, AfterViewInit {
    chat: any;
    negotiation: Negotiation;
    negotiationPhrases = NegotiationPhrases;
    negotiationPhrase: NegotiationPhrase;

    simulator: User;
    hospital: User;

    replyInput: any;
    selectedChat: any;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;
    private bids: Bid[] = [];
    private _roles: FirebaseData[] = [];
    private _conditions: FirebaseData[];
    private lastAgentBid: Bid[] = null;
    graph: DirectedGraph;

    private visitedList = {};

    /**
     * Constructor
     *
     * @param {NegotiationService} _chatService
     */
    constructor(
        private _chatService: NegotiationService,
        private scenarioFactory: ScenarioFactoryService,
        private afs: AngularFirestore,
        private normFactoryService: NormFactoryService,
    ) {
        const user = new User('3', 'Furkan', null, Roles.POLICE);
        this.hospital = new User('2', 'Hospital Administration', 'assets/images/avatars/Josefina.jpg', Roles.HOSPITAL);
        this.simulator = new User('1', 'Simulator', 'assets/images/avatars/simulator.png');

        this.negotiation = new Negotiation('111', user, this.hospital);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.graph = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.readyToReply();

        this.negotiationPhrase = new NegotiationPhrase();

        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.WELCOME, this.onWelcome, this);
        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.SCENARIO_SELECTION, this.onScenarioSelection, this);
        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.ROLE_SELECTION, this.onRoleSelection, this);
        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.AGENTS_TURN, this.onAgentTurn, this);
        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.PREFERENCE_SELECTION, this.onPreferenceSelection, this);

        this.afs.collection<Value>('values').valueChanges().subscribe((values: Value[]) => {
            values.forEach(value => {
                switch (value.name) {
                    case 'Privacy': value.weight = 0.6; break;
                    // case 'Security': 
                    // case 'Safety': value.weight = 0.2; break;
                    default: value.weight = 0.2;
                }
            });

            this.negotiation.agent.preferences = values;
        });

        this.afs.collection<Bid>('bids').valueChanges().subscribe(bids_ => {
            this.bids = bids_.map(bid => new Bid(bid.id, bid.offeredBy, bid.offeredTo, bid.consistOf, bid.demotes, bid.promotes, bid.cdate));
        });

        this.afs.collection<FirebaseData>('roles-v2').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this._roles = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data());
        });

        this.afs.collection<FirebaseData>('conditions').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this._conditions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data());
        });
    }

    /**
     * Create Automated Message
     */
    createMessage(message, isBid?): void {
        // Message
        const newMessage = new Message(this.hospital.id, message, isBid);

        // Add the message to the chat
        this.negotiation.dialogs.push(newMessage);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();

        this.negotiationPhrase.changePhrase(NegotiationPhrases.WELCOME);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean {
        return (
            message.who === this.simulator.id &&
            ((this.negotiation.dialogs[i + 1] && this.negotiation.dialogs[i + 1].who !== this.simulator.id) || !this.negotiation.dialogs[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean {
        return (i === 0 || this.negotiation.dialogs[i - 1] && this.negotiation.dialogs[i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean {
        return (i === this.negotiation.dialogs.length - 1 || this.negotiation.dialogs[i + 1] && this.negotiation.dialogs[i + 1].who !== message.who);
    }

    /**
     * Select contact
     */
    selectContact(): void {
        this._chatService.selectContact(this.simulator);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void {
        setTimeout(() => {
            // this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void {
        speed = speed || 400;
        if (this.directiveScroll) {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * Reply
     */
    reply(event): void {
        event.preventDefault();

        if (!this.replyForm.form.value.message) {
            return;
        }

        // Message
        const message = new Message(this.negotiation.user.id, this.replyForm.form.value.message);

        // Add the message to the chat
        this.negotiation.dialogs.push(message);

        switch (this.negotiationPhrase.phrase.currentState) {
            case NegotiationPhrases.SCENARIO_SELECTION: {
                this.setScenario(this.replyForm.form.value.message); break;
            }
            case NegotiationPhrases.ROLE_SELECTION: {
                this.setRole(this.replyForm.form.value.message); break;
            }
        }

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        // this._chatService.updateDialog(this.selectedChat.chatId, this.negotiation.dialogs).then(response => {
        this.readyToReply();
        // });
    }

    onAccept(event): void {
        event.preventDefault();

        // Message
        const newMessage = new Message(this.negotiation.user.id, 'I accept your offer');

        // Add the message to the chat
        this.negotiation.dialogs.push(newMessage);
    }

    onReject(event): void {
        event.preventDefault();

        this.negotiationPhrase.changePhrase(NegotiationPhrases.USER_TURN);
    }

    private setScenario(selectedScenario: string): void {
        const scenario = this.scenarioFactory.getScenario(selectedScenario);
        if (!isNull(scenario)) {
            this.negotiation.scenario = scenario;

            this.createMessage(`${selectedScenario} is good choice sir/madam`);
            this.negotiationPhrase.changePhrase(NegotiationPhrases.ROLE_SELECTION);

        } else {
            this.createMessage('I think you selected wrong scenario, you may try once again.');
            this.readyToReply();
        }
    }

    private setRole(selectedRole: string): void {
        const role = +selectedRole;
        if ([1, 2].indexOf(role) > -1) {
            if (role === 1) {
                this.negotiation.user.role = this.negotiation.scenario.role1;
                this.negotiation.agent = new User('2', this.negotiation.scenario.role2, null, this.negotiation.scenario.role2);
            } else {
                this.negotiation.user.role = this.negotiation.scenario.role2;
                this.negotiation.agent = new User('2', this.negotiation.scenario.role1, null, this.negotiation.scenario.role1);
            }

            this.createMessage(`You selected ${this.negotiation.user.role} role`);
            this.negotiationPhrase.changePhrase(NegotiationPhrases.USER_TURN);
        }
    }

    private onWelcome(scope): void {
        scope.createMessage('Hi!');
        scope.createMessage('Welcome to our Negotiation Simulation!');
        scope.createMessage('I am the Simulator');
        scope.createMessage('I will guide you during simulation.');

        // scope.negotiationPhrase.changePhrase(NegotiationPhrases.SCENARIO_SELECTION);
        scope.negotiationPhrase.changePhrase(NegotiationPhrases.USER_TURN);
    }

    private onScenarioSelection(scope): void {
        scope.createMessage('There are three available scenario in our simulation. Type between 1-3 to choice scenario.');
    }

    private onRoleSelection(scope): void {
        scope.createMessage('In this scenario you can choice two different roles.');
        scope.createMessage(`First role is ${scope.negotiation.scenario.role1} and other role is ${scope.negotiation.scenario.role2}.`);
        scope.createMessage('Please choice your role by typing 1 or 2');
    }

    private onPreferenceSelection(scope): void {
        scope.createMessage('Please select preferences of values:');
    }

    private onAgentTurn(scope): void {
        if (isNull(scope.lastAgentBid)) {
            console.log(scope.bids);
            const user_bid = scope.negotiation.bids[scope.negotiation.bids.length - 1];
            scope.graph = new DirectedGraph();

            scope._createOutcomeSpace(user_bid, scope);

            console.log(scope.graph.leaves);

            const nextNorms = scope.graph.leaves.sort((a, b) => b.utility - a.utility)[0];
            scope._offerABid(nextNorms, scope, user_bid);
        } else {
            const inEdges = scope.graph.getInEdges(scope.lastAgentBid.consistOf[0]);
            let nextNorms = scope.lastAgentBid.consistOf[0];

            if (!isNullOrUndefined(inEdges) && inEdges.length > 0) {
                nextNorms = inEdges.sort((a, b) => b.data.utility - a.data.utility)[0];
            }

            scope._offerABid(nextNorms.data, scope, scope.lastAgentBid);
        }
    }

    private _createOutcomeSpace(root_bid: Bid, scope): void {
        console.log('Root-bid:', root_bid.consistOf);

        new ActorRevision(this._roles, this.normFactoryService).improveBid(root_bid.consistOf, scope.graph, this.negotiation.agent.preferences);
        new PredicateRevision(this._conditions, this.normFactoryService).improveBid(root_bid.consistOf, scope.graph, this.negotiation.agent.preferences);
        new NormRevision(this.normFactoryService).improveBid(root_bid.consistOf, scope.graph, this.negotiation.agent.preferences);

        const targets = scope.graph.getOutEdges(root_bid.consistOf[0]);

        console.log('targets', targets);
        console.log('*********');

        if (!isNullOrUndefined(targets) && targets.length > 0) {
            targets.forEach(target => {
                if (!this.visitedList[target.data.id]) {
                    this.visitedList[target.data.id] = true;
                    root_bid.consistOf = [target.data];
                    this._createOutcomeSpace(root_bid, scope);
                } else {
                    console.log('already visited: ', target.data);
                }
            });
        }
    }

    private _offerABid(norm: Norm, scope, bid: Bid): void {
        bid.consistOf = [norm];
        scope.lastAgentBid = bid;

        for (const norm_ of bid.consistOf) {
            scope.createMessage(norm_.toString(), true);
        }

        scope.negotiation.bids.push(bid);
        scope.negotiationPhrase.changePhrase(NegotiationPhrases.CONTINUE_OR_EXIT);
    }
}
