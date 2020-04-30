import React, {useEffect} from 'react';
import { Form, Select } from 'antd';
import {filterModule as createdModule, columns} from '../config'

import {FilterType, Item} from '../interface'
import {useDispatch} from 'react-redux'
import {UPDATE_ADVANCEDFILTER, CHANGE_FILTERSELECT} from '@/store/actionType'
import {getInitDataSource} from '../util'
import {originObj} from '../config'
const { Option } = Select;
const FilterHeader = () => {
  const dispatch = useDispatch()
  const [headerForm] = Form.useForm();
  // 模拟的数据
  /**
   * useType: 用户已建高级查询模板,则数据为createdModule,否则为空
   */
  let useType = ''
  const filterModule:any = useType === 'createdModule' ? createdModule : []
  const initDataMap:any = {
    1: {
      filterList: [
        {
          filterType: 3,
          attributeName: 5,
          filterValue1: '模板一一一一',
          filterValue2: '',
        }
      ],
      filterSelectType: 1
    },
    2: {
      filterList: [
        {
          filterType: 6,
          attributeName: 2,
          filterValue1: '模板二二二二',
          filterValue2: '222222222',
        }
      ],
      filterSelectType: 2
    },
    3: {
      filterList: [
        {
          filterType: 4,
          attributeName: 3,
          filterValue1: '模板三三三三',
          filterValue2: '',
        }
      ],
      filterSelectType: 1
    }
  }
  
  useEffect(() => {
    const initData = filterModule.length ? initDataMap[1].filterList : [originObj]
    const resultData = getInitDataSource(columns, initData)
    dispatch({
      type: UPDATE_ADVANCEDFILTER,
      filterDataSource: resultData
    })
    dispatch({
      type: CHANGE_FILTERSELECT,
      filterSelectType: initDataMap[1].filterSelectType
    })
  }, [])

  const filterTemplateTypeChange = async (templateId:string | number) => {
    let tableOriginData:Item[] = []
    // 根据模板id、用户id、表名获取对应的高级筛选模板
    // getCurTemplateDataApi(templateId, userId, tableName)
    setTimeout(() => {
      tableOriginData = initDataMap[templateId].filterList
      const resultData = getInitDataSource(columns, tableOriginData)
      dispatch({
        type: UPDATE_ADVANCEDFILTER,
        filterDataSource: resultData
      })
      dispatch({
        type: CHANGE_FILTERSELECT,
        filterSelectType: initDataMap[templateId].filterSelectType
      })
    }, 500)
  }
  return (
    <>
      <Form form={headerForm} className="advanced-filter-header">
        <Form.Item
          label="用户模板"
          name="userTemplate"
          style={{width: 290}}
        >
          {/* defaultValue={filterModule[0].value} */}
          <Select
            style={{ width: 200 }}
            onChange={(value:string | number) => filterTemplateTypeChange(value)}>
            {
              filterModule.map((item:FilterType, index:number) => (
                <Option value={item.value} key={index}>{item.label}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </>
  )
}
export default FilterHeader