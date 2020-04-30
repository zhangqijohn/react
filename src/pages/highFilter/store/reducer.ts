/**
 * 通过判断Action的type字段，执行不同的逻辑处理，reducer是一个纯函数，不能修改传入的state的值
 */
import {
  ADD_TODO,
  UPDATE_ADVANCEDFILTER,
  SET_TEMPLATENAME,
  CHANGE_FILTERSELECT,
  CHANGE_ADVFILTERVISIBLE,
  GET_ADVANCEDFILTERRESULT} from './actionType'

interface ActionType {
  type: string;
  [propName:string]: any
}
interface NewState {
  [propName:string]: any
}
// 对原有的上一次的state做一次深拷贝,在Redux中,reducer不允许直接修改state  
// 创建了一个newState完全复制了state,通过对newState的修改避免了对state的修改
// 将新的value值赋值给newState
const reducer = (state = {}, action:ActionType) => {
  let newState:NewState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case ADD_TODO:
      newState.stateInfo = action.stateInfo
      return newState
    case UPDATE_ADVANCEDFILTER:
      newState.filterDataSource = action.filterDataSource
    return newState
    case SET_TEMPLATENAME:
      newState.templateName = action.templateName
      return newState
    case CHANGE_FILTERSELECT:
      newState.filterSelectType = action.filterSelectType
      return newState
    case CHANGE_ADVFILTERVISIBLE:
      newState.advancedFilterVisible = action.advancedFilterVisible
      return newState
    case GET_ADVANCEDFILTERRESULT:
      newState.advancedFilterResult = action.advancedFilterResult
      return newState
    default:
      return state
  }
}
export default reducer