import {FilterType, Item, EditableRowProps, EditableCellProps} from './interface'

export const filterTypeOptions:FilterType[] = [
  {value: 0, label: '不等于'},
  {value: 1, label: '等于'},
  {value: 2, label: '大于等于'},
  {value: 3, label: '小于等于'},
  {value: 4, label: '模糊'},
  {value: 5, label: '包含'}
]
export const selectTypeOptions:FilterType[] = [
  {value: 1, label: 'OR'},
  {value: 2, label: 'AND'}
]
export const attributeNameOptions:FilterType[] = [
  {value: 1, label: 'A'},
  {value: 2, label: 'B'},
  {value: 3, label: 'C'}
]
export const originObj = {
  key: '',
  slectRangeMin: '(',
  filterType: '',
  attributeName: '',
  filterValue1: '',
  filterValue2: '',
  slectRangeMax: ')',
  selectType: '',
}
const originData: Item[] = [];
const originDataTemp = JSON.parse(JSON.stringify(originObj));
for (let i = 0; i < 1; i++) {
  originDataTemp.key = i.toString()
  originData.push(originDataTemp);
}
export const tableOriginData = originData

export const columns = [
  {
    title: '',
    dataIndex: 'slectRangeMin',
    editable: false
  },
  {
    title: '字段名称',
    dataIndex: 'attributeName',
    editable: true,
    inputType: 'select'
  },
  {
    title: '条件关系',
    dataIndex: 'filterType',
    editable: true,
    inputType: 'select'
  },
  {
    title: '条件值1',
    dataIndex: 'filterValue1',
    editable: true
  },
  {
    title: '条件值2',
    dataIndex: 'filterValue2',
    editable: true
  },
  {
    title: '',
    dataIndex: 'slectRangeMax',
    editable: false,
  },
  {
    title: '与或关系',
    dataIndex: 'selectType',
    editable: true,
    inputType: 'select'
  }
]

export const filterModule:FilterType[] = [
  {value: 1, label: '常用查询【删除】'},
  {value: 2, label: 'A查询【删除】'},
  {value: 3, label: 'B查询【删除】'}
]

export const filterModuleDataSource:Item[] = [
  {
    key: '1',
    slectRangeMin: '(',
    filterType: 1,
    attributeName: 2,
    filterValue1: '1111',
    filterValue2: '2222',
    slectRangeMax: ')',
    selectType: 1,
  },
  {
    key: '2',
    slectRangeMin: '(',
    filterType: 3,
    attributeName: 3,
    filterValue1: '3333',
    filterValue2: '4444',
    slectRangeMax: ')',
    selectType: 2,
  }
] 