import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { NegotiationComponent } from 'app/main/negotiation/negotiation.component';
import { NegotiationViewComponent } from 'app/main/negotiation/negotiation-view/negotiation-view.component';

const routes: Routes = [
    {
        path: '**',
        component: NegotiationComponent,
        children: [],
        // resolve: {
        //     chat: NegotiationService
        // }
    }
];

@NgModule({
    declarations: [
        NegotiationComponent,
        NegotiationViewComponent,
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
        NegotiationService
    ]
})
export class NegotiationModule
{
}
