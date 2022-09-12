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
import { DialogLinkService, Prayer, PrayerService, SessionStorageService, UserManagementService } from 'src/app/core';
import { User } from 'src/app/core/models/user';
import Swal from 'sweetalert2';


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
    private storageService: SessionStorageService,
    private userService : UserManagementService,
    @Inject(MAT_DIALOG_DATA) public dialogData: Prayer
    ) {}

    user: Partial<User> = this.storageService.getUser();
    loggedIn : boolean = this.storageService.isLoggedIn()

  ngOnInit(): void {
    if(!this.loggedIn){
      this.setAnonymous();
    }
    this.intializeForm();
    this.setBehavioral();

    if(this.editSwitch){
      this.setForm();
    }
  }


  setAnonymous(){
    this.userService.getAllUsers().subscribe(resp =>{
      this.user = resp.data?.['users'].find((anon) => anon.username == 'anonymous')!;
      console.log(this.user);
    })
  }

  setBehavioral(){
    this.dialogLink.getEditSwitchVal().subscribe(data => this.editSwitch = data)
  }

  intializeForm(){
      this.prayerForm = new FormGroup({
        userId: new FormControl(this.user._id,[]),
        name: new FormControl(this.user.firstname,[Validators.required]),
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
      userId:this.user._id,
      name: this.dialogData.name,
      title:this.dialogData.title,
      date:this.dialogData.date || '',
      prayerRequest:this.dialogData.prayerRequest,
      commitedToPray:this.dialogData.commitedToPray,
      status:false,
      updates:this.dialogData.updates
    }

    if(this.dialogData){
      return this.prayerForm.setValue(values)
    }
  }

  // CRUD SECTION

  addPrayer(){
    if(this.prayerForm.valid){
      this.prayerService.createPrayerRequest(this.prayerForm.value).subscribe( resp => this.createdPrayer = resp.data?.['prayer'] as Prayer)
      this.dialogRef.close('save');
      Swal.fire('Added', 'Prayer request successfully added!', 'success');
      console.log(`${JSON.stringify(this.prayerForm.value)}`);
    }

  }

  editPrayerConfirm(){
    if(this.prayerForm.valid){
      this.prayerService.editPrayerRequest(this.dialogData._id, this.prayerForm.value).subscribe(resp => this.editedPrayer = resp.data?.['prayer'] as Prayer)
      this.dialogRef.close('edit');

      Swal.fire('Edited', 'Prayer request successfully edited', 'success');

      console.log(`Edit : -${JSON.stringify(this.prayerForm.value)}`);
    }
  }

  // Getter Section

  get title() {return this.prayerForm.get('title');}
  get date() { return this.prayerForm.get('date');}
  get name() { return this.prayerForm.get('name');}
  get prayerRequest() { return this.prayerForm.get('prayerRequest');}


}
