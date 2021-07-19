import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavDir]',
  exportAs : 'appNavDir'
})
export class NavDirDirective {
 
  constructor(private elRef : ElementRef) { }
  @HostBinding('class.Open') isOpen = false;
  // @HostListener('document:click', ['$event']) toggleOpen(event : Event){
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  //   // this.isOpen = !this.isOpen;
  // }
  @HostListener('mouseenter') mouseover(event : Event){
    this.isOpen = !this.isOpen;
  }
  @HostListener('mouseleave') mouseleave(event : Event){
    this.isOpen = !this.isOpen;
  }

}
