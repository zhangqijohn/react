import React from 'react';
import { Form, Input, Button, message } from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {SET_TEMPLATENAME, CHANGE_ADVFILTERVISIBLE, GET_ADVANCEDFILTERRESULT} from '@/store/actionType'
import {validateDatasError, getSubmitData} from '../util'
import {FilterResult} from '../interface'
const FilterFooter = (props:any) => {
  const [footerForm] = Form.useForm();
  const curStore = useSelector((state:any) => state)
  const dispatch = useDispatch()
  const formItemColumns = curStore.filterDataSource
  const templateName = curStore.templateName
  const filterSelectType = curStore.filterSelectType
  const setTemplateNameHandle = (event:any) => {
    const value = event.target.value
    dispatch({
      type: SET_TEMPLATENAME,
      templateName: value
    })
  }
  
  const saveTemplateHandle = () => {
    // 是否存在空值或者相同筛选条件
    let errorStr:string = validateDatasError(formItemColumns)
    if (!templateName) {
      message.error('请输入需要保存的模板名称！')
      return
    } else if (errorStr !== 'ok') {
      message.error(errorStr)
      return
    }
    submitAfter(templateName)
    // saveTemplateApi(userId, templateName, formItemColumns)
  }
  const submitHandle = () => {
    // 是否存在空值或者相同筛选条件
    let errorStr:string = validateDatasError(formItemColumns)
    if (errorStr !== 'ok') {
      message.error(errorStr)
      return
    }
    closeAdvFilterMode()
    submitAfter()
  }
  const submitAfter = (templateName?:string) => {
    const resultData:FilterResult = {
      filterList: getSubmitData(formItemColumns),
      filterSelectType: filterSelectType
    }
    if (templateName) {
      resultData['templateName'] = templateName 
    }
    dispatch({
      type: GET_ADVANCEDFILTERRESULT,
      advancedFilterResult: resultData
    })
    console.log(curStore)
    // 调用父级组件去获取查询结果
    props.advancedQuery()
  } 

  const closeAdvFilterMode = () => {
    dispatch({
      type: CHANGE_ADVFILTERVISIBLE,
      advancedFilterVisible: false
    })
  }
  return (
    <>
      <Form form={footerForm}>
        <div className="filter-footer">
            <div style={{flex: 1}}>
              <Form.Item
                label="模板名称"
                name="templateName"
                style={{width: 360}}
              >
                <Input style={{width: 200, marginRight: 10}} defaultValue={templateName} onBlur={setTemplateNameHandle}/>
                <Button type="primary" onClick={() => saveTemplateHandle()}>保存</Button>
              </Form.Item>
            </div>
            <div>
              <Button type="primary" onClick={() => submitHandle()} style={{marginRight: 10}}>确认</Button>
              <Button onClick={() => closeAdvFilterMode()}>取消</Button>
            </div>
        </div>
      </Form>
    </>
  )
}
export default FilterFooter