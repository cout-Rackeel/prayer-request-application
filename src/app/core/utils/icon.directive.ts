import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[appIcon]'
})
export class IconDirective implements OnInit {

  constructor(private el: ElementRef) { }

  @Input('appIcon') userId !: string

  ngOnInit(){
    console.log(this.userId);
  }


  changeColor(){
    console.log(this.el.nativeElement)
  }


}
