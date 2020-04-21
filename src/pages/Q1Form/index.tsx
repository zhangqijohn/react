import React from 'react'
import { Form, Button} from 'antd';
import Q1Form, {JsonType} from '@/components/Q1Form'

const json: JsonType[] = [
    {
        id: 0,
        label: '用户名',
        name: 'userName',
        templateType: 'input',
        rules: [{ required: true, message: '请输入用户名!' }],
        params: {
            addonAfter: '',
            addonBefore: '',
            defaultValue: '',
            maxLength: 12,
            prefix: '',
            suffix: '',
            placeholder: '请输入用户名',
        },
    },
    {
        id: 1,
        label: '密码',
        name: 'password',
        templateType: 'password',
        params: {

        }
    },
    {
        id: 2,
        label: '申请理由',
        name: 'reason',
        templateType: 'textarea',
        params: {
            addonAfter: 'After',
            addonBefore: 'Before',
            defaultValue: '',
            maxLength: 2,
            prefix: '￥',
            size: 'large',
            suffix: 'RMB',
            placeholder: '请输入',
            row: 6,
        },
    },
    {
        id: 3,
        label: '充值金额',
        name: 'money',
        templateType: 'input',
        params: {
            addonAfter: 'After',
            addonBefore: 'Before',
            defaultValue: '13',
            maxLength: 12,
            prefix: '￥',
            size: 'large',
            suffix: 'RMB',
            placeholder: '请输入',
        },
    },
    {
        id: 4,
        label: '评分rate',
        name: 'rate',
        templateType: 'rate',
        params: {
            defaultValue: 2,
            allowClear: true,
            allowHalf: true,
        },
    },
    {
        id: 5,
        label: '性别',
        name: 'radio',
        templateType: 'radio',
        params: {
            defaultValue: 'male',
            radioOption: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
            ]
        },
    },
    {
        id: 6,
        label: '开启Switch',
        name: 'switch',
        templateType: 'switch',
        params: {
            defaultChecked: true,
            sizeSwitch: 'small',
            disabled: true,
        },
    },
    {
        id: 7,
        label: 'Slider',
        name: 'slider',
        templateType: 'slider',
        params: {
            disabled: false,
            vertical: false,
            step: 1,
            range: false,
            defaultValue: '22',
            tooltipVisible: true,
        },
    },
]


function FormHandle() {
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 2, span: 8 },
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const Ele = json[0].templateType
    return (
        <>
            {
                json.map((i:JsonType)=>{
                    let {templateType, params} = i
                    const Elements = templateType
                    console.log({...params});
                    return (<Elements />)
                })
            }
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    json.map((item) => {
                        return (<Form.Item
                            key={item.id}
                            label={item.label}
                            name={item.name}
                            rules={item.rules}
                        >
                            <Q1Form {...item} onChange={changeValue}></Q1Form>
                        </Form.Item>)
                    })
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default FormHandle
