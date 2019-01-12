import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, 
    MatInputModule, MatListModule, MatMenuModule, MatRadioModule, 
    MatSidenavModule, MatToolbarModule, MatSelectModule, MatSliderModule, MatTooltipModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { NegotiationService } from 'app/main/negotiation/negotiation.service';
import { NegotiationComponent } from 'app/main/negotiation/negotiation.component';
import { ScenarioFactoryService } from './factories/scenario-factory.service';
import { NormFactoryService } from './factories/norm-factory.service';
import { EnumToArrayPipe } from '../enumToArray.pipe';

// Components
import { NegotiationViewComponent } from './components/negotiation-view/negotiation-view.component';
import { NegotiationInputComponent } from './components/negotiation-input/negotiation-input.component';
import { BidGenerationComponent } from './components/bid-generation/bid-generation.component';
import { PromotionAndDemotionSelectionComponent } from './components/promotion-and-demotion-selection/promotion-and-demotion-selection.component';
import { PreferencesSelectionComponent } from './components/preferences-selection/preferences-selection.component';

const routes: Routes = [
    {
        path: '',
        component: NegotiationComponent,
        children: [
            { path: '', component: NegotiationViewComponent },
            { path: 'bid-generation', component: BidGenerationComponent },
        ]
    }
];

@NgModule({
    declarations: [
        NegotiationComponent,
        NegotiationViewComponent,
        NegotiationInputComponent,
        BidGenerationComponent,
        PromotionAndDemotionSelectionComponent,
        // PreferencesSelectionComponent,
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
        MatSliderModule,
        MatTooltipModule
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
