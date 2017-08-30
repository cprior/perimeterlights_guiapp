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
  options: any;
  settingsReady = false;
  form: FormGroup;

  settingsitems: { endpointurl: string, mqtturl: string, foo: string, bar: string } = {
    endpointurl: 'http://localhost:8081/api/v1/test',
    mqtturl: 'http://localhost:8080',
    foo: 'foo',
    bar: 'bar'
  };
  defaults: { endpointurl: string, mqtturl: string, foo: string, bar: string } = {
    endpointurl: 'http://localhost:8081/api/v1/test',
    mqtturl: 'http://localhost:8080',
    foo: 'foo',
    bar: 'bar'
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public settings: SettingsProvider, public formBuilder: FormBuilder) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    console.log(this.defaults);
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
  saveSettings() {
    console.log(this.settingsitems)
  }
  resetDefaults() {
    console.log(this.defaults)
  }


  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

}