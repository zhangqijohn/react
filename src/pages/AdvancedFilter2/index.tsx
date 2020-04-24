import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Form, Button } from 'antd';
import { Select } from 'antd';
import {FilterType, Item, EditableRowProps, EditableCellProps} from './interface'
import {
  tableOriginData,
  columns,
  originObj,
  filterTypeOptions,
  selectTypeOptions,
  attributeNameOptions,
  filterModule,
  filterModuleDataSource} from './config'
const { Option } = Select;
const EditableContext = React.createContext<any>({})
const AdvancedFilter = () => {
  const [form] = Form.useForm();
  const [dataSource, setData] = useState(tableOriginData);
  
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }
  // 编辑单元格
  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    inputType,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<any>();
    const form = useContext(EditableContext) as any;
    useEffect(() => {
      if (editing) {
        inputRef?.current?.focus();
      }
    }, [editing]);
    
    // 设置表单的值
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
    
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    }
    const selectTypeChange = (value:string | number, type:string) => {
      form.setFieldsValue({ [type]: value });
    }
    const initSelect = (type:string) => {
      let optionMap:any = {
        filterType: filterTypeOptions,
        selectType: selectTypeOptions,
        attributeName: attributeNameOptions
      }
      let options:FilterType[] =  optionMap[type]
      return <>
        <Select
          defaultValue={record[type] || options[0].value}
          style={{ width: 120 }}
          onChange={(value:string | number) => selectTypeChange(value, type)}>
          {
            options.map((item:FilterType, index:number) => (
              <Option value={item.value} key={index}>{item.label}</Option>
            ))
          }
        </Select>
      </>
    }
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {inputType === 'select' ? (
              initSelect(dataIndex)
            ) : <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          }
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  }
  // 保存筛选条件
  const submitHandle = async () => {
    console.log('submit')
    const newData = [...dataSource];
    console.log(newData)
    try {
      const row = (await form.validateFields()) as Item;
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  
  // 插入一条数据
  const addFilterHandle = () => {
    const newData = [...dataSource];
    const curIndex = (newData.length -1) + 1
    const curData = JSON.parse(JSON.stringify(originObj));
    curData.key = curIndex.toString()
    const dataTemp:any = [...dataSource, curData]
    setData(dataTemp)
  };
  // 删除一条数据
  const deleteFilterHandle = () => {
    const newData = [...dataSource]
    newData.splice(-1, 1)
    setData(newData);
  }
  // 覆盖默认的 table 元素
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // 保存修改的数据
  const handleSave = (row:any) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  }
  // 设置单元格属性
  const columnsTemp = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record:any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        inputType: col?.inputType || '',
        title: col.title,
        handleSave: handleSave,
      })
    }
  })
  const filterTemplateTypeChange = (value:string | number) => {
    console.log(value)
    if (value === 2) {
      setData(filterModuleDataSource)
    }
  }
  const saveTemplateHandle = () => {
    console.log('保存模板')
  }
  return (
    <>
      <Form form={form} component={false}>
        <div style={{width: 260}}>
          <Form.Item
            label="用户模板"
            name="userTemplate"
            rules={[{ required: true, message: '请选择用户模板' }]}
          >
            <Select
              defaultValue={filterModule[0].value}
              style={{ width: 120 }}
              onChange={(value:string | number) => filterTemplateTypeChange(value)}>
              {
                filterModule.map((item:FilterType, index:number) => (
                  <Option value={item.value} key={index}>{item.label}</Option>
                ))
              }
            </Select>
          </Form.Item>
        </div>
        <div className="filter-form">
          <div className="filter-table">
            <Table
              bordered
              components={components}
              dataSource={dataSource}
              columns={columnsTemp}
              pagination={false}
              rowClassName="editable-row"
            />
          </div>
          <div>
            <Button type="primary" onClick={() => addFilterHandle()}>插入</Button>
            <Button onClick={() => deleteFilterHandle()}>删除</Button>
          </div>
        </div>
        <div className="filter-footer">
            <div style={{flex: 1}}>
              <Form.Item
                label="模板名称"
                name="templateName"
                rules={[{ required: true, message: '请填写模板名称' }]}
                style={{width: 360}}
              >
                <>
                  <Input style={{width: 200}}/>
                  <Button type="primary" onClick={() => saveTemplateHandle()}>保存</Button>
                </>
              </Form.Item>
            </div>
            <div>
              <Button type="primary" onClick={() => submitHandle()}>确认</Button>
              <Button>取消</Button>
            </div>
        </div>
      </Form>
    </>
  );
};
export default AdvancedFilter