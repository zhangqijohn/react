// 创建一个状态管理仓库
/**
 * createStore函数介绍：用于创建一个保存系统所有状态的Store
 * createStore(reducer, [preloadedState], [enhancer])
 * reducer:接受当前状态和action为输入，负责更新状态的纯函数
 * preloadedState：状态初始值
 * enhancer：Store Enhancer
 */
import {createStore} from 'redux'
import reducer from './reducer'
import {FilterResult} from '@/components/NewAdvancedFilter/interface'

interface InitValues {
  stateInfo: string;
  filterDataSource: FilterResult[],
  templateName: string;
  filterSelectType: number;
  advancedFilterVisible: boolean;
  advancedFilterResult: FilterResult | any;
}
const initValues:InitValues = {
  stateInfo: '',
  filterDataSource: [],
  templateName: '',
  filterSelectType: 1,
  advancedFilterVisible: false,
  advancedFilterResult: {}
}
const store = createStore(reducer, initValues)
export default store