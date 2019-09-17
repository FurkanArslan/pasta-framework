import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { LogService } from '../../logs.service';

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;

    opponentTypes = [{
        key: 'Basic-Strategy',
        value: 'opponent-1'
    }, {
        key: 'Similarity-Based',
        value: 'opponent-2'
    }];

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _pastaService: LogService
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', Validators.required],
            opponent: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this._pastaService.setUserInfo(this.loginForm.controls.name.value, this.loginForm.controls.surname.value, this.loginForm.controls.opponent.value.key);

        setTimeout(() => {
            this.router.navigate(['/negotiation', this.loginForm.controls.opponent.value.value]);
        }, 1000);
    }
}
