import React, {useState, useMemo} from 'react'
import {Form, Button} from 'antd'
import Q1DataEntry from '@/components/Q1DataEntry'

function InlineForm(props) {
    const [dataSource, setDataSource] = useState([])
    const [initValues, setInitValues] = useState({})
    const [form] = Form.useForm()

    const initFormData = () => {
        let {formData} = {...props}
        const defaultValue = {} // 默认值
        formData = formData.map(item => {
            // 格式化是否必填项
            defaultValue[item.name] = item.params && item.params.defaultValue
            item.rules = []
            if (item.params && item.params.required) {
                item.rules.push({required: true, message: `${item.label}必填`})
            }
            return item
        })
        return {formData, defaultValue}
    }
    useMemo(() => {
        let {formData, defaultValue} = initFormData()
        setDataSource(formData)
        setInitValues(defaultValue)
    }, [props.formData])

    return (
        <>
            <Form
                form={form}
                name="basic"
                layout="inline" // horizontal vertical inline
                initialValues={initValues}
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}
            >
                {dataSource.map(item => {
                    return (
                        <Form.Item key={item.id} label={item.label} name={item.name} rules={item.rules}>
                            <Q1DataEntry {...item}></Q1DataEntry>
                        </Form.Item>
                    )
                })}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: 8}}>
                        查询
                    </Button>
                    <Button
                        htmlType="reset"
                        onClick={() => {
                            form.resetFields()
                        }}
                    >
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default InlineForm
