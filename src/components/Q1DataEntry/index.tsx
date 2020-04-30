import React from 'react'
import moment from 'moment'
import {Checkbox, DatePicker, Input, Radio, Rate, Select, Slider, Switch, TimePicker} from 'antd'
import {Q1DataEntryJsonType, RadioOptionType} from './index.d'
import SelectMultiple from './SelectMultiple'

function Index(props: Q1DataEntryJsonType) {
    const getType = () => {
        let {templateType, params, hidden} = {...props}
        templateType = templateType.toLocaleLowerCase()
        if (hidden === true) return
        if (templateType === 'input') {
            return <Input {...params} allowClear onChange={props.onChange} onPressEnter={props.onPressEnter} />
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
            return (
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
        } else if (templateType === 'selectmultiple') {
            const {options, size, placeholder, disabled} = {...params}
            return (
                <SelectMultiple
                    size={size}
                    options={options}
                    values={'value'}
                    label={'label'}
                    placeholder={placeholder || '请选择'}
                    disabled={disabled}
                    onChange={props.onChange}
                />
            )
        } else if (templateType === 'timepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue ? moment(defaultValue, 'HH:mm:ss') : undefined
            return (
                <TimePicker
                    defaultValue={defaultValueTrans}
                    onChange={props.onChange}
                    placeholder={placeholder || '请选择时间'}
                    size={size}
                />
            )
        } else if (templateType === 'datepicker') {
            const {defaultValue, placeholder, size} = {...params}
            const defaultValueTrans = defaultValue ? moment(defaultValue, 'YYYY-MM-DD') : undefined
            const onChange = (val: any) => {
                props.onChange && props.onChange(val.toISOString())
            }
            return (
                <DatePicker
                    showTime
                    defaultValue={defaultValueTrans}
                    onChange={onChange}
                    placeholder={placeholder || '请选择日期'}
                    size={size}
                />
            )
        } else if (templateType === 'rangepicker') {
            const {defaultValue, size} = {...params}
            const onChange = (val: any) => {
                props.onChange && props.onChange([val[0].toISOString(), val[1].toISOString()])
            }
            return (
                <DatePicker.RangePicker
                    showTime
                    defaultValue={
                        Array.isArray(defaultValue) && defaultValue.length
                            ? [moment(defaultValue[0], 'YYYY-MM-DD'), moment(defaultValue[1], 'YYYY-MM-DD')]
                            : undefined
                    }
                    onChange={onChange}
                    ranges={{
                        今日: [moment(), moment()],
                        昨日: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                        最近一周: [moment().subtract(6, 'days'), moment()],
                        最近一个月: [moment().subtract(1, 'month'), moment()],
                        最近三个月: [moment().subtract(3, 'month'), moment()],
                        最近半年: [moment().subtract(6, 'month'), moment()],
                        最近一年: [moment().subtract(1, 'year'), moment()],
                    }}
                    size={size}
                />
            )
        }
    }

    return <>{getType()}</>
}

export default Index
