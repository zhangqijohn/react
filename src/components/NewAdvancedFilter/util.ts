import {Item, FormItemData} from './interface'
import {columns} from './config'
function getColData (key:string, colForm:FormItemData[], rowItem:Item) {
  const colFormTemp:FormItemData[] = JSON.parse(JSON.stringify(colForm));
  let dataIndex = ''
  for(let k = 0; k < colFormTemp.length; k++) {
    dataIndex = colFormTemp[k].dataIndex
    colFormTemp[k].record.key = key
    colFormTemp[k].record[dataIndex] = rowItem[dataIndex]
  }
  return colFormTemp
}

// 每个form的行数和列数数据相关联
/**
 * @param colForm 列数据
 * @param rowForm 行数据
 * @param addRowIndex 新增行数时，当前行在总list的位置
 */
export function getInitDataSource (colForm:FormItemData[], rowForm:Item[], type?:string) {
  const newRowForm: Item[] = [];
  const rowFormTemp:Item[] = JSON.parse(JSON.stringify(rowForm));
  let addRowIndex = rowFormTemp.length - 1 + 1
  let keyName:any = ''
  let time = (new Date()).getTime()
  for (let i = 0; i < rowFormTemp.length; i++) {
    // 新增是最后一条
    if (type === 'add') {
      rowFormTemp[i]['key'] = (addRowIndex + time).toString()
    }
    // 编辑情况下不改变key值
    if (type !== 'add' && type !== 'edit') {
      rowFormTemp[i]['key'] = (i + time).toString()
    }
    keyName = rowFormTemp[i]['key']
    rowFormTemp[i]['rowItem'] = getColData(keyName, colForm, rowFormTemp[i])
    newRowForm.push(rowFormTemp[i]);
  }
  return newRowForm
}

// export const formItemColumns = getInitDataSource(columns, tableOriginData)


export function getSubmitData(datasource:Item[]) {
  let tempData:Item[] = JSON.parse(JSON.stringify(datasource))
  let item:any = {}
  for (let i = 0; i < tempData.length; i++) {
    item = tempData[i]
    delete item.rowItem
    delete item.key
  }
  return tempData
}
function getNoneValuesFlag(row:Item) {
  let isNoneValue = false
  // 如果筛选的条件关系是范围于，则filterValue2有值
  for (let k in row) {
    if ((row.filterType === 6 && !row[k]) ||
      (!row[k] && k !== 'filterValue2')) {
      isNoneValue = true
      break 
    }
  }
  return isNoneValue
}
function validateHasNone(data:any) {
  let isNoneValue = false
  let item:any = {}
  for (let i = 0; i < data.length; i++) {
    item = data[i]
    isNoneValue = getNoneValuesFlag(item)
    if (isNoneValue) break
  }
  return isNoneValue
}
function getRowByJoin(row:Item) {
  let rowDataJoinArr:any = []
  for (let k in row) {
    rowDataJoinArr.push(row[k])
  }
  return rowDataJoinArr.join('|')
}
function validateHasEqual(tempData:any) {
  let hasEqualFilter:Array<any> = []
  let rowJoinStr:string = ''
  tempData.forEach((tempItem:any) => {
    rowJoinStr = getRowByJoin(tempItem)
    if (hasEqualFilter.indexOf(rowJoinStr) === -1) {
      hasEqualFilter.push(rowJoinStr)
    } else {
      hasEqualFilter.push(true)
    }
  })
  return hasEqualFilter
}
export const validateDatas = (dataLists:any) => {
  let tempData:any = getSubmitData(dataLists)
  let hasEqualFilter:Array<any> = []
  let isNoneValue = false
  // 校验是否有空值
  isNoneValue = validateHasNone(tempData)
  // 校验是否有相同筛选项
  hasEqualFilter = validateHasEqual(tempData)
  if (hasEqualFilter.indexOf(true) > -1) {
    return 'hasEqualValues'
  }
  if (isNoneValue) {
      return 'hasNoneValues'
  }
  return 'success'
}

export const validateDatasError = (dataLists:any) => {
  let isError:string = validateDatas(dataLists)
  if (isError === 'hasEqualValues' || isError === 'hasNoneValues') {
    const errorStr = isError === 'hasNoneValues' ? '未填写完参数值，请填写完整！' : '存在相同的查询条件，请重新输入！'
    return errorStr
  }
  return 'ok'
}