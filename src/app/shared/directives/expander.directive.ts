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
//      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'underline');
      this.renderer.addClass(this.el.nativeElement, 'hover');
//      setStyle(this.el.nativeElement, 'text-decoration', 'underline');

    } else {
//      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'none');
      this.renderer.removeClass(this.el.nativeElement, 'hover');
    }
  }

}
