import React from 'react';
import { Col, Row, Button, message } from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {UPDATE_ADVANCEDFILTER} from '@/store/actionType'
import {ColItem} from '../interface'
import { originObj, columns } from "../config";
import {getInitDataSource} from '../util'
import {EditableRow} from './EditableRow'
import EditFormItem from './EditFormItem'
import FilterSelectType from './FilterSelectType'
const FilterMain = () => {
  const curStore = useSelector((state:any) => state)
  const dispatch = useDispatch()
  // 初始化数据
  // getFilterDataSourceAPI(PageTableName, userId) --> 获取数据filterDataSource
  const formItemColumns = curStore.filterDataSource
  // 保存修改的数据
  const handleSave = (colItem:ColItem) => {
    const newData:any = getFormList()
    const index = newData.findIndex((item:any) => colItem.key === item.key);
    const item = newData[index];
    // 如果查询范围类型不为"范围于",则filterValue2的值为空
    if (colItem?.filterType !== 6) {
      item['filterValue2'] = ''
      for (let k in item.rowItem) {
        if (item.rowItem[k].dataIndex === 'filterValue2') {
          item.rowItem[k].record.filterValue2 = ''
        }
      }
    }
    newData.splice(index, 1, {
      ...item,
      ...colItem,
    });
    // 构造成最终数据结构
    const getData = getInitDataSource(columns, newData, 'edit')
    dispatch({
      type: UPDATE_ADVANCEDFILTER,
      filterDataSource: getData
    })
  }
  

  const getFormList = () => {
    return JSON.parse(JSON.stringify(formItemColumns))
  }
  // 新增筛选条件
  const addFilterHandel = (e:any) => {
    let newData = getFormList();
    const newRowData = getInitDataSource(columns, [originObj], 'add')
    newData.push(newRowData[0])
    dispatch({
      type: UPDATE_ADVANCEDFILTER,
      filterDataSource: newData
    })
  }
  // 删除筛选条件
  const deleteFilterHandel = (e:any) => {
    const id = e.target.getAttribute('data-id').split('__')[1]
    let newData = getFormList();
    const index = newData.findIndex((item:any) => id === item.key);
    newData.splice(index, 1)
    dispatch({
      type: UPDATE_ADVANCEDFILTER,
      filterDataSource: newData
    })
  }
  return (
    <div className="contain-wrap">
      <FilterSelectType/>
      <div className="contain-right">
        {
          formItemColumns.map((row:any, rowIndex:number) => (
            <EditableRow key={rowIndex} formlistid={row.key}>
              <Row>
                {
                  row.rowItem.map((item:any, index:number) => (
                    <Col key={index} style={{marginRight:10}}>
                      <EditFormItem {...item} filterType={row.filterType} saveColData={handleSave} />
                    </Col>
                  ))
                }
                <Col className="right-btn">
                  <Button data-id={`add__${row.key}`} onClick={(e) => addFilterHandel(e)} style={{marginRight:10}}>新增</Button>
                  <Button
                  data-id={`delete__${row.key}`}
                  onClick={(e) => deleteFilterHandel(e)}
                  disabled={formItemColumns.length === 1}>删除</Button>
                </Col>
              </Row>
            </EditableRow>
          ))
        }
      </div>
    </div>
  )
}
export default FilterMain