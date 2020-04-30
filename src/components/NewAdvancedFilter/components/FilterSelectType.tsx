import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {CHANGE_FILTERSELECT} from '@/store/actionType'
import { Button } from 'antd'
const FilterSelectType = () => {
  const curStore = useSelector((state:any) => state)
  const dispatch = useDispatch()
  const filterSelectType = curStore.filterSelectType
  const changeSelectType = () => {
    dispatch({
      type: CHANGE_FILTERSELECT,
      filterSelectType: filterSelectType === 1 ? 2 : 1
    })
  }
  return (
    <div className="contain-left">
      <Button className="filter-select-type-btn" onClick={() => changeSelectType()}>{filterSelectType === 1 ? '且' : '或'}</Button>
    </div>
  )
}
export default FilterSelectType