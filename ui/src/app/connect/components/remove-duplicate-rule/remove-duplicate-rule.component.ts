/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RemoveDuplicatesTransformationRuleDescription } from '../../../core-model/gen/streampipes-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sp-remove-duplicate-rule',
  templateUrl: './remove-duplicate-rule.component.html',
  styleUrls: ['./remove-duplicate-rule.component.css']
})
export class RemoveDuplicateRuleComponent implements OnInit {

  duplicateRuleForm: FormGroup;

  showRemoveDuplicateTimeInput = false;

  errorMessage = 'Please enter a numerical value';

  removeDuplicatesTimeValid = true;

  private rule: RemoveDuplicatesTransformationRuleDescription;

  @Output()
  updateRuleEmitter: EventEmitter<RemoveDuplicatesTransformationRuleDescription> =
    new EventEmitter<RemoveDuplicatesTransformationRuleDescription>();

  constructor(private fb: FormBuilder) {
    this.duplicateRuleForm = this.fb.group({
      'removeDuplicates': [false],
      removeDuplicatesTime: ['']
    });

    this.onChanges();
  }

  ngOnInit(): void {
    this.rule = new RemoveDuplicatesTransformationRuleDescription();
    this.rule['@class'] = 'org.apache.streampipes.model.connect.rules.stream.RemoveDuplicatesTransformationRuleDescription';
  }

  onChanges() {
    const removeDuplicatesTimeControl = this.duplicateRuleForm.get('removeDuplicatesTime');

    this.duplicateRuleForm.get('removeDuplicates').valueChanges.subscribe(val => {
      if (val) {
        removeDuplicatesTimeControl.setValidators([Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]);
        this.removeDuplicatesTimeValid = false;
      } else {
        removeDuplicatesTimeControl.setValidators(null);
        this.updateRuleEmitter.emit(null);
      }

      this.showRemoveDuplicateTimeInput = val;
    });

    this.duplicateRuleForm.get('removeDuplicatesTime').statusChanges.subscribe(status => {
      this.removeDuplicatesTimeValid = status === 'VALID';
    });

    this.duplicateRuleForm.get('removeDuplicatesTime').valueChanges.subscribe(val => {
      this.rule.filterTimeWindow = val;
      this.updateRuleEmitter.emit(this.rule);
    });
  }

}
