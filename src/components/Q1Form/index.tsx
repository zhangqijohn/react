import React from 'react'
import {Checkbox, Input, Radio, Rate, Select, Slider, Switch} from 'antd'

const {TextArea, Search, Password} = Input

export type SizeS = 'large' | 'middle' | 'small'
export type SizeSwitch = 'default' | 'small'
export type RadioOptionType = { label: any; value: number | string; [key: string]: any }

export interface ParamsType {
    addonAfter?: string | React.ReactNode
    addonBefore?: string | React.ReactNode
    defaultValue?: any
    id?: string
    maxLength?: number
    prefix?: string | React.ReactNode
    size?: SizeS | undefined
    sizeSwitch?: SizeSwitch | undefined
    suffix?: string | React.ReactNode
    placeholder?: string
    value?: string
    disable?: boolean
    allowClear?: boolean
    autoSize?: boolean | { minRows: number; maxRows: number }
    loading?: boolean
    visibilityToggle?: boolean
    radioOption?: RadioOptionType[]
    allowHalf?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    vertical?: boolean
    step?: number
    tooltipVisible?: boolean,
    [key: string]: any
}

export interface InputType {
    params?: ParamsType
    onChange?: (e: any) => void
    onPressEnter?: (e: any) => void
}

export interface RulesType {
    required?: boolean
    message?: string
}

export interface SearchType extends InputType {
    onSearch?: (e: any) => void
}

export interface TextareaType extends SearchType {
    onChange?: (e: any) => void
    onResize?: (e: any) => void
}

export interface JsonType extends TextareaType {
    templateType: string
    id?: number
    label?: string
    name?: string
    rules?: Array<RulesType>
    gameid?: number
    permit?: boolean
}

function Index(props: JsonType) {
    const getType = () => {
        let {templateType, params, permit, ...othenProps} = {...props}
        templateType = templateType.toLocaleLowerCase()
        console.log(templateType);
        if (permit === false) return
        if (templateType === 'input') {
            return <Input {...params} onChange={props.onChange} onPressEnter={props.onPressEnter}/>
        } else if (templateType === 'textarea') {
            const {prefix, addonBefore, addonAfter, placeholder, ...paramsTextArea} = {...params}
            return (
                <TextArea
                    {...paramsTextArea}
                    onChange={props.onChange}
                    onPressEnter={props.onPressEnter}
                    onResize={props.onResize}
                />
            )
        } else if (templateType === 'search') {
            const {addonAfter, ...paramsSearch} = {...params}
            return (
                <Search
                    {...paramsSearch}
                    onChange={props.onChange}
                    onPressEnter={props.onPressEnter}
                    onSearch={props.onSearch}
                />
            )
        } else if (templateType === 'password') {
            const {placeholder, ...paramsTextArea} = {...params}
            return <Password {...paramsTextArea} onChange={() => props.onChange} onPressEnter={props.onPressEnter}/>
        } else if (templateType === 'checkbox') {
            return <Checkbox></Checkbox>
        } else if (templateType === 'select') {
            return <Select></Select>
        } else if (templateType === 'rate') {
            const {defaultValue, allowClear, allowHalf} = {...params}
            return <Rate allowClear={allowClear} defaultValue={defaultValue} allowHalf={allowHalf}
                         onChange={() => props.onChange}/>
        } else if (templateType === 'radio') {
            const {defaultValue, radioOption} = {...params}
            return (
                <Radio.Group name="radiogroup" defaultValue={defaultValue} onChange={() => props.onChange}>
                    {
                        radioOption && radioOption.map((item: RadioOptionType) => {
                            return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                        })
                    }
                </Radio.Group>
            )
        } else if (templateType === 'switch') {
            const {defaultChecked, sizeSwitch} = {...params}
            return <Switch defaultChecked={defaultChecked} size={sizeSwitch}/>
        } else if (templateType === 'slider') {
            const {disabled, vertical, step, defaultValue, tooltipVisible} = {...params}
            return <Slider disabled={disabled} vertical={vertical} step={step} defaultValue={defaultValue} tooltipVisible={tooltipVisible}/>
        }
        // else if (templateType === 'number') {
        //     const {addonAfter, addonBefore, id, maxLength, prefix, size, suffix, placeholder, ...paramsNumber} = {
        //         ...params,
        //     }
        //     return (
        //         <InputNumber<InputNumberProps>
        //             {...paramsNumber}
        //             onChange={props.onChange}
        //             onPressEnter={props.onPressEnter}
        //         />
        //     )
        // }
    }

    return <>{getType()}</>
}

export default Index
