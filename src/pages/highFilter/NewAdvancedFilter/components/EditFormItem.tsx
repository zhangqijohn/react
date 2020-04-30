import React, {useRef, useContext} from 'react'
import {FormItemData} from '../interface'
import {EditableContext} from './EditableRow'
import { Form, Input } from 'antd'
import InitSelect from './SelectBox'
// 编辑单元格
const EditFormItem:any = (props:FormItemData) => {
  const handleSave = (colData:FormItemData) => {
    props.saveColData(colData)
  }
  const inputRef = useRef<any>();
  const form = useContext(EditableContext) as any;

  const editCol = (data:any) => {
    form.setFieldsValue(data);
  } 
  
  const saveCol = async (type:string) => {
    const values = await form.getFieldsValue()
    const newValues:any = {}
    let newK = ''
    for(let k in values) {
      newK = k.split('_')[0]
      if (type === newK) newValues[newK] = values[k] || ''
    }
    newValues['key'] = props.record.key
    handleSave(newValues);
  }
  
  const editHandle = (value:string | number, formItemName:string) => {
    const attrType = formItemName.split('_')[0] || ''
    editCol({ [`${formItemName}`]: value })
    saveCol(attrType)
  }

  const inputBlurHandle = (e:any, formItemName:string) => {
    const value = e.target.value || ''
    editHandle(value, formItemName)
  }

  const selectTypeChange = (value:string | number, formItemName:string) => {
    const itemTemp = formItemName.split('_')
    // 当前选择框为"查询范围"栏，且值不为"范围于",则filterValue2为空
    if (value !== 6 && itemTemp[0] === 'filterType') {
      const inputKeyName = 'filterValue2_' + itemTemp[1]
      editCol({ [`${inputKeyName}`]: '' })
    }
    editHandle(value, formItemName)
    
  }
  
  let childNode: React.ReactNode = null;
  if (props.editable) {
    const dataIndex = props.dataIndex
    const formItemName = `${dataIndex}_${props?.record?.key}`;
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={formItemName}
        rules={[
          {
            required: true,
            message: `${props.title} is required.`,
          },
        ]}
      >
        {props.inputType === 'select' ? (
            <InitSelect
              type={dataIndex}
              record={props.record}
              selectTypeChange={selectTypeChange}
              formItemName={formItemName}/>
          ) : (
            props.dataIndex !== 'filterValue2' ?
              <Input
                ref={inputRef}
                style={{width:120}}
                onBlur={(e:any) => inputBlurHandle(e, formItemName)} 
                defaultValue={props.record[dataIndex]}
                />
              :
              <Input
                ref={inputRef}
                style={{width:120}}
                onBlur={(e:any) => inputBlurHandle(e, formItemName)} 
                defaultValue={props.record[dataIndex]}
                disabled={props.filterType !== 6}/>
          )
        }
      </Form.Item>
    )
  }
  return <>{childNode}</>;
}
export default EditFormItem