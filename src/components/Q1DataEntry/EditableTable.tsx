import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Input, Select, Popconfirm, Table, InputNumber} from 'antd';
import {EditableTablePropsType, EditableTableColumnsType, Q1DataEntryJsonType} from './index.d';
import {filterTypeOptions, filterTypeOptionsType} from "./Enmu";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: any;
    record: Q1DataEntryJsonType;
    index: number;
    children: React.ReactNode;
}


const EditableTable:React.FC<EditableTablePropsType> = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(props.data);
    const [editingKey, setEditingKey] = useState<number|string>('');

    const isEditing = (record: Q1DataEntryJsonType) => record.id === editingKey;

    const edit = (record: Q1DataEntryJsonType) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Q1DataEntryJsonType;
            const newData = [...data];
            const index = newData.findIndex(item => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const submitSave = () =>{
        props.dataSourceChange && props.dataSourceChange(data)
    }

    const columns:EditableTableColumnsType[] = [
        {
            title: '标签名',
            dataIndex: 'label',
            editable: true,
            inputType: 'number'
        },
        {
            title: '标签字段名',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '类型',
            dataIndex: 'templateType',
            editable: true,
        },
        {
            title: '参数',
            dataIndex: 'params',
            width: '30%',
            editable: true,
            render: (text: any) => (JSON.stringify(text))
        },
        {
            title: '是否显示',
            dataIndex: 'hidden',
            editable: true,
            render: (text: any) => text === true ? ('隐藏') : ('显示')
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text: any, record: Q1DataEntryJsonType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type='link' onClick={() => save(record.id)}>保存</Button>
                        <Button type='link' onClick={cancel}>取消</Button>
                        {/*<Popconfirm title="确认是否保存?"  okText="是" cancelText="否" onConfirm={() => save(record.id)}>
                            <Button type='link'>保存</Button>
                        </Popconfirm>
                        <Popconfirm title="确认是否取消?"  okText="是" cancelText="否" onConfirm={cancel}>
                            <Button type='link'>取消</Button>
                        </Popconfirm>*/}
                    </span>
                ) : (
                <span>
                    <Button type='link' disabled={editingKey !== ''} onClick={() => edit(record)}>
                        编辑
                    </Button>
                   <Popconfirm title="确认是否删除?"  okText="是" cancelText="否" onConfirm={() => handleDelete(record.id)}>
                         <Button type='link' disabled={editingKey !== ''}>删除</Button>
                   </Popconfirm>
                </span>
                );
            }
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
            hidden: false
        };
        setData([...data, newData])
        setCount(count+1)
    };
    const handleDelete = (id :number) => {
        setData(data.filter(item => item.id !== id))
    }
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Q1DataEntryJsonType) => ({
                record,
                inputType: col.dataIndex === 'templateType' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const EditableCell: React.FC<EditableCellProps> = ({
                                                           editing,
                                                           dataIndex,
                                                           title,
                                                           inputType,
                                                           record,
                                                           index,
                                                           children,
                                                           ...restProps
                                                       }) => {
        const inputNode = inputType === 'select' ? (<Select>
            {
                filterTypeOptions.map((item:filterTypeOptionsType, index:number) => (
                    <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                ))
            }
        </Select>) : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    return (
        <Form form={form} component={false}>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{marginBottom: 16,marginRight: 16}}
            >
                新增规则
            </Button>
            <Button
                onClick={submitSave}
                type="primary"
                style={{marginBottom: 16}}
            >
                提交修改
            </Button>
            <Table
                components={{
                    body: {
                       /* row: EditableRow,*/
                        cell: EditableCell,
                    },
                }}
                bordered
                rowKey='id'
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
    );
};

export default EditableTable
