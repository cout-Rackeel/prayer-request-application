import { Component, ElementRef, OnInit } from '@angular/core';
import { PrayerFormComponent } from '../prayer-form/prayer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { faDeleteLeft, faEdit, faPray, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, Prayer, PrayerSearchService, PrayerService } from 'src/app/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchQuery } from 'src/app/core/models/search-query';
import { SearchResult } from 'src/app/core/models/search-result';

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
  editPrayerRequest !: Prayer;
  editSwitch !: boolean;
  search = faSearch;
  searchVal !: SearchResult<Prayer>;

  searchForm = new FormGroup({
    criterion : new FormControl('name' , [Validators.required]),
    searchQuery : new FormControl('' , [Validators.required])
  })


  constructor(
    private dialog : MatDialog,
    private prayerService: PrayerService,
    private dialogLink : DialogLinkService,
    private searchService : PrayerSearchService
    ) { }

  ngOnInit(): void {
    this.retrievePrayers();
    this.setBehavioral();
    // setTimeout(()=>{
    //   this.ngOnInit()
    // }, 5 *1000)
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
      const answer = window.prompt('Are you sure you want to delete prayer , type yes', 'no');

      if(answer === 'yes'){
        this.prayerService.deletePrayerRequest(id).subscribe();
        alert(`Deleted ${id}`);
        this.retrievePrayers();
      }


    }

  highlightPrayer(prayer:any){
      alert(`highlighted prayer ${prayer}`)
    }

  searchFor(){
    let body : SearchQuery<any> = {
      criterion : this.searchForm.value.criterion,
      searchQuery: this.searchForm.value.searchQuery
    }

    this.searchService.getSearchResult(body).subscribe( data => console.log(data));

    // this.searchService.getSearchResult(body).subscribe({
    //   next: (resp:SearchResult<Prayer>) => {
    //     this.searchVal = resp;
    //     console.log(body);
    //   }
    // });




  }



}
