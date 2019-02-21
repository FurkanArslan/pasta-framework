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
import { PromotionAndDemotionSelectionComponent } from './components/promotion-and-demotion-selection/promotion-and-demotion-selection.component';
import { PreferencesSelectionComponent } from './components/preferences-selection/preferences-selection.component';
import { ContinueOrExitComponent } from './components/continue-or-exit/continue-or-exit.component';
import { DrawGraphComponent } from './components/draw-graph/draw-graph.component';
import { GraphRendererComponent } from './components/draw-graph/graph-renderer/graph-renderer.component';
import { ThankComponent } from './components/thank/thank.component';

import { StarRatingModule } from 'angular-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
    {
        path: '',
        component: NegotiationComponent,
        children: [
            { path: '', component: NegotiationViewComponent },
        ]
    },
    {
        path: 'draw-bid-graph',
        component: DrawGraphComponent
    },
    {
        path: 'thank-you',
        component: ThankComponent
    }
];

@NgModule({
   declarations: [
      NegotiationComponent,
      NegotiationViewComponent,
      NegotiationInputComponent,
      PromotionAndDemotionSelectionComponent,
      PreferencesSelectionComponent,
      ContinueOrExitComponent,
      EnumToArrayPipe,
      DrawGraphComponent,
      GraphRendererComponent,
      ThankComponent
   ],
   imports: [
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
      MatTooltipModule,

      StarRatingModule.forChild()
   ],
   providers: [
      NegotiationService,
      ScenarioFactoryService,
      NormFactoryService
   ]
})
export class NegotiationModule
{
}
