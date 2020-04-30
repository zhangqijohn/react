# 使用方式
在父级中调用
```
// tableName: 表格名称 -- 用于获取属性字段
// advancedQuery: 暴露出一个方法,调用父级的查询函数
// Provider: 提供store
import NewAdvancedFilter from "@/components/NewAdvancedFilter/Index"
import React, { useState, useRef } from 'react'
import {Form, Button} from 'antd'

import store from '@/store/store'
import {Provider} from 'react-redux'

const parentComp = (props:any) => {
  const advancedFilterResult = useSelector((state:any) => state.advancedFilterResult)
  const curAdvancedFilterResult = useRef({})
  curAdvancedFilterResult.current = advancedFilterResult
  const [form] = Form.useForm()

  const queryHandle = async () => {
    const value = await form.validateFields()
    const newParams = Object.assign({},
      value,
      {advancedParams: curAdvancedFilterResult.current}
    )
    ...
  }
  return (
    <Provider store={store}>
      <Form
      form={form}
      component={false}
      name={`form${props.formid}`}
      >
        ...
        <NewAdvancedFilter tableName="HomePage2" advancedQuery={() => queryHandle()}/>
      </Form>
    </Provider>
  )
}

```

# 高级组件的介绍
## 用户模板: ./components/Header组件
1.下拉数据格式如下:
templateNameOptions: [
  {value: 1, label: '常用查询【删除】'},
  {value: 2, label: 'A查询【删除】'},
  {value: 3, label: 'B查询【删除】'}
]
2.更新获取到的数据结构如下:
filterList: 查询条件list
filterSelectType: 且或关系
filterType: 查询类型(等于\大于\不等于...)
attributeName: 字段名称
filterValue1: 相关字段的查询条件值1
filterValue2: 相关字段的查询条件值1(只有在查询类型为范围于的情况下,才可填)

initData = {
  filterList: [
    {
      filterType: 3,  
      attributeName: 5,
      filterValue1: '模板一',
      filterValue2: '',
    }
  ],
  filterSelectType: 1
}

## 查询参数主体部分: ./components/Main组件
1.且或关系组件FilterSelectType: 获取filterSelectType
2.构造其他查询数据结构
获取的数据结构: initData的数据结构
构造成预览结构(结构参考了table格式,后期做优化):
[
  {
    key: "",
    filterType: 1,
    attributeName: 1,
    filterValue1: "",
    filterValue2: "",
    rowItem: [
      {
        title: "字段名称"
        dataIndex: "attributeName"
        editable: true
        inputType: "select",
        record: {
          key: ""
          filterType: 1
          attributeName: 1
          filterValue1: ""
          filterValue2: ""
        }
      },
      {
        title: "条件关系",
        dataIndex: "filterType",
        editable: true,
        inputType: "select",
        record: {
          key: "",
          filterType: 1,
          attributeName: 1,
          filterValue1: "",
          filterValue2: "",
        }
      },
      {
        title: "条件值1",
        dataIndex: "filterValue1",
        editable: true,
        record: {
          key: "",
          filterType: 1,
          attributeName: 1,
          filterValue1: "we",
          filterValue2: "",
        }
      },
      {
        title: "条件值2"
        dataIndex: "filterValue2"
        editable: true,
        record: {
          key: "",
          filterType: 1,
          attributeName: 1,
          filterValue1: "",
          filterValue2: "",
        }
      }
    ]
  }
]

# 底部操作(模板名称和确认查询): ./components/Footer组件
保存模板:
return {
  templateName: templateName,
  filterParams: 形如initData的结构查询数据ParamLists
}

确认:
return: 形如initData的结构查询数据ParamLists
调用父级查询函数