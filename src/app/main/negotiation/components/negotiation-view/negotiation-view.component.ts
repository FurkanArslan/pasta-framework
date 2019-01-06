import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, from } from 'rxjs';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { NegotiationPhrases, NegotiationPhrase } from '../../models/negotiation-phrases.model';
import { Negotiation } from '../../models/negotiation.model';
import { ScenarioFactoryService } from '../../factories/scenario-factory.service';
import { isNull } from 'util';
import { PredicateRevision } from '../../models/strategies/bid-generation/predicate-revision';
import { Bid } from '../../models/bid.model';
import { Norm } from '../../models/norm/norm.model';
import { Roles } from '../../models/roles.enum';
import { Authorization } from '../../models/norm/authorization.model';
import { DirectedGraph } from '../../models/graph.model';
import { NormExtension } from '../../models/strategies/bid-generation/norm-extension';
import { Commitment } from '../../models/norm/commitment.model';

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
    private _phrase: NegotiationPhrases;

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
        this.simulator = new User('1', 'Simulator', 'assets/images/avatars/simulator.png', Roles.HOSPITAL);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._phrase = NegotiationPhrases.WELCOME;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this._chatService.onChatSelected
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(chatData => {
        //         if ( chatData )
        //         {
        // this.selectedChat = chatData;
        // this.contact = chatData.contact;
        // this.dialog = chatData.dialog;
        this.readyToReply();
        //         }
        //     });
        this.test();
    }

    test(): void {
        const aa = new NormExtension();
        const bb = [

            new Bid(
                this.negotiation.user,
                this.simulator,
                [
                    new Authorization('Police', 'Hospital', 'aa', 'access_patient_data'),
                    new Authorization('Police', 'Hospital', 'involves', 'access_patient_data'),
                    new Commitment('Police', 'Hospital', 'involves', 'access_patient_data')
                ]),
            new Bid(
                this.negotiation.user,
                this.simulator,
                [
                    new Authorization('Police', 'Hospital', 'aa', 'access_patient_data'),
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
                new Authorization('Police', 'Hospital', 'aa', 'access_patient_data'),
                new Authorization('Police', 'Hospital', 'involves', 'access_patient_data')
            ]);
        const cc = aa.getBidOptions(bb, initial_bid);

        const graph = new DirectedGraph<Bid>();

        cc.forEach(bid_ => {
            graph.addEdge(initial_bid, bid_);
        });

        console.log(cc);
        console.log(graph.getAdjacencyToNode(initial_bid));
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
        this.createAutomatedMessage('Hi!');
        this.createAutomatedMessage('Welcome to our Negotiation Simulation!');
        this.createAutomatedMessage('I am the Simulator');
        this.createAutomatedMessage('I will guide you during simulation.');

        this._phrase = NegotiationPhrases.SCENARIO_SELECTION;
        this.createAutomatedMessage('There are three available scenario in our simulation. Type between 1-3 to choice scenario.');

        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
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

        switch (this._phrase) {
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
            this._phrase = NegotiationPhrases.ROLE_SELECTION;
            this.showOptionsForRoleSelection();

        } else {
            this.createAutomatedMessage('I think you selected wrong scenario, you may try once again.');
            this.readyToReply();
        }
    }

    private showOptionsForRoleSelection(): void {
        this.createAutomatedMessage('In this scenario you can choice two different roles.');
        this.createAutomatedMessage(`First role is ${this.negotiation.scenario.role1} and other role is ${this.negotiation.scenario.role2}.`);
        this.createAutomatedMessage('Please choice your role by typing 1 or 2');
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
            this._phrase = NegotiationPhrases.FIRST_OFFER;
        }
    }
}
