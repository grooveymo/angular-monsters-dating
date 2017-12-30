import {ExpanderDirective} from './expander.directive';
import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `
    <div>
      <img class='card-img-top' src='/assets/images/icon01.png' alt='Card image cap' appExpander>
    </div>`
})
class TestDirectiveComponent {
}

describe('ExpanderDirective', () => {

  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let imageEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDirectiveComponent, ExpanderDirective]
    });
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    imageEl = fixture.debugElement.query(By.css('img'));
  });

  it('should create a TestComponent instance with our directive', () => {
    expect(component).toBeTruthy();
  });

  it('hovering over < img > tag adds/removes classes', () => {

    imageEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(imageEl.nativeElement.classList).toContain('hover-over');
    expect(imageEl.nativeElement.classList).not.toContain('no-hover-over');

    imageEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(imageEl.nativeElement.classList).toContain('no-hover-over');
    expect(imageEl.nativeElement.classList).not.toContain('hover-over');

  });
});
