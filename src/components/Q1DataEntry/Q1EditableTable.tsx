import React, {useState} from 'react';
import {Button, Form, Input, InputNumber, Popconfirm, Table} from 'antd';
import {JsonType} from './index'


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: JsonType;
    index: number;
    children: React.ReactNode;
}

interface Q1EditableTableProps {
    data: JsonType[]
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing, dataIndex, title, inputType, record,
                                                       index, children, ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
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
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Q1EditableTable = (props: Q1EditableTableProps) => {
    let originData = JSON.parse(JSON.stringify(props.data))
    originData = originData.map((item:JsonType)=>{
        return {
            ...item,
            params: JSON.stringify(item.params)
        }
    })
    console.log(originData);
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: JsonType) => record.id.toString() === editingKey;

    const edit = (record: JsonType) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingKey(record.id.toString());
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as JsonType;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
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

    const columns = [
        {
            title: '字段名称',
            dataIndex: 'label',
            width: '15%',
            editable: true,
        },
        {
            title: '字段(英文)',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: '类型',
            dataIndex: 'templateType',
            width: '20%',
            editable: true,
        },
        {
            title: '参数',
            dataIndex: 'params',
            width: '40%',
            editable: true,
            render: (text:any) => (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: JsonType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a href="javascript:;" onClick={() => save(record.id)} style={{marginRight: 8}}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Button>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: JsonType) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
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

export default Q1EditableTable
