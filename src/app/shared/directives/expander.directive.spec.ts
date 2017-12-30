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

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('hovering over <img> tag', () => {
    imageEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();

    console.log(' foo: ',imageEl.nativeElement.classList);

    //expect(imageEl.nativeElement.classList).toContain('hover');
    // expect(imageEl.nativeElement.style.backgroundColor).toBe('blue');

    imageEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    console.log(' bar: ',imageEl.nativeElement.classList);

    // console.log(imageEl.nativeElement.style.backgroundColor);
    // expect(imageEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
