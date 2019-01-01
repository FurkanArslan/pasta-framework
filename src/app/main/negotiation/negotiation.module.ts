import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, 
    MatInputModule, MatListModule, MatMenuModule, MatRadioModule, 
    MatSidenavModule, MatToolbarModule, MatSelectModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { NegotiationComponent } from 'app/main/negotiation/negotiation.component';
import { NegotiationViewComponent } from 'app/main/negotiation/negotiation-view/negotiation-view.component';
import { ScenarioFactoryService } from './factories/scenario-factory.service';
import { NormFactoryService } from './factories/norm-factory.service';
import { EnumToArrayPipe } from '../enumToArray.pipe';
import { NegotiationInputComponent } from './negotiation-view/negotiation-input/negotiation-input.component';

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
        NegotiationInputComponent,
        EnumToArrayPipe
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
        FuseSharedModule,
        MatSelectModule,
    ],
    providers   : [
        NegotiationService,
        ScenarioFactoryService,
        NormFactoryService
    ]
})
export class NegotiationModule
{
}
