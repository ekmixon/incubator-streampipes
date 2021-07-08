import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  EventRateTransformationRuleDescription,
  RemoveDuplicatesTransformationRuleDescription
} from '../../../core-model/gen/streampipes-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sp-event-rate-reduction-rule',
  templateUrl: './event-rate-reduction-rule.component.html',
  styleUrls: ['./event-rate-reduction-rule.component.css']
})
export class EventRateReductionRuleComponent implements OnInit {

  showEventRateReductionInput = false;

  eventReductionRuleForm: FormGroup;

  eventRateTimeValid = true;
  errorMessage = 'Please enter a numerical value';

  private rule: EventRateTransformationRuleDescription;

  @Output()
  updateRuleEmitter: EventEmitter<EventRateTransformationRuleDescription> =
    new EventEmitter<EventRateTransformationRuleDescription>();

  constructor(private fb: FormBuilder) {
    this.eventReductionRuleForm = this.fb.group({
      eventRateReduction: [false],
      eventRateTime: [''],
      eventRateMode: ['none']
    });

    this.onChanges();
  }

  ngOnInit(): void {
    this.rule = new EventRateTransformationRuleDescription();
    this.rule['@class'] = 'org.apache.streampipes.model.connect.rules.stream.EventRateTransformationRuleDescription';
    this.rule.aggregationType = 'None';
  }

  onChanges() {
    const eventRateTimeControl = this.eventReductionRuleForm.get('eventRateTime');
    const eventRateModeControl = this.eventReductionRuleForm.get('eventRateMode');

    this.eventReductionRuleForm.get('eventRateReduction').valueChanges.subscribe(val => {
      if (val) {
        eventRateTimeControl.setValidators([Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]);
        eventRateModeControl.setValidators(Validators.required);
        this.eventRateTimeValid = false;
      } else {
        eventRateTimeControl.setValidators(null);
        eventRateModeControl.setValidators(null);
        this.updateRuleEmitter.emit(null);
      }

      this.showEventRateReductionInput = val;
    });

    this.eventReductionRuleForm.get('eventRateTime').statusChanges.subscribe(status => {
      this.eventRateTimeValid = status === 'VALID';
    });

    this.eventReductionRuleForm.get('eventRateTime').valueChanges.subscribe(val => {
      this.rule.aggregationTimeWindow = val;
      this.updateRuleEmitter.emit(this.rule);
    });
  }


}
