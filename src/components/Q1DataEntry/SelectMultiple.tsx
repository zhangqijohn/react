import React, {useState} from 'react'
import {Select, Divider, Button} from 'antd'

interface SelectMultipleProps {
    options: any[] // 选项
    values?: any // 若是JSON数据，则需要指定values的key
    label?: any // 若是JSON数据,还需指定显示对应的label
}

function SelectMultiple(props: SelectMultipleProps) {
    let {options, values, label} = {...props}
    const [optionS, setOptionS] = useState(options)
    const [selectvalue, setSelectvalue] = useState<any[]>([])
    const [searchTxt, setSearchTxt] = useState('')

    const handleChange = (v: any) => {
        setSelectvalue(v)
    }
    const handleSearch = (v: any) => {
        // 根据查找字段全选为完成
        setSearchTxt(v)
        setOptionS(optionS.filter(item => item[values].toString().indexOf(searchTxt) > -1))
    }
    const handleClear = (v: any) => {
        setSelectvalue([])
    }
    const handleSelectAll = () => {
        let result: any[] = []
        if (searchTxt) {
            result = optionS
                .filter((item, index) => item[values].toString().indexOf(searchTxt) > -1)
                .map((item: any) => item[values])
            setSearchTxt('')
        } else {
            result = optionS.map((item: any) => (values ? item[values] : item))
        }
        setSelectvalue(result)
    }
    const reverseSelect = () => {
        let result = JSON.parse(JSON.stringify(optionS))
        selectvalue.forEach(x => {
            for (let i = result.length - 1; i >= 0; i--) {
                if (result[i][values] === x) {
                    result?.splice(i, 1)
                }
            }
        })
        const resultkey = result.map((item: any) => item[values])
        setSelectvalue(resultkey)
    }

    return (
        <Select
            value={selectvalue}
            style={{minWidth: 240}}
            placeholder="请选择"
            mode="multiple"
            allowClear
            showArrow={true}
            showSearch={true}
            maxTagCount={1}
            maxTagTextLength={7}
            onChange={handleChange}
            onSearch={handleSearch}
            dropdownRender={menu => (
                <div>
                    {menu}
                    <Divider style={{margin: '4px 0'}} />
                    <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                        <span style={{marginRight: 4}}>共{optionS.length}行</span>
                        <Button size="small" style={{marginRight: 4}} onClick={handleClear}>
                            清除
                        </Button>
                        <Button size="small" style={{marginRight: 4}} onClick={reverseSelect}>
                            反选
                        </Button>
                        <Button size="small" onClick={handleSelectAll}>
                            全选
                        </Button>
                    </div>
                </div>
            )}
        >
            {optionS.map((item: any, index: number) => (
                <Select.Option key={index.toString()} value={values ? item[values] : item}>
                    {label ? item[label] : item}
                </Select.Option>
            ))}
        </Select>
    )
}

export default SelectMultiple
