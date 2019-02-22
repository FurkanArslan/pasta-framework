import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormControl } from '@angular/forms';
import { StarRatingConfigService } from 'angular-star-rating';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-thank',
    templateUrl: './thank.component.html',
    styleUrls: ['./thank.component.scss'],
    providers: [StarRatingConfigService],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ThankComponent implements OnInit {

    // comingSoonForm: FormGroup;

    form = new FormGroup({
        ratingInput: new FormControl('')
    });

    rating = 0;

    /**
       * Constructor
       *
       * @param {FuseConfigService} _fuseConfigService
       */
    constructor(
        private _fuseConfigService: FuseConfigService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    onSubmit(event): void {
        console.log('Submitted value:', event.value);
        console.log('Submitted value:', this.rating);
        console.log('Submitted value:', this.form.controls.ratingInput);
    }

    ngOnInit(): void {
        // this.comingSoonForm = new FormGroup({
        //     myRatingControl: new FormControl('')
        // });
    }

}
