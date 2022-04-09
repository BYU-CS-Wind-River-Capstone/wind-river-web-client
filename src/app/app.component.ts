import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

import { AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // TODO we can probably improve this by moving it to a global store so that we only start tracking idle-ness after they login.
  IDLE_TIME_SECONDS = 1800;
  IDLE_PERIOD_SECONDS = 20;
  IDLE_STATES = {
    notStarted: 'Not started',
    started: 'Started',
    notIdle: 'No longer idle',
    idle: `You've gone idle`,
    timedOut: 'Timed out',
  };
  idleState = this.IDLE_STATES.notStarted;
  timedOut = false;
  currentAlert = null;

  constructor(private router: Router, private idle: Idle, private alertController: AlertController) {
    idle.setIdle(this.IDLE_TIME_SECONDS); // How long they need to be inactive before they are considered idle
    idle.setTimeout(this.IDLE_PERIOD_SECONDS); // how long they have until they time out
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // set the default interrupts (i.e clicks, scrolls, touches)

    idle.onIdleEnd.subscribe(() => {
      this.idleState = this.IDLE_STATES.notIdle;
      if (this.currentAlert) {
        this.currentAlert.dismiss();
      }
    });

    idle.onTimeout.subscribe(async () => {
      this.idleState = this.IDLE_STATES.timedOut;
      this.timedOut = true;
      localStorage.removeItem('LIFE_HEALING_TOKEN');
      localStorage.removeItem('LIFE_HEALING_USER_ID');
      this.router.navigateByUrl('/');
      await this.presentTimeOutAlert();

    });

    idle.onIdleStart.subscribe(() => {
      this.idleState =  `You have been idle for a while now. Continued inactivity will result in your session ending.`;
      this.presentCountdownAlert();
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = this.IDLE_STATES.started;
    this.timedOut = false;
  }

  async presentCountdownAlert() {
    if (this.currentAlert) {
      this.currentAlert.dismiss();
    }
    this.currentAlert = await this.alertController.create({
      header: 'Time out warning',
      message: this.idleState,
      buttons: ['Keep working']
    });

    await this.currentAlert.present();
  }

  async presentTimeOutAlert() {
    if (this.currentAlert) {
      this.currentAlert.dismiss();
    }
    this.currentAlert = await this.alertController.create({
      header: 'Timed out',
      message: 'You have timed out. Please log back in to start working again.',
      buttons: ['Ok']
    });

    await this.currentAlert.present();

    await this.currentAlert.onDidDismiss();
    this.reset();
  }
}
