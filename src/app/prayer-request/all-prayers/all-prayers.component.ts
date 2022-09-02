import { Component, ElementRef, OnInit } from '@angular/core';
import { PrayerFormComponent } from '../prayer-form/prayer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { faDeleteLeft, faEdit, faListDots, faPray, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, Prayer, PrayerService, SearchService, SessionStorageService } from 'src/app/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchQuery } from 'src/app/core/models/search-query';
import { SearchResult } from 'src/app/core/models/search-result';
import { User } from 'src/app/core/models/user';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { DialogPosition } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-prayers',
  templateUrl: './all-prayers.component.html',
  styleUrls: ['./all-prayers.component.css']
})
export class AllPrayersComponent implements OnInit {

  prayerRecords !:Prayer[];
  praying = faPray;
  edit = faEdit;
  delete = faTrash;
  more = faListDots;
  editPrayerRequest !: Prayer;
  editSwitch !: boolean;
  search = faSearch;
  searchVal !: any;

  searchForm = new FormGroup({
    key : new FormControl('name' , [Validators.required]),
    searchQuery : new FormControl('' , [Validators.required])
  })


  constructor(
    private dialog : MatDialog,
    private prayerService: PrayerService,
    private dialogLink : DialogLinkService,
    private searchService : SearchService,
    private storageService : SessionStorageService,
    private router : Router

    ) { }

    user: Partial<User> = this.storageService.getUser();
    loggedIn : boolean = this.storageService.isLoggedIn();

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
    this.prayerService.getAllPrayers().subscribe(data => this.prayerRecords = data)
  }

  openDialog(){
      this.dialog.open(PrayerFormComponent,{
        width:"60%",
        minHeight:"350px"
      }).afterClosed().subscribe(val=>{
        if(val === 'save'){
          this.retrievePrayers()
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
          title: 'Are you sure want to remove?',
          text: 'You will not be able to recover this file!',
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

  highlightPrayer(id : string){
    let commitedToPrayRequest !: Prayer;
    this.prayerService.findPrayerRequest(id).subscribe(data => {
      commitedToPrayRequest = data

      if(this.loggedIn){
        commitedToPrayRequest.commitedToPray.push(this.user._id!);
        this.prayerService.editPrayerRequest(id , commitedToPrayRequest).subscribe({
          next: ()=> {
            alert(`You have committed to pray for ${JSON.stringify(commitedToPrayRequest.commitedToPray)}`)
          },
          error: (err)=> {
            console.log(err.error.message);
          }
        });
      }else{
        commitedToPrayRequest.commitedToPray.push('630fc62ab13b9a3182a23241');
        this.prayerService.editPrayerRequest(id, commitedToPrayRequest).subscribe({
          next: ()=> {
            alert(`You have committed to pray for ${JSON.stringify(commitedToPrayRequest.commitedToPray)} anonymous`)
          }
          });
      }


    })
    }

  checkAdmin(userId:string){
    if(this.user.roles){
      for( var i = 0; i <= this.user.roles.length-1; i++){
        if(this.user.roles[i] == 'ROLE_ADMIN' || this.user._id == userId){
         return true
        }
      }
    }
    return false;
  }

  searchFor(){
    if(this.searchForm.valid){
      let key = this.searchForm.value.key;
      let query = this.searchForm.value.searchQuery;

      this.searchService.getSearchResult(key , query).subscribe( data => {
        this.searchVal = data
        console.log(query as string)
      });
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


  goToYourPrayers(){
    this.router.navigate([`/prayers/your-prayers/${this.user._id}`]);
  }




}
