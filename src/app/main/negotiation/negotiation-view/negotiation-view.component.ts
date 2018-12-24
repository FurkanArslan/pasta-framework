import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';

@Component({
    selector: 'negotiation-view',
    templateUrl: './negotiation-view.component.html',
    styleUrls: ['./negotiation-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NegotiationViewComponent implements OnInit, OnDestroy, AfterViewInit {
    user = {
        'id': '2',
        'name': 'Furkan'
    };

    chat: any;
    dialog: any[];

    simulator = {
        'id': '1',
        'name': 'Simulator',
        'avatar': 'assets/images/avatars/simulator.png',
    };

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

    /**
     * Constructor
     *
     * @param {NegotiationService} _chatService
     */
    constructor(
        private _chatService: NegotiationService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.dialog = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.user = this._chatService.user;
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
        this.createMessage('Hi!');
        this.createMessage('Welcome to Our Negotiation Simulation');
        this.createMessage('I am Simulator');
        this.createMessage('I will guide you during simulation.');
    }

    /**
     * Create Automated Message
     */
    createMessage(message): void {
        // Message
        const message_ = {
            who: this.simulator.id,
            message: message,
            time: new Date().toISOString()
        };

        // Add the message to the chat
        this.dialog.push(message_);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
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
            ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.simulator.id) || !this.dialog[i + 1])
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
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
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
        const message = {
            who: this.user.id,
            message: this.replyForm.form.value.message,
            time: new Date().toISOString()
        };

        // Add the message to the chat
        this.dialog.push(message);

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        // this._chatService.updateDialog(this.selectedChat.chatId, this.dialog).then(response => {
            this.readyToReply();
        // });
    }
}
