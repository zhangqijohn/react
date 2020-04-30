import {
  ADD_TODO,
  UPDATE_ADVANCEDFILTER,
  SET_TEMPLATENAME,
  CHANGE_FILTERSELECT,
  CHANGE_ADVFILTERVISIBLE,
  GET_ADVANCEDFILTERRESULT
} from './actionType'
import {FilterResult} from '@/components/NewAdvancedFilter/interface'
export const updataState = (text:any) => ({
  type: ADD_TODO,
  stateInfo: text
})

export const updataFilter = (data:any) => ({
  type: UPDATE_ADVANCEDFILTER,
  filterDataSource: data
})

export const setFilterTemplat = (name:string) => ({
  type: SET_TEMPLATENAME,
  templateName: name
})

export const changeFilterSelect = (type:number) => ({
  type: CHANGE_FILTERSELECT,
  filterSelectType: type
})

export const changeAdvFilterVisible = (visible:boolean) => ({
  type: CHANGE_ADVFILTERVISIBLE,
  advancedFilterVisible: visible
})

export const getAdvancedFilterResult = (result:FilterResult) => ({
  type: GET_ADVANCEDFILTERRESULT,
  advancedFilterResult: result
})
