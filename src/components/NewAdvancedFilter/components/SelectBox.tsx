import React from 'react';
import { Select } from 'antd';
import {FilterType} from '../interface'
import {
  filterTypeOptions,
  selectTypeOptions,
  attributeNameOptions } from '../config'
const initSelect = (props:any) => {
  const type = props.type
  const formItemName = props.formItemName
  let optionMap:any = {
    filterType: filterTypeOptions,
    selectType: selectTypeOptions,
    attributeName: attributeNameOptions
  }
  // attributeNameOptions 模拟数据
  let options:FilterType[] =  optionMap[type]
  return (
    <>
      <Select
        defaultValue={props.record[type] || options[0].value}
        style={{ width: 120 }}
        onChange={(value:string | number) => props.selectTypeChange(value, formItemName)}>
        {
          options.map((item:FilterType, index:number) => (
            <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
          ))
        }
      </Select>
    </>
  )
}
export default initSelect