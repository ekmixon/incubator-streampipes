import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRateReductionRuleComponent } from './event-rate-reduction-rule.component';

describe('EventRateReductionRuleComponent', () => {
  let component: EventRateReductionRuleComponent;
  let fixture: ComponentFixture<EventRateReductionRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRateReductionRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRateReductionRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
