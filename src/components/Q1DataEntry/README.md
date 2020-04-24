# Q1Form组件说明


## 使用方法：
```javascript
input

```

## 参数说明
以下为新增参数，其他请参照[官网api](https://ant.design/components/table-cn/#API)
1. input、textArea、search、password 参数
params： [https://ant.design/components/input-cn/#API](https://ant.design/components/input-cn/#API)

> 注意：若使用TS，则需扩展ColumnProps参数，这里使用ColumnPropsSwith

2. rate params参数
这里仅简单实现，支持以下参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|defaultValue|默认值  |  number  | undefined|
|allowClear | 允许清除|  boolean | true     |
|allowHalf  | 允许半选|  boolean | false    |

3. radio params参数
这里简单实现，仅支持以下2个参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|defaultValue|默认值  |  any     | undefined|
|radioOption |选择数组|  []      |          |

4. switch params参数
这里简单实现，仅支持以下3个参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|defaultChecked|初始是否选中| boolean  | false|
|disabled | 是否禁用  | boolean  | false|
|sizeSwitch|开关大小| default small|default |

5. switch params参数
这里简单实现，仅支持以下5个参数

|  参数    |   说明   |   类型   |  默认值  |
|:--------:|:--------:|:--------:|:--------:|
|disabled|禁用状态| boolean  | false|
|vertical | 垂直方向  | boolean  | false|
|step|步长| number/null |1 |
|range|双滑块模式| boolean |default |
|defaultValue|初始取值| number/[number, number]|0 or [0, 0] |
|tooltipVisible|显示取值| Boolean|false |

## 单元格默认占位符
在全局样式下新增以下css
```
/* table 组件空单元格自动填充占位符‘–’*/
.ant-table-tbody > tr > td:empty:before {
  content: '-';
}
.ant-table-tbody > tr > td *:empty:before {
  content: '-';
}
```
