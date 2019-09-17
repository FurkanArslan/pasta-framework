import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, interval } from 'rxjs';

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
import { FirebaseData, ConsequentData, RolesData } from '../../models/data';
import { NormFactoryService } from '../../factories/norm-factory.service';
import { Norm } from '../../models/norm/norm.model';
import { Queue } from '../../models/queue.model';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { takeUntil, map, filter } from 'rxjs/operators';
import { LogService } from '../../logs.service';
import { SimilarityBasedConcession } from '../../models/strategies/bidding-strategies/similarity-based-concession';
import { Bidding } from '../../models/strategies/bidding-strategies/bidding';
import { DepthFirstConcession } from '../../models/strategies/bidding-strategies/depth-first-concession';

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
    user: User;

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

    private lastAgentBid: Bid = null;
    graph: DirectedGraph;

    negotiationEndTime = null;

    countdown: any;
    diff: number;

    private biddingStrategy: Bidding;
    private readonly NEGOTIATION_TIME = 5;

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
        private router: Router,
        private route: ActivatedRoute,
        private _pastaService: LogService
    ) {
        this.user = new User('3', 'Government Agency', null, Roles.POLICE);
        this.hospital = new User('2', 'Hospital Administration', 'assets/images/avatars/Josefina.jpg', Roles.HOSPITAL);
        this.simulator = new User('1', 'Simulator', 'assets/images/avatars/simulator.png');

        this.negotiation = new Negotiation('111', this.user, this.hospital);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.graph = null;

        // Set the defaults
        this.countdown = {
            minutes: '',
            seconds: ''
        };

        moment.locale('tr');

        this.route.params.subscribe(param => {
            if (param.opponent === 'opponent-1') {
                this.biddingStrategy = new DepthFirstConcession(normFactoryService);
            } else if (param.opponent === 'opponent-2') {
                this.biddingStrategy = new SimilarityBasedConcession(normFactoryService);
            }
        });
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
        this.negotiationPhrase.bindPhraseChange(NegotiationPhrases.EXIT, this.onExit, this);

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
            this.biddingStrategy.preferences = values;
        });

        this.afs.collection<RolesData>('roles-v2').get().subscribe((querySnapshot: QuerySnapshot<RolesData>) => {
            this.biddingStrategy.roles = querySnapshot.docs.map((doc: QueryDocumentSnapshot<RolesData>) => doc.data());
        });

        this.afs.collection<FirebaseData>('conditions-v2').get().subscribe((querySnapshot: QuerySnapshot<FirebaseData>) => {
            this.biddingStrategy.conditions = querySnapshot.docs.map((doc: QueryDocumentSnapshot<FirebaseData>) => doc.data());
        });

        this.afs.collection<ConsequentData>('consequents').get().subscribe((querySnapshot: QuerySnapshot<ConsequentData>) => {
            this.biddingStrategy.consequents = querySnapshot.docs.map((doc: QueryDocumentSnapshot<ConsequentData>) => doc.data());
        });

        this._startCountDown();
    }

    private _startCountDown(): void {
        const currDate = moment();
        const eventDate = moment().add(this.NEGOTIATION_TIME, 'minutes');

        try {
            this._pastaService.saveStartDate(currDate.toDate());
        } catch (error) {
            this.router.navigate(['/']);
        }

        this.diff = eventDate.diff(currDate, 'seconds');

        this.countdown = this._secondsToRemaining(this.diff);

        const countDown = interval(1000).pipe(
            filter(() => this.diff > 0),
            map(value => {
                return this.diff = this.diff - 1;
            }),
            map(value => {
                return this._secondsToRemaining(value);
            })
        );

        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(value => {
                this.countdown = value;

                if (this.diff <= 0) {
                    this.onWalkAway();
                }
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
    * Converts given seconds to a remaining time
    *
    * @param seconds
    * @private
    */
    private _secondsToRemaining(seconds): any {
        const timeLeft = moment.duration(seconds, 'seconds');

        return {
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        try {
            this._pastaService.saveEndDate(moment().toDate());
        } catch (error) {

        }

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

        const bid = this.negotiation.bids[this.negotiation.bids.length - 1];
        this._pastaService.saveAgreement(bid, bid.consistOf[0].utility);

        this.negotiationPhrase.changePhrase(NegotiationPhrases.EXIT);
    }

    onReject(event): void {
        event.preventDefault();

        this.negotiationPhrase.changePhrase(NegotiationPhrases.USER_TURN);
    }

    onWalkAway(): void {
        const newMessage = new Message(this.negotiation.user.id, 'I am sorry, but I have to go. See you later...');

        // Add the message to the chat
        this.negotiation.dialogs.push(newMessage);

        this.negotiationPhrase.changePhrase(NegotiationPhrases.EXIT);
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
        scope.createMessage('I am Jane.');
        scope.createMessage('How can I help you?');

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
        scope.readyToReply();
        const opponent_bid = scope.negotiation.bids[scope.negotiation.bids.length - 1];

        if (!scope.biddingStrategy.isGraphGenerated) {
            const newMessage = new Message(scope.hospital.id, 'Let me think my offer.');
            scope.negotiation.dialogs.push(newMessage);
        }

        setTimeout(() => {
            const nextNorm = scope.biddingStrategy.getOffer(opponent_bid, scope.diff);

            scope._offerABid(nextNorm, opponent_bid, scope);
        }, 1000);
    }

    private _offerABid(norm: Norm, bid: Bid, scope): void {
        const opponentNorm = bid.consistOf[0];
        const findInGraph = this.biddingStrategy.graph.getNode(opponentNorm.id);

        if (!isNullOrUndefined(findInGraph)) {
            this._pastaService.addNewBid({
                ...bid,
                consistOf: [findInGraph]
            });
        } else {
            this._pastaService.addNewBid(bid);
        }

        if (!isNullOrUndefined(findInGraph) && findInGraph.utility >= norm.utility) {
            // Message
            const newMessage = new Message(this.hospital.id, 'I accept your offer');

            // Add the message to the chat
            setTimeout(() => {
                this.negotiation.dialogs.push(newMessage);

                this._pastaService.saveAgreement(bid, findInGraph.utility);

                this.negotiationPhrase.changePhrase(NegotiationPhrases.EXIT);

                this.readyToReply();
            }, 2000);
        } else {
            setTimeout(() => {
                // this.generateOfferText();
                const newBid = new Bid(null, this.hospital, this.user, [norm]);
                this.lastAgentBid = newBid;

                for (const norm_ of newBid.consistOf) {
                    this.createMessage(norm_.toString(), true);
                }

                this._pastaService.addNewBid(newBid);
                this.negotiation.bids.push(newBid);

                this.negotiationPhrase.changePhrase(NegotiationPhrases.CONTINUE_OR_EXIT);

                this.readyToReply();
            }, 2000);
        }
    }

    private generateOfferText(): void {
        const randomIndex = Math.floor(Math.random() * 2);

        switch (randomIndex) {
            case 0:
                this.createMessage('I am afraid, I cannot accept your offer');
                this.createMessage('How about this one?');
                break;
            case 1:
                this.createMessage('hmm this is an offer I cannot accept.');
                this.createMessage('I may offer this one?');
                break;
            // case 2:
            //     this.createMessage('hmm this is an offer I cannot accept.');
            //     this.createMessage('I may offer this one?');
            //     break;

            default:
                break;
        }
    }

    private onExit(scope): void {
        scope._pastaService.saveEndDate(moment().toDate());

        setTimeout(() => {
            scope.router.navigate(['/thank-you']);
        }, 2000);
    }
}
