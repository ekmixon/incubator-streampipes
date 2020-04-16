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

import { DashboardWidgetSettings } from '../../../../core-model/dashboard/DashboardWidgetSettings';
import { WidgetConfigBuilder } from '../../../registry/widget-config-builder';
import { EpRequirements } from '../../../sdk/ep-requirements';
import { SchemaRequirementsBuilder } from '../../../sdk/schema-requirements-builder';
import { WidgetConfig } from '../base/base-config';

export class ImageConfig extends WidgetConfig {

    static readonly NUMBER_MAPPING_KEY: string = 'number-mapping';

    constructor() {
        super();
    }

    getConfig(): DashboardWidgetSettings {
        return WidgetConfigBuilder.createWithSelectableColorsAndTitlePanel('image', 'image')
            .requiredSchema(SchemaRequirementsBuilder
                .create()
                // .requiredPropertyWithUnaryMapping(TableConfig.NUMBER_MAPPING_KEY, 'Select property', '', EpRequirements.numberReq())
                .build())
            .build();
    }

}
