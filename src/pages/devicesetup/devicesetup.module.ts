import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicesetupPage } from './devicesetup';

@NgModule({
  declarations: [
    DevicesetupPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicesetupPage),
  ],
})
export class DevicesetupPageModule {}
