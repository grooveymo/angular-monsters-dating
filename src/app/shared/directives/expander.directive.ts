import {Directive, HostListener, Renderer2, ElementRef} from '@angular/core';

@Directive({
  selector: '[appExpander]'
})
export class ExpanderDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.doExpand(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.doExpand(false);
  }

  doExpand(isExpandable: boolean): void {

    if(isExpandable) {
      this.renderer.addClass(this.el.nativeElement, 'hover-over');
      this.renderer.removeClass(this.el.nativeElement, 'no-hover-over');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'hover-over');
      this.renderer.addClass(this.el.nativeElement, 'no-hover-over');
    }
  }

}
