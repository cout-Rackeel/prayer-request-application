import { Component, ElementRef, OnInit } from '@angular/core';
import { PrayerFormComponent } from '../prayer-form/prayer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { faDeleteLeft, faEdit, faPray, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, Prayer, PrayerService } from 'src/app/core';

@Component({
  selector: 'app-your-prayers',
  templateUrl: './your-prayers.component.html',
  styleUrls: ['./your-prayers.component.css']
})
export class YourPrayersComponent implements OnInit {

  prayerRecords !:Prayer[];
  praying = faPray;
  edit = faEdit;
  delete = faTrash;
  editPrayerRequest !: Prayer;
  editSwitch !: boolean


  constructor(
    private dialog : MatDialog,
    private prayerService: PrayerService,
    private dialogLink : DialogLinkService
    ) { }

  ngOnInit(): void {
    this.retrievePrayers();
    this.setBehavioral();
    setTimeout(()=>{
      this.ngOnInit()
    }, 5 *1000)
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

  // findPrayer(id:string){
  //   return this.prayerService.findPrayerRequest(id).subscribe(data => {this.editPrayerRequest = data
  //     console.log(`${JSON.stringify(this.editPrayerRequest)}`);
  //   })

  // }

  editPrayer(id:string){

    this.dialogLink.setEditSwitchVal(true);
    return this.prayerService.findPrayerRequest(id).subscribe(prayer => {
      this.editPrayerRequest = prayer
      this.dialog.open(PrayerFormComponent , {
        data: this.editPrayerRequest,
        width:"60%",
        minHeight:"350px"
      }).afterClosed().subscribe(val=>{
        this.dialogLink.setEditSwitchVal(false)
        console.log(`${JSON.stringify(this.editPrayerRequest)}`);
      })
    })







    }


    deleteRequest(id:string){
      const answer = window.prompt('Are you sure you want to delete prayer , type yes', 'no');

      if(answer === 'yes'){

        this.prayerService.deletePrayerRequest(id).subscribe();

        alert(`Deleted ${id}`);
      }


    }

    highlightPrayer(prayer:any){
      alert(`highlighted prayer ${prayer}`)
    }



}


//* transfer code


// constructor(
//   private dialog : MatDialog,
//   private api : ApiService,
//   private el :ElementRef
//   ) { }

// ngOnInit(): void {
//   this.retrievePrayers();

//   // Ensures up to date data on the frontend
//   setTimeout(() => {
//     this.ngOnInit();
//   },1000 * 5)
// }

// //declarations
// prayerRecords !:any;
// praying = faPray;
// edit = faEdit;
// delete = faTrash

// openDialog(){
//   this.dialog.open(PrayerFormComponent,{
//     width:"60%",
//     minHeight:"300px"
//   }).afterClosed().subscribe(val=>{
//     if(val === 'save'){
//       this.retrievePrayers();
//     }
//   })
// }

// retrievePrayers(){
//   return this.api.getPrayers().subscribe({
//     next:(res) => {
//       this.prayerRecords = res;
//       console.log(this.prayerRecords);
//     },
//     error:(err) => {
//       alert('Error retrieving prayers')
//     }
//   })
// }

// deleteRequest(id:string){
//   return this.api.deletePrayer(id).subscribe({
//     next:(res) => {
//       alert('prayer deleted')
//       // this.prayerRecords = this.prayerRecords.filter((val:any) => id !== val._id )
//     },
//     error:(err) => {

//     }
//   })
// }

// highlightPrayer(prayer:any){
//   prayer.status = !prayer.status;
//   if(prayer.status){
//     return alert('Commited to Prayer')
//   }else{
//     return alert('Not Commited to Prayer')
//   }

// }
