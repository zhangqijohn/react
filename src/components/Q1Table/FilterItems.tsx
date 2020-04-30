import React from 'react'
import {Form, Select, Input, Button, Col, Row} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {filterTypeOptions} from './js/enum'

const rules = (title: string) => {
    return [{required: true, message: title}]
}

interface FType {
    dataIndex: string
    filterType: string | number
    filterValue: string
}

interface FilterItemsProps {
    data: any[]
    filterItemsOk: (val: FType[]) => void
    filterItemsCancel: () => void
}

const FilterItems = (props: FilterItemsProps) => {
    const {data} = {...props}

    return (
        <Form
            onFinish={values => {
                props.filterItemsOk(values.hightFilters)
            }}
            className="my-form"
        >
            <Form.List name="hightFilters">
                {(fields, {add, remove}) => {
                    return (
                        <div>
                            <Row
                                style={{
                                    backgroundColor: 'rgb(238, 241, 249)',
                                    textIndent: '1em',
                                    fontWeight: 600,
                                    lineHeight: '40px',
                                }}
                            >
                                <Col span={6}>列名</Col>
                                <Col span={6}>筛选类型</Col>
                                <Col span={10}>筛选列值</Col>
                                <Col span={2}>操作</Col>
                            </Row>
                            {fields.map((field, index) => (
                                <Row key={field.key}>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[field.name, 'dataIndex']}
                                            // fieldKey={[field.fieldKey, 'dataIndex']}
                                            fieldKey={field.fieldKey}
                                            rules={rules('请选择列名')}
                                        >
                                            <Select>
                                                {data.map((item, index: number) => (
                                                    <Select.Option value={item.dataIndex} key={index}>
                                                        {item.title}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[field.name, 'filterType']}
                                            // fieldKey={[field.fieldKey, 'filterType']}
                                            fieldKey={field.fieldKey}
                                            rules={rules('请选择筛选类型')}
                                        >
                                            <Select>
                                                {filterTypeOptions.map((item, index) => (
                                                    <Select.Option value={item.value} key={index}>
                                                        {item.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={[field.name, 'filterValue']}
                                            // fieldKey={[field.fieldKey, 'filterValue']}
                                            fieldKey={field.fieldKey}
                                            rules={rules('请输入筛选值')}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Form.Item>
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    remove(field.name)
                                                }}
                                            >
                                                删除
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add()
                                    }}
                                    style={{width: '100%'}}
                                >
                                    <PlusOutlined /> 新增筛选
                                </Button>
                            </Form.Item>
                        </div>
                    )
                }}
            </Form.List>

            <Form.Item>
                <Row justify="end">
                    <Col>
                        <Button style={{marginRight: 8}} onClick={() => props.filterItemsCancel()}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default FilterItems
