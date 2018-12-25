import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { NegotiationPhrase, NegotiationPhrases } from '../models/negotiation-phrases.model';
import { ScenarioTypes, Scenario } from '../models/scenario.model';
import { Negotiation } from '../models/negotiation.model';

@Component({
    selector: 'negotiation-view',
    templateUrl: './negotiation-view.component.html',
    styleUrls: ['./negotiation-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationViewComponent implements OnInit, OnDestroy, AfterViewInit {
    chat: any;
    negotiation: Negotiation;

    user: User;
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
    private _phrase: NegotiationPhrase;

    /**
     * Constructor
     *
     * @param {NegotiationService} _chatService
     */
    constructor(
        private _chatService: NegotiationService
    ) {
        this.negotiation = new Negotiation('111');
        this.user = new User('2', 'Furkan');
        this.simulator = new User('1', 'Simulator', 'assets/images/avatars/simulator.png');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._phrase = NegotiationPhrase.WELCOME;
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

        this._phrase = NegotiationPhrase.SCENARIO_SELECTION;
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
        const message = new Message(this.user.id, this.replyForm.form.value.message);

        // Add the message to the chat
        this.negotiation.dialogs.push(message);

        switch (this._phrase) {
            case NegotiationPhrase.SCENARIO_SELECTION: {
                this.setScenario(this.replyForm.form.value.message);
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
        console.log(selectedScenario);
        if (Object.values(ScenarioTypes).includes(selectedScenario)) {
            this.negotiation.scenario = new Scenario(selectedScenario);

            this.createAutomatedMessage(`${selectedScenario} is good choice sir/madam`);
            this._phrase = NegotiationPhrase.ROLE_SELECTION;
        } else {
            this.createAutomatedMessage('I think you selected wrong scenario, you may try once again.');
            this.readyToReply();
        }
    }
}
