import { Autocomplete, CodeEditor, ColorPicker, FormAutocomplete, PropertyAutocomplete, Show } from '@/components';
import RefListItemSelectorSettingsModal from '@/components/kanban/options/modal';
import { Checkbox, Input } from 'antd';
import React, { FC } from 'react';
import SettingsForm, { useSettingsForm } from '../_settings/settingsForm';
import { ISettingsFormFactoryArgs } from '@/interfaces';
import SettingsFormItem from '../_settings/settingsFormItem';
import SettingsCollapsiblePanel from '../_settings/settingsCollapsiblePanel';
import { MetadataProvider } from '@/providers';
import { IKanbanProps } from '@/components/kanban/model';
import { SheshaConstants } from '@/utils/metadata/standardProperties';
import { useAvailableConstantsMetadata } from '@/utils/metadata/useAvailableConstants';

interface IKanbanSettingsState extends IKanbanProps { }

const KanbanSettings: FC<ISettingsFormFactoryArgs<IKanbanProps>> = (props) => {
  const { values } = useSettingsForm<IKanbanProps>();
  const {readOnly} = props;

  const getStyleConstants = useAvailableConstantsMetadata({
    addGlobalConstants: false,
    standardConstants: [
      SheshaConstants.globalState,
      SheshaConstants.formData,
    ]
  });
  
  return (
    <>
      <SettingsCollapsiblePanel header='Display'>
         <SettingsFormItem key='entityType' name="entityType" label='Entity Type' jsSetting>
          <Autocomplete dataSourceType='url' dataSourceUrl="/api/services/app/Metadata/EntityTypeAutocomplete" />
        </SettingsFormItem>
              <SettingsFormItem name="modalFormId" label="Render Form" jsSetting>
            <FormAutocomplete readOnly={readOnly} convertToFullId={true} />
          </SettingsFormItem>
          <MetadataProvider modelType={values.entityType?.name}>
          <SettingsFormItem name="groupingProperty" label="Grouping property" jsSetting>
            <PropertyAutocomplete readOnly={props.readOnly} autoFillProps={false} />
          </SettingsFormItem>
        </MetadataProvider>
      </SettingsCollapsiblePanel>

      <SettingsCollapsiblePanel header='Columns'>
        <SettingsFormItem name="referenceList" label="Reference List" style={{ width: '100%' }}>
          <Autocomplete
            dataSourceType="entitiesList"
            typeShortAlias="Shesha.Framework.ReferenceList"
            filter='{"and":[{"==":[{"var":"isLast"},true]}]}'
            readOnly={values.readOnly}
          />
        </SettingsFormItem>
        <SettingsFormItem name="items">
          <RefListItemSelectorSettingsModal referenceList={values.referenceList} readOnly={values.readOnly} />
        </SettingsFormItem>
      </SettingsCollapsiblePanel>

      <SettingsFormItem name="readonly" label="Readonly" valuePropName="checked" jsSetting>
          <Checkbox disabled={values.readOnly} />
      </SettingsFormItem>
      <SettingsFormItem name="collapsible" label="Collapsible" valuePropName="checked" jsSetting>
          <Checkbox disabled={values.readOnly} />
      </SettingsFormItem>
      <SettingsFormItem name="showIcons" label="Show Icons?" valuePropName="checked" jsSetting>
          <Checkbox disabled={values.readOnly} />
      </SettingsFormItem>
      <SettingsFormItem name="allowNewRecord" label="Allow New Record" valuePropName="checked" jsSetting>
          <Checkbox disabled={values.readOnly} />
      </SettingsFormItem>

      <Show when={values.allowNewRecord}>
       <MetadataProvider modelType={values.entityType.name}>
          <SettingsFormItem name="createFormId" label="Form" jsSetting>
            <FormAutocomplete readOnly={readOnly} convertToFullId={true} />
          </SettingsFormItem>
        </MetadataProvider>
      </Show>

       {/* Column Styles */}
      <SettingsCollapsiblePanel header='Column Styles'>
      <SettingsFormItem name="columnStyle" label="Style">
            <CodeEditor
              readOnly={readOnly}
              mode="dialog"
              label="Style"
              propertyName="style"
              description="CSS Style"
              exposedVariables={[
                {
                  id: '788673a5-5eb9-4a9a-a34b-d8cea9cacb3c',
                  name: 'data',
                  description: 'Form data',
                  type: 'object',
                },
              ]}
              wrapInTemplate={true}
                templateSettings={{
                  functionName: 'getStyle'
                }}
                availableConstants={getStyleConstants}
            />
          </SettingsFormItem>
        <SettingsFormItem name="gap" label="Gap" jsSetting>
            <Input type='number' disabled={readOnly}  />
          </SettingsFormItem>
          <SettingsFormItem name="height" label="Height" jsSetting>
            <Input type='number' disabled={readOnly}  />
          </SettingsFormItem>
          <SettingsFormItem name="minHeight" label="Min Height" jsSetting>
            <Input type='number' disabled={readOnly}  />
          </SettingsFormItem>
          <SettingsFormItem name="maxHeight" label="Max Height" jsSetting>
            <Input type='number' disabled={readOnly}  />
          </SettingsFormItem>
          <SettingsFormItem name="columnBackgroundColor" label="Background Color" jsSetting >
              <ColorPicker readOnly={readOnly} allowClear />
          </SettingsFormItem>
      </SettingsCollapsiblePanel>

      {/* Header Styles */}
      <SettingsCollapsiblePanel header='Header Styles'>
        <SettingsFormItem name="headerStyle" label="Style">
            <CodeEditor
              readOnly={readOnly}
              mode="dialog"
              label="Style"
              propertyName="style"
              description="CSS Style"
              exposedVariables={[
                {
                  id: '788673a5-5eb9-4a9a-a34b-d8cea9cacb3c',
                  name: 'data',
                  description: 'Form data',
                  type: 'object',
                },
              ]}
              wrapInTemplate={true}
                templateSettings={{
                  functionName: 'getStyle'
                }}
                availableConstants={getStyleConstants}
            />
          </SettingsFormItem>
          <SettingsFormItem name="fontSize" label="Font Size" jsSetting>
            <Input type='number' disabled={readOnly}  />
          </SettingsFormItem>
          <SettingsFormItem name="headerBackgroundColor" label="Background Color" jsSetting >
              <ColorPicker readOnly={readOnly} allowClear />
            </SettingsFormItem>

          <SettingsFormItem name="fontColor" label="Font Color" jsSetting >
              <ColorPicker readOnly={values.readOnly} allowClear />
          </SettingsFormItem>
      </SettingsCollapsiblePanel>
    </>
  );
};

export const KanbanSettingsForm: FC<ISettingsFormFactoryArgs<IKanbanProps>> = (props) => {
  return SettingsForm<IKanbanSettingsState>({ ...props, children: <KanbanSettings {...props} /> });
};
