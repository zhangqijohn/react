import React from 'react'
import { Form } from 'antd'
import {FormItemData} from '../interface'
export const EditableContext = React.createContext<any>({})
interface EditableRowType extends FormItemData {
  formlistid: string;
}
export const EditableRow:any = (props:EditableRowType) => {
  const [form] = Form.useForm();
  const initValue = {
    filterType: 1,
    attributeName: 1
  }
  return (
    <Form
      form={form}
      component={false}
      initialValues={initValue}
      name={`form${props.formlistid}`}>
      <EditableContext.Provider value={form}>
        <div {...props}/>
      </EditableContext.Provider>
    </Form>
  )
}