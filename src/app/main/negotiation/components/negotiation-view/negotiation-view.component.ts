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
import { isNull } from 'util';
import { Bid } from '../../models/bid.model';
import { Roles } from '../../models/roles.enum';
import { Authorization } from '../../models/norm/authorization.model';
import { DirectedGraph } from '../../models/graph.model';
import { NormExtension } from '../../models/strategies/bid-generation/norm-extension';
import { Commitment } from '../../models/norm/commitment.model';
import { ActorRevision } from '../../models/strategies/bid-generation/actor-revision';
import { PredicateRevision } from '../../models/strategies/bid-generation/predicate-revision';

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
    // private _phrase: NegotiationPhrases;

    /**
     * Constructor
     *
     * @param {NegotiationService} _chatService
     */
    constructor(
        private _chatService: NegotiationService,
        private scenarioFactory: ScenarioFactoryService
    ) {
        this.negotiation = new Negotiation('111', new User('2', 'Furkan', null, Roles.POLICE));
        this.simulator = new User('1', 'Simulator', 'assets/images/avatars/simulator.png');

        this.negotiation.agent = new User('2', 'Hospital Administration', null, Roles.HOSPITAL);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
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

        this.test();
    }

    test(): void {
        const aa = new PredicateRevision();
        const bb = [

            new Bid(
                this.negotiation.user,
                this.simulator,
                [
                    new Authorization({ id: '2', name: 'Police' }, 'Hospital', [{ id: '1', name: 'aa' }, { id: '2', name: 'aa' }], ['access_patient_data', 'share_patient_data']),
                ]),
            new Bid(
                this.negotiation.user,
                this.simulator,
                [
                    new Authorization({ id: '2', name: 'Police' }, 'Hospital', [{ id: '1', name: 'aa' }], ['access_patient_data', 'share_patient_data']),
                ]),
            new Bid(
                this.negotiation.user,
                this.simulator,
                [
                    new Authorization({ id: '1', name: 'Police' }, 'Hospital', [{ id: '1', name: 'aa' }], ['access_patient_data']),
                    new Commitment({ id: '1', name: 'Police' }, 'Hospital', [{ id: '1', name: 'aa' }], ['access_patient_data']),
                ]),
            // new Bid(
            //     this.negotiation.user,
            //     this.simulator,
            //     [
            //         new Authorization('Police', 'Hospital', 'consent', 'access_patient_data'),
            //         new Authorization('Police', 'Hospital', 'national_security', 'access_patient_data')
            //     ]),
            // new Bid(
            //     this.negotiation.user,
            //     this.simulator,
            //     [
            //         new Authorization('Police', 'Hospital', 'ahmet', 'access_patient_data'),
            //         new Authorization('Police', 'Hospital', 'national_security', 'access_patient_data')
            //     ]),
        ];

        const initial_bid = new Bid(
            this.negotiation.user,
            this.simulator,
            [
                new Authorization({ id: '2', name: 'Police' }, 'Hospital', [{ id: '1', name: 'aa' }], ['access_patient_data']),
            ]);

        const cc = aa.getBidOptions(bb, initial_bid);

        console.log(cc);

        // const graph = new DirectedGraph<Bid>();

        // cc.forEach(bid_ => {
        //     graph.addEdge(initial_bid, bid_);
        // });

        // console.log(cc);
        // console.log(graph.getAdjacencyToNode(initial_bid));
    }

    /**
     * Create Automated Message
     */
    createAutomatedMessage(message): void {
        // Message
        const newMessage = new Message(this.simulator.id, message);

        // Add the message to the chat
        this.negotiation.dialogs.push(newMessage);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.replyInput = this.replyInputField.first.nativeElement;
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
            this.focusReplyInput();
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

    private setScenario(selectedScenario: string): void {
        const scenario = this.scenarioFactory.getScenario(selectedScenario);
        if (!isNull(scenario)) {
            this.negotiation.scenario = scenario;

            this.createAutomatedMessage(`${selectedScenario} is good choice sir/madam`);
            this.negotiationPhrase.changePhrase(NegotiationPhrases.ROLE_SELECTION);

        } else {
            this.createAutomatedMessage('I think you selected wrong scenario, you may try once again.');
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

            this.createAutomatedMessage(`You selected ${this.negotiation.user.role} role`);
            this.negotiationPhrase.changePhrase(NegotiationPhrases.FIRST_OFFER);
        }
    }

    private onWelcome(scope): void {
        scope.createAutomatedMessage('Hi!');
        scope.createAutomatedMessage('Welcome to our Negotiation Simulation!');
        scope.createAutomatedMessage('I am the Simulator');
        scope.createAutomatedMessage('I will guide you during simulation.');

        // scope.negotiationPhrase.changePhrase(NegotiationPhrases.SCENARIO_SELECTION);
        scope.negotiationPhrase.changePhrase(NegotiationPhrases.FIRST_OFFER);
    }

    private onScenarioSelection(scope): void {
        scope.createAutomatedMessage('There are three available scenario in our simulation. Type between 1-3 to choice scenario.');
    }

    private onRoleSelection(scope): void {
        scope.createAutomatedMessage('In this scenario you can choice two different roles.');
        scope.createAutomatedMessage(`First role is ${scope.negotiation.scenario.role1} and other role is ${scope.negotiation.scenario.role2}.`);
        scope.createAutomatedMessage('Please choice your role by typing 1 or 2');
    }

    private onPreferenceSelection(scope): void {
        scope.createAutomatedMessage('Please select preferences of values:');
    }

    private onAgentTurn(scope): void {
        // scope.negotiationPhrase.changePhrase(NegotiationPhrases.SELECT_DEMOTES_AND_PROMOTES);
    }
}
