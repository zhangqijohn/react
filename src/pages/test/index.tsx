import React from 'react'
import {Checkbox, Form, Button, Input} from 'antd';

const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: false},
]
const defaultValue = ['Apple']

function Text() {
    // const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value);
    // }
    // const onPressEnter = (values: any) => {
    //     console.log('Success:', values);
    // };
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { sm: 22, md: 12, lg: 10 },
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

    return (
        <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{'Checkbox': defaultValue, 'Password': '123'}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label='Checkbox'
                    name='Checkbox'
                >
                    <Checkbox.Group options={options} />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='Password'
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Text
