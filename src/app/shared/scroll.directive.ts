import { Directive, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';


@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(private el:ElementRef) { }

  @Input() page !: string 


  @HostListener('window:scroll') onScroll(){
    const navbar = this.el.nativeElement;


    const options = {
      root:null,
      threshold:0,
      rootMargin:"-500px 0px 0px 0px"
    };

    const links = document.querySelectorAll('a')

    const observer = new IntersectionObserver(function(entries,options){
      entries.forEach( entry => {
        if(entry.isIntersecting){
          entry.target.classList.remove('white')
          entry.target.classList.remove('fixed');
          links.forEach(item =>{
            item.classList.remove('dark-text')
            console.log(item);
          })

        }else{
          entry.target.classList.add('white')
          entry.target.classList.add('fixed')
          links.forEach(item =>{
            item.classList.add('dark-text')
            console.log(item);
          })
          observer.unobserve(navbar)
        }


      })
    },options);

      observer.observe(navbar)

  }


}
