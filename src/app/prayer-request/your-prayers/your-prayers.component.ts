import { Component, ElementRef, OnInit } from '@angular/core';
import { PrayerFormComponent } from '../prayer-form/prayer-form.component';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { faDeleteLeft, faEdit, faHandDots, faList, faPray, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, Prayer, PrayerService, SessionStorageService } from 'src/app/core';
import { User } from 'src/app/core/models/user';
import { MoreInfoComponent } from '../more-info/more-info.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  searchVal !: any[];

  searchForm = new FormGroup({
    key : new FormControl('title' , [Validators.required]),
    searchQuery : new FormControl('' , [Validators.required])
  })

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
      let deleted : any;
        Swal.fire({
          title: 'Are you sure want to delete this prayer request?',
          text: 'You will not be able to recover this request later!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.prayerService.deletePrayerRequest(id).subscribe( data => deleted = data);
            Swal.fire(
              'Deleted!',
              'Your prayer request has been deleted.',
              'success'
            )
            this.retrievePrayers();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              `${deleted.result.title} has not been deleted`,
              'error'
            )
          }
        })
    }


    searchForDemo(){
      if(this.searchForm.valid){
            let key = this.searchForm.value.key;
            let query = this.searchForm.value.searchQuery.trim().toLowerCase();

            switch(true){

              case key == 'title':
                this.searchVal = [this.prayerRecords.find((prayer:Prayer) => prayer.title.trim().toLowerCase() == query)];
              break;

              case key == 'prayerRequest':
                this.searchVal = [this.prayerRecords.find((prayer:Prayer) => prayer.prayerRequest.trim().toLowerCase() == query)];
              break;

              default:
                this.searchVal = [this.prayerRecords.find((prayer:Prayer) => prayer.name.trim().toLowerCase() == query)];
              break;
            }


          console.log(this.searchVal);
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


