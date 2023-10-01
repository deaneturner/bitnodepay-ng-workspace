import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MailService} from "../service/mail.service";
import {Mail} from "../../../../api/mail";
// import { Mail } from 'src/app/demo/api/mail';
// import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';

@Component({
    templateUrl: './mail-spam.component.html'
})
export class MailSpamComponent implements OnDestroy {

    spamMails: Mail[] = [];

    subscription: Subscription;

    constructor(private mailService: MailService) {
        this.subscription = this.mailService.mails$.subscribe(data => {
            this.spamMails = data.filter(d => d.spam && !d.archived && !d.trash && !d.hasOwnProperty('sent'));
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
