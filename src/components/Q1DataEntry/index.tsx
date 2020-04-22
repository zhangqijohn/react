import React from 'react'
import moment from 'moment'
import {Checkbox, Input, Radio, Rate, Select, Slider, Switch, TimePicker, DatePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';

export type SizeS = 'large' | 'middle' | 'small'
export type SizeSwitch = 'default' | 'small'
export type RadioOptionType = { label: string; value: number | string; [key: string]: any }

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
    tooltipVisible?: boolean
    options?: any
    mode?: 'multiple' | 'tags' /*select*/
    maxTagCount?: number
    maxTagTextLength?: number
    showSearch?: boolean
    showArrow?: boolean
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
    name: string
    id: number
    label?: string
    rules?: Array<RulesType>
    gameid?: number
    permit?: boolean
}

function Index(props: JsonType) {
    const getType = () => {
        let {templateType, params, permit} = {...props}
        templateType = templateType.toLocaleLowerCase()
        if (permit === false) return
        if (templateType === 'input') {
            return <Input {...params} onChange={props.onChange} onPressEnter={props.onPressEnter}/>
        } else if (templateType === 'textarea') {
            const {prefix, addonBefore, addonAfter, placeholder, ...paramsTextArea} = {...params}
            return (
                <Input.TextArea
                    {...paramsTextArea}
                    onChange={props.onChange}
                    onPressEnter={props.onPressEnter}
                    onResize={props.onResize}
                />
            )
        } else if (templateType === 'search') {
            const {addonAfter, ...paramsSearch} = {...params}
            return (
                <Input.Search
                    {...paramsSearch}
                    onChange={props.onChange}
                    onPressEnter={props.onPressEnter}
                    onSearch={props.onSearch}
                />
            )
        } else if (templateType === 'password') {
            return <Input.Password onChange={props.onChange} onPressEnter={props.onPressEnter}/>
        } else if (templateType === 'rate') {
            const {defaultValue, allowClear, allowHalf, disabled} = {...params}
            return <Rate disabled={disabled}
                         allowClear={allowClear}
                         defaultValue={defaultValue}
                         allowHalf={allowHalf}
                         onChange={props.onChange}/>
        } else if (templateType === 'radio') {
            const {disabled, defaultValue, options} = {...params}
            return (
                <Radio.Group name="radiogroup" disabled={disabled} defaultValue={defaultValue}
                             onChange={props.onChange}>
                    {
                        options && options.map((item: RadioOptionType) => {
                            return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                        })
                    }
                </Radio.Group>
            )
        } else if (templateType === 'checkbox') {
            const {options, defaultValue} = {...params}
            return <Checkbox.Group options={options} defaultValue={defaultValue}
                                   onChange={props.onChange}/>
        } else if (templateType === 'switch') {
            const {disabled, defaultValue, sizeSwitch} = {...params}
            return <Switch disabled={disabled} defaultChecked={defaultValue} size={sizeSwitch}
                           onChange={props.onChange}/>
        } else if (templateType === 'slider') {
            const {disabled, vertical, step, defaultValue, tooltipVisible} = {...params}
            return <Slider disabled={disabled} vertical={vertical} step={step} defaultValue={defaultValue}
                           tooltipVisible={tooltipVisible} onChange={props.onChange}/>
        } else if (templateType === 'select') {
            const {options, mode, size, placeholder, disabled, allowClear, maxTagCount,
                maxTagTextLength, showSearch, showArrow} = {...params}
            return <Select
                mode={mode}
                size={size}
                placeholder={placeholder || '请选择'}
                disabled={disabled}
                allowClear={allowClear || true}
                maxTagCount={maxTagCount}
                maxTagTextLength={maxTagTextLength}
                showSearch={showSearch || true}
                showArrow={showArrow || true}
                onChange={props.onChange}
            >
                {
                    options && options.map((item: RadioOptionType) => {
                        return <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
                    })
                }
            </Select>
        }else if (templateType === 'timepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue?moment(defaultValue, 'HH:mm:ss'): undefined
            return <TimePicker
                locale={locale}
                defaultValue={defaultValueTrans}
                onChange={props.onChange}
                placeholder={placeholder || '请选择时间'}
                size={size}/>
        }else if (templateType === 'datepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue?moment(defaultValue, 'YYYY-MM-DD'): undefined
            return <DatePicker
                locale={locale}
                defaultValue={defaultValueTrans}
                onChange={props.onChange}
                placeholder={placeholder || '请选择日期'}
                size={size}/>
        }
    }

    return <>{getType()}</>
}

export default Index
