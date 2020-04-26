import React, {useState} from 'react'
import {Button, Form, Input, Select, Popconfirm, Table} from 'antd'
import {EditableTablePropsType, EditableTableColumnsType, Q1DataEntryJsonType} from '@/components/Q1DataEntry/index.d'
import {filterTypeOptions} from './js/enum'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editable?: boolean
    editing: boolean
    dataIndex: string
    title: any
    inputType: any
    record: Q1DataEntryJsonType
    index: number
    children: React.ReactNode
    handleSave: any
}

interface FiltersTableProps {
    data: any[]
    filtersTableChange: (val: any) => void
}

const FiltersTable: React.FC<FiltersTableProps> = props => {
    const [form] = Form.useForm()
    const [data, setData] = useState(props.data)
    const [editingKey, setEditingKey] = useState<number | string>('')

    // const isEditing = (record: Q1DataEntryJsonType) => record.id === editingKey

    const edit = (record: Q1DataEntryJsonType) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record})
        setEditingKey(record.id)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Q1DataEntryJsonType
            const newData = [...data]
            const index = newData.findIndex(item => key === item.id)
            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                })
                setData(newData)
                setEditingKey('')
            } else {
                newData.push(row)
                setData(newData)
                setEditingKey('')
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const submitSave = () => {
        // props.dataSourceChange && props.dataSourceChange(data)
    }

    const columns: EditableTableColumnsType[] = [
        {
            title: '列名',
            dataIndex: 'filterName',
            inputType: 'select',
            editable: true,
        },
        {
            title: '筛选类型',
            dataIndex: 'filterType',
            inputType: 'select',
            editable: true,
        },
        {
            title: '筛选列值',
            dataIndex: 'filterValue',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 60,
            render: (text: any, record: Q1DataEntryJsonType) => {
                return (
                    <Button type="link" onClick={cancel}>
                        删除
                    </Button>
                )
            },
        },
    ]

    const [count, setCount] = useState(props.data.length)
    const handleAdd = () => {
        const newData = {
            id: count,
            label: '',
            name: ``,
            templateType: ``,
            params: {},
            editing: true,
            hidden: false,
        }
        setData([...data, newData])
        setCount(count + 1)
    }
    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id))
    }
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: Q1DataEntryJsonType) => ({
                record,
                inputType: col.inputType === 'select' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                // editing: isEditing(record),
            }),
        }
    })

    const EditableCell: React.FC<EditableCellProps> = ({
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode =
            dataIndex === 'filterName' ? (
                <Select>
                    {filterTypeOptions.map((item: any, index: number) => (
                        <Select.Option value={item.value} key={index}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
            ) : dataIndex === 'filterType' ? (
                <Select>
                    {filterTypeOptions.map((item: any, index: number) => (
                        <Select.Option value={item.value} key={index}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
            ) : (
                <Input />
            )

        return (
            <td {...restProps}>
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {dataIndex ? inputNode : children}
                </Form.Item>
            </td>
        )
    }

    console.log(data)
    return (
        <Form form={form} component={false}>
            <Button onClick={handleAdd} type="primary" style={{marginBottom: 16, marginRight: 16}}>
                添加
            </Button>
            <Button onClick={handleAdd} type="primary" style={{marginBottom: 16, marginRight: 16}}>
                清空
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                rowKey="id"
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
    )
}

export default FiltersTable
