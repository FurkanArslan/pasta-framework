import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { NegotiatiorService } from 'app/main/negotiation/negotiation.service';
import { NegotiationComponent } from 'app/main/negotiation/negotiation.component';
import { ChatStartComponent } from 'app/main/negotiation/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/main/negotiation/chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from 'app/main/negotiation/sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from 'app/main/negotiation/sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from 'app/main/negotiation/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/main/negotiation/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/main/negotiation/sidenavs/right/contact/contact.component';

const routes: Routes = [
    {
        path: '**',
        component: NegotiationComponent,
        children: [],
        resolve: {
            chat: NegotiatiorService
        }
    }
];

@NgModule({
    declarations: [
        NegotiationComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,

        FuseSharedModule
    ],
    providers   : [
        NegotiatiorService
    ]
})
export class NegotiationModule
{
}
