import { Component, OnInit } from '@angular/core';
import { faBible, faPrayingHands } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.css']
})
export class SectionOneComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit(): void {
  }

  bible = faBible;
  heart = faHeart;
  praying = faPrayingHands;

  goRoute(route:any){
    this.router.navigate([`/${route}`]);
  }

}
