import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector     : 'negotiation',
    templateUrl  : './negotiation.component.html',
    styleUrls    : ['./negotiation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class NegotiationComponent implements OnInit, OnDestroy
{
    selectedChat: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {NegotiationService} _chatService
     */
    constructor(
        private _chatService: NegotiationService,
        private db: AngularFirestore
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this._chatService.onChatSelected
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(chatData => {
        //         this.selectedChat = chatData;
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
