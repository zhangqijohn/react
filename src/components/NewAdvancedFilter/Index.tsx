import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import {useSelector, useDispatch} from 'react-redux'
import {CHANGE_ADVFILTERVISIBLE} from '@/store/actionType'
import {Modal, Button} from 'antd'
import {FilterProps} from './interface'

const AdvancedFilter = (props:FilterProps) => {
  const curStore = useSelector((state:any) => state)
  const dispatch = useDispatch()
  const advancedFilterVisible = curStore.advancedFilterVisible
  const closeAdvFilterMode = () => {
    dispatch({
      type: CHANGE_ADVFILTERVISIBLE,
      advancedFilterVisible: false
    })
  }
  const advFilterHandle = () => {
    dispatch({
      type: CHANGE_ADVFILTERVISIBLE,
      advancedFilterVisible: true
    })
  }
  const search = () => {
    // 调用父级组件去获取查询结果
    props.advancedQuery()
  }
  return (
    <>
      <Modal
        title="高级筛选"
        visible={advancedFilterVisible}
        width={900}
        footer={<Footer advancedQuery={() => search()}/>}
        onCancel={() => closeAdvFilterMode()}
        >
        <div className="filter-wrap">
          <Header/>
          <Main/>
        </div>
      </Modal>
      <Button onClick={() => advFilterHandle()}>高级筛选</Button>
    </>
  )
}
export default AdvancedFilter