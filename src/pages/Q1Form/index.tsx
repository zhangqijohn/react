import React, {useState} from 'react'
import { Form, Button, Drawer, Row, Col} from 'antd';
import Q1DataEntry from '@/components/Q1DataEntry'
import {Q1DataEntryJsonType} from '@/components/Q1DataEntry/index.d'
import EditableTable from '@/components/Q1DataEntry/EditableTable.tsx'

const json: Q1DataEntryJsonType[] = [
    {
        id: 0,
        label: '用户名',
        name: 'userName',
        templateType: 'input',
        rules: [{ required: true, message: '请输入用户名!' }],
        params: {
            defaultValue: 'john',
        },
        hidden: false,
    },
    {
        id: 1,
        label: '密码',
        name: 'password',
        templateType: 'password',
        // rules: [{ required: true, message: 'Please input your password!' }],
        params: {}
    },
    // {
    //     id: 2,
    //     label: '申请理由',
    //     name: 'reason',
    //     templateType: 'textarea',
    //     params: {
    //         disabled: false,
    //         addonAfter: 'After',
    //         addonBefore: 'Before',
    //         defaultValue: '',
    //         maxLength: 2,
    //         prefix: '￥',
    //         suffix: 'RMB',
    //         placeholder: '请输入',
    //         row: 6,
    //     },
    // },
    // {
    //     id: 3,
    //     label: '充值金额',
    //     name: 'money',
    //     templateType: 'input',
    //     params: {
    //         disabled: false,
    //         addonAfter: 'After',
    //         addonBefore: 'Before',
    //         defaultValue: '13',
    //         maxLength: 12,
    //         prefix: '￥',
    //         suffix: 'RMB',
    //         placeholder: '请输入',
    //     },
    // },
    // {
    //     id: 4,
    //     label: 'rate评分',
    //     name: 'rate',
    //     templateType: 'rate',
    //     params: {
    //         disabled: false,
    //         defaultValue: 2,
    //         allowClear: true,
    //         allowHalf: true,
    //     },
    // },
    // {
    //     id: 5,
    //     label: 'radio单选框',
    //     name: 'radio',
    //     templateType: 'radio',
    //     params: {
    //         disabled: false,
    //         defaultValue: 'male',
    //         options: [
    //             { label: '男', value: 'male' },
    //             { label: '女', value: 'female' },
    //         ]
    //     },
    // },
    // {
    //     id: 12,
    //     label: 'Checkbox多选框',
    //     name: 'checkbox',
    //     templateType: 'checkbox',
    //     params: {
    //         options: [
    //             { label: 'Apple', value: 'Apple' },
    //             { label: 'Pear', value: 'Pear' },
    //             { label: 'Orange', value: 'Orange', disabled: false },
    //         ],
    //         defaultValue: ['Apple']
    //     },
    // },
    // {
    //     id: 6,
    //     label: '开启Switch',
    //     name: 'switch',
    //     templateType: 'switch',
    //     params: {
    //         defaultValue: true,
    //         sizeSwitch: 'small',
    //         disabled: false,
    //     },
    // },
    // {
    //     id: 7,
    //     label: 'Slider',
    //     name: 'slider',
    //     templateType: 'slider',
    //     params: {
    //         disabled: false,
    //         vertical: false,
    //         step: 1,
    //         range: false,
    //         defaultValue: 22,
    //         tooltipVisible: true,
    //     },
    // },
    // {
    //     id: 8,
    //     label: 'Select选择器',
    //     name: 'select',
    //     templateType: 'select',
    //     params: {
    //         // 对数据的要求，
    //         options: [
    //             { label: '苹果', value: 'Apple' },
    //             { label: '梨', value: 'Pear' },
    //             { label: '橘子', value: 'Orange'},
    //             { label: '香蕉', value: 'Banana'},
    //         ],
    //         mode: 'multiple', // 多选
    //         defaultValue: ['Apple'], // 多选时为数组
    //         placeholder: 'multiple请选择',
    //         disabled: false,
    //         allowClear: true,
    //         maxTagCount: 1, // 最大标签个数
    //         maxTagTextLength: 4, // 单个标签最大字数
    //         showSearch: true,
    //         showArrow: true,
    //     },
    // },
    // {
    //     id: 9,
    //     label: 'TimePicker时间选择框',
    //     name: 'timePicker',
    //     templateType: 'timePicker',
    //     params: {
    //         defaultValue: '16:04:21'
    //     },
    // },
    // {
    //     id: 11,
    //     label: 'DatePicker日期选择框',
    //     name: 'datePicker',
    //     templateType: 'datePicker',
    //     params: {
    //         defaultValue: '2020/04/21'
    //     },
    // },

]

const initValues:any = {}
json.forEach((item: Q1DataEntryJsonType) => {
    initValues[item.name] = item.params && item.params.defaultValue
})

function FormHandle() {
    const [dataSource, setDataSource] = useState(json)
    const [showDrawer, setShowDrawer] = useState(false)
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    }
    const layout = {
        labelCol: { sm: 6, md: 4, xl: 3 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 2, span: 8 },
    };
    dataSource.forEach((item: Q1DataEntryJsonType) => {
        initValues[item.name] = item.params && item.params.defaultValue
    })

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const dataSourceChange = (val: Q1DataEntryJsonType[]): void => {
        console.log(val)
        setDataSource(val)
    }

    const [form] = Form.useForm();
    return (
        <>
            <Button type="primary" onClick={()=>{setShowDrawer(true)}}>
                表单规则
            </Button>
            <Drawer
                title="表单规则"
                width={'56%'}
                placement="right"
                closable={false}
                onClose={() =>{setShowDrawer(false)}}
                visible={showDrawer}
            >
                <EditableTable data={dataSource} dataSourceChange={dataSourceChange}></EditableTable>
            </Drawer>

            <Form
                {...layout}
                form={form}
                name="basic"
                layout='horizontal' // horizontal vertical inline
                initialValues={initValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    dataSource.map((item) => {
                        return (<Form.Item
                            key={item.id}
                            label={item.label}
                            name={item.name}
                            rules={item.rules}
                        >
                            <Q1DataEntry {...item} onChange={changeValue}></Q1DataEntry>
                        </Form.Item>)
                    })
                }
                <Form.Item {...tailLayout}>
                    <Row gutter={8}>
                        <Col offset={3}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col>
                            <Button htmlType="reset" onClick={() => { form.resetFields() }}>
                                Reset
                            </Button>
                        </Col>
                    </Row>

                </Form.Item>
            </Form>
        </>
    )
}

export default FormHandle
