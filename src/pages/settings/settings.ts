import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  selectedTheme: String;
  //https://github.com/ionic-team/ionic-starter-super/blob/master/src/pages/settings/settings.ts
  settingsbag: any;
  settingsReady = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settings: SettingsProvider, public formBuilder: FormBuilder) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
      //this.form.value.selectedTheme = 'light-theme';
      this.form.controls['isNightMode'].setValue(false);
    } else {
      this.settings.setActiveTheme('dark-theme');
      //this.form.value.selectedTheme = 'dark-theme';
      this.form.controls['isNightMode'].setValue(true);
    }
    this.settings.save();
  }

  _buildForm() {

    let group: any = {
      resturl: [this.settingsbag.resturl],
      mqtturl: [this.settingsbag.mqtturl],
      selectedTheme: [this.settingsbag.selectedTheme],
      isNightMode: [this.settingsbag.isNightMode]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes
    this.form.valueChanges.subscribe((v) => {
      if (this.form.value.isNightMode === true) {
        this.settings.setActiveTheme('dark-theme');
        this.form.value.selectedTheme = 'dark-theme';
      } else {
        this.settings.setActiveTheme('light-theme');
        this.form.value.selectedTheme = 'light-theme';
      }
      this.settings.merge(this.form.value);
    });
  }

  isChecked() { return true; }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.settingsbag = this.settings.allSettings;

      this._buildForm();
    });
  }

}