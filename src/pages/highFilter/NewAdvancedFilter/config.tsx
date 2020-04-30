import {FilterType, Item, FormItemData} from './interface'

export const filterTypeOptions:FilterType[] = [
  {value: 0, label: '不等于'},
  {value: 1, label: '等于'},
  {value: 2, label: '大于等于'},
  {value: 3, label: '小于等于'},
  {value: 4, label: '模糊'},
  {value: 5, label: '包含'},
  {value: 6, label: '范围于'}
]
export const selectTypeOptions:FilterType[] = [
  {value: 1, label: 'OR'},
  {value: 2, label: 'AND'}
]

export const originObj = {
  key: '',
  filterType: 1,
  attributeName: 1,
  filterValue1: '',
  filterValue2: '',
}

export const attributeNameOptions:FilterType[] = [
  {value: 1, label: 'A'},
  {value: 2, label: 'B'},
  {value: 3, label: 'C'}
]

export const filterModule:FilterType[] = [
  {value: 1, label: '常用查询【删除】'},
  {value: 2, label: 'A查询【删除】'},
  {value: 3, label: 'B查询【删除】'}
]
 
export const columns:FormItemData[] = [
  {
    title: '字段名称',
    dataIndex: 'attributeName',
    editable: true,
    inputType: 'select',
    record: {
      key: '',
      filterType: 1,
      attributeName: 1,
      filterValue1: '',
      filterValue2: '',
    }
  },
  {
    title: '条件关系',
    dataIndex: 'filterType',
    editable: true,
    inputType: 'select',
    record: {
      key: '',
      filterType: 1,
      attributeName: 1,
      filterValue1: '',
      filterValue2: '',
    }
  },
  {
    title: '条件值1',
    dataIndex: 'filterValue1',
    editable: true,
    record: {
      key: '',
      filterType: 1,
      attributeName: 1,
      filterValue1: '',
      filterValue2: '',
    }
  },
  {
    title: '条件值2',
    dataIndex: 'filterValue2',
    editable: true,
    record: {
      key: '',
      filterType: 1,
      attributeName: 1,
      filterValue1: '',
      filterValue2: '',
    }
  }
]
