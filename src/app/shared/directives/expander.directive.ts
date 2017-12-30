import {Directive, HostListener, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appExpander]'
})
export class ExpanderDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    console.log('---> mouse enter: ');
    this.doExpand(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('---> mouse leave: ');
    this.doExpand(false);
  }

  doExpand(isExpandable: boolean): void {

    if(isExpandable) {
      console.log('mouse enter: ', isExpandable);
      this.renderer.addClass(this.el.nativeElement, 'hover-over');
      this.renderer.removeClass(this.el.nativeElement, 'no-hover-over');
    } else {
      console.log('mouse leave: ', isExpandable);
      this.renderer.removeClass(this.el.nativeElement, 'hover-over');
      this.renderer.addClass(this.el.nativeElement, 'no-hover-over');
    }

    // if(isExpandable) {
    //   this.renderer.addClass(this.el.nativeElement, 'hover-over');
    // } else {
    //   this.renderer.removeClass(this.el.nativeElement, 'hover-over');
    // }
  }

}
