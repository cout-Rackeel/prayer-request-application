import { Component, OnInit , Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { YourPrayersComponent } from '../your-prayers/your-prayers.component';
import { DialogLinkService, Prayer, PrayerService } from 'src/app/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-prayer-form',
  templateUrl: './prayer-form.component.html',
  styleUrls: ['./prayer-form.component.css'],
})

export class PrayerFormComponent implements OnInit {
  Todaydate: Date = new Date();
  prayerForm !: FormGroup
  error = faWarning
  createdPrayer !: Prayer;
  editedPrayer !: Prayer;
  editSwitch !: boolean



  constructor(
    private prayerService: PrayerService,
    private dialogLink :DialogLinkService,
    private dialogRef : MatDialogRef<YourPrayersComponent>,
    private cdRef : ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Prayer
    ) {}


  ngOnInit(): void {
    this.intializeForm()
    this.setBehavioral()
    // this.cdRef.detectChanges()
    if(this.editSwitch){
      this.setForm();
    }
  }



  setBehavioral(){
    this.dialogLink.getEditSwitchVal().subscribe(data => this.editSwitch = data)
  }

  intializeForm(){
      this.prayerForm = new FormGroup({
        userId: new FormControl(null,[]),
        name: new FormControl('',[Validators.required]),
        title: new FormControl('',[Validators.required]),
        date: new FormControl(new Date,[]),
        prayerRequest: new FormControl('',[Validators.required]),
        commitedToPray: new FormControl([],[]),
        status: new FormControl(false,[]),
        updates:new FormControl([],[]),
      });
  }

  setForm(){

    let values = {
      userId:null,
      name: this.data.name,
      title:this.data.title,
      date:this.data.date || '',
      prayerRequest:this.data.prayerRequest,
      commitedToPray:[],
      status:false,
      updates:[]
    }


    if(this.data){
      return this.prayerForm.setValue(values)
    }
  }

  // CRUD SECTION

  addPrayer(){
    if(this.prayerForm.valid){
      this.prayerService.createPrayerRequest(this.prayerForm.value).subscribe( data => this.createdPrayer = data)
      this.dialogRef.close('save');
      alert('Added');
      console.log(`${JSON.stringify(this.prayerForm.value)}`);
    }

  }

  editPrayerConfirm(){
    if(this.prayerForm.valid){
      this.prayerService.editPrayerRequest(this.data._id, this.prayerForm.value).subscribe(data => this.editedPrayer = data)
      this.dialogRef.close('edit');
      alert('Edited')
      console.log(`Edit : -${JSON.stringify(this.prayerForm.value)}`);
    }
  }

  // Getter Section

  get title() {return this.prayerForm.get('title');}
  get date() { return this.prayerForm.get('date');}
  get name() { return this.prayerForm.get('name');}
  get prayerRequest() { return this.prayerForm.get('prayerRequest');}


}
