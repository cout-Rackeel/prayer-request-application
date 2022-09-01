import { Component, ElementRef, OnInit } from '@angular/core';
import { PrayerFormComponent } from '../prayer-form/prayer-form.component';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { faDeleteLeft, faEdit, faHandDots, faList, faPray, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, Prayer, PrayerService, SessionStorageService } from 'src/app/core';
import { User } from 'src/app/core/models/user';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-your-prayers',
  templateUrl: './your-prayers.component.html',
  styleUrls: ['./your-prayers.component.css']
})
export class YourPrayersComponent implements OnInit {

  prayerRecords !:Prayer[] ;
  more = faList
  edit = faEdit;
  delete = faTrash;
  editPrayerRequest !: Prayer;
  editSwitch !: boolean;
  search = faSearch;


  constructor(
    private dialog : MatDialog,
    private prayerService: PrayerService,
    private dialogLink : DialogLinkService,
    private storageService : SessionStorageService
    ) { }

    user: Partial<User> = this.storageService.getUser();
    dialogPosition: DialogPosition = {
      right:'0px',
    }

  ngOnInit(): void {
    this.retrievePrayers();
    this.setBehavioral();
  }

  setBehavioral(){
    this.dialogLink.getEditSwitchVal().subscribe(data => this.editSwitch = data)
  }

  retrievePrayers(){
    this.prayerService.getUserPrayers(this.user._id!).subscribe(data => this.prayerRecords = data)
  }

  openDialog(){
      this.dialog.open(PrayerFormComponent,{
        width:"60%",
        minHeight:"350px"
      }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.retrievePrayers();
        }
      })
    }


  editPrayer(id:string){
    this.dialogLink.setEditSwitchVal(true);
    return this.prayerService.findPrayerRequest(id).subscribe(prayer => {
      this.editPrayerRequest = prayer
      this.dialog.open(PrayerFormComponent , {
        data: this.editPrayerRequest,
        width:"60%",
        minHeight:"350px"
      }).afterClosed().subscribe(val=>{
        this.dialogLink.setEditSwitchVal(false);
        this.retrievePrayers();
        console.log(`${JSON.stringify(this.editPrayerRequest)}`);
      })
    })
    }


    deleteRequest(id:string){
      const answer = window.prompt('Are you sure you want to delete prayer , type yes', 'no');
      
      if(answer == 'yes'){
        this.prayerService.deletePrayerRequest(id).subscribe();
        this.retrievePrayers();
        alert(`Deleted ${id}`);
      }


    }


    openMoreInfo(id:string){
      this.dialog.open(MoreInfoComponent , {
        data: id,
        width:"60%",
        height:"100%",
        position: this.dialogPosition

      }).afterClosed().subscribe(val=>{
        console.log('dialog closed');
      })

    }


}


