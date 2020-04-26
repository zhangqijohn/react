import React from 'react'
import moment from 'moment'
import {Checkbox, DatePicker, Input, Radio, Rate, Select, Slider, Switch, TimePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {Q1DataEntryJsonType, RadioOptionType} from './index.d'
import SelectMultiple from './SelectMultiple'

function Index(props: Q1DataEntryJsonType) {
    const getType = () => {
        let {templateType, params, hidden} = {...props}
        templateType = templateType.toLocaleLowerCase()
        if (hidden === true) return
        if (templateType === 'input') {
            return <Input {...params} onChange={props.onChange} onPressEnter={props.onPressEnter} />
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
            return <Input.Password onChange={props.onChange} onPressEnter={props.onPressEnter} />
        } else if (templateType === 'rate') {
            const {defaultValue, allowClear, allowHalf, disabled} = {...params}
            return (
                <Rate
                    disabled={disabled}
                    allowClear={allowClear}
                    defaultValue={defaultValue}
                    allowHalf={allowHalf}
                    onChange={props.onChange}
                />
            )
        } else if (templateType === 'radio') {
            const {disabled, defaultValue, options} = {...params}
            return (
                <Radio.Group
                    name="radiogroup"
                    disabled={disabled}
                    defaultValue={defaultValue}
                    onChange={props.onChange}
                >
                    {options &&
                        options.map((item: RadioOptionType) => {
                            return (
                                <Radio value={item.value} key={item.value}>
                                    {item.label}
                                </Radio>
                            )
                        })}
                </Radio.Group>
            )
        } else if (templateType === 'checkbox') {
            const {options, defaultValue} = {...params}
            return <Checkbox.Group options={options} defaultValue={defaultValue} onChange={props.onChange} />
        } else if (templateType === 'switch') {
            const {disabled, defaultValue, sizeSwitch} = {...params}
            return (
                <Switch disabled={disabled} defaultChecked={defaultValue} size={sizeSwitch} onChange={props.onChange} />
            )
        } else if (templateType === 'slider') {
            const {disabled, vertical, step, defaultValue, tooltipVisible} = {...params}
            return (
                <Slider
                    disabled={disabled}
                    vertical={vertical}
                    step={step}
                    defaultValue={defaultValue}
                    tooltipVisible={tooltipVisible}
                    onChange={props.onChange}
                />
            )
        } else if (templateType === 'select') {
            const {
                options,
                mode,
                size,
                placeholder,
                disabled,
                allowClear,
                maxTagCount,
                maxTagTextLength,
                showSearch,
                showArrow,
            } = {...params}
            const singleSelect = (
                <Select
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
                    {options &&
                        options.map((item: RadioOptionType) => {
                            return (
                                <Select.Option value={item.value} key={item.value}>
                                    {item.label}
                                </Select.Option>
                            )
                        })}
                </Select>
            )
            const multipleSelect = <SelectMultiple options={options} values={'value'} label={'label'} />
            return mode === 'multiple' ? multipleSelect : singleSelect
        } else if (templateType === 'timepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue ? moment(defaultValue, 'HH:mm:ss') : undefined
            return (
                <TimePicker
                    locale={locale}
                    defaultValue={defaultValueTrans}
                    onChange={props.onChange}
                    placeholder={placeholder || '请选择时间'}
                    size={size}
                />
            )
        } else if (templateType === 'datepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue ? moment(defaultValue, 'YYYY-MM-DD') : undefined
            return (
                <DatePicker
                    locale={locale}
                    defaultValue={defaultValueTrans}
                    onChange={props.onChange}
                    placeholder={placeholder || '请选择日期'}
                    size={size}
                />
            )
        }
    }

    return <>{getType()}</>
}

export default Index
