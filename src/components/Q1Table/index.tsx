import React, {useState} from 'react'
import {Col, Dropdown, Menu, Row, Table, Tooltip, Modal} from 'antd'
import {ColumnHeightOutlined, SettingOutlined, RedoOutlined, DownloadOutlined, FilterOutlined} from '@ant-design/icons'
import {ColumnPropsSwith, Q1TablePropsType, SizeType, SizeValType} from './Q1Table'
import DragSortingTable from './DragSortingTable'
import FiltersTable from './FiltersTable'
import {sizeOptions} from './js/enum'
import './css/q1-table.scss'
import EditableTable from '@/components/Q1DataEntry/EditableTable'

const Q1Table = (props: Q1TablePropsType) => {
    // 过滤原始数据，清除switch为0或者不存在的
    const {columns, size, dataSource, showHeaderRightTool} = {...props}
    const columnsQ1Trans = (columns && columns.length && columns.filter((item: any) => item.switch)) || []
    const [showModal, setShowModal] = useState(true)
    const [columnsQ1, setColumnsQ1] = useState(columnsQ1Trans)
    const [sizeQ1, setSizeQ1] = useState<SizeType>(size || 'large')
    const [cloSetVisible, setCloSetVisible] = useState<boolean>(false)
    const [showHRTool] = useState(showHeaderRightTool === undefined ? true : showHeaderRightTool)
    const handleTableChange = (page: any, filters: any, sorter: any) => {
        props.onChange(page, filters, sorter)
    }

    const sizeSetMenu = (
        <Menu selectedKeys={[sizeQ1]}>
            {sizeOptions.map(item => (
                <Menu.Item key={item.value}>
                    <span
                        onClick={() => {
                            setSizeQ1(item.value)
                        }}
                    >
                        {item.label}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    )
    const columsChange = (val: ColumnPropsSwith[]): void => {
        const data = val.filter(item => item.switch)
        setColumnsQ1(data)
    }

    const cloSet = (
        <div>
            <DragSortingTable columns={columns || []} colChange={columsChange} />
        </div>
    )

    const handleVisibleChange = (bool: boolean) => {
        setCloSetVisible(bool)
    }
    const filtersTableChange = (val: any) => {
        console.log('filtersTableChange')
    }

    return (
        <>
            {/* <!-- 工具栏 --> */}
            <Row style={{marginBottom: 8}} className="q1-table-tool-row">
                {/* <!-- 自定义工具栏 --> */}
                <Col span={21} className="q1-table-tool-row-left">
                    {props.tableTools}
                </Col>
                {/* <!-- 基础的工具栏 --> */}
                {showHRTool ? (
                    <Col span={3} className="q1-table-tool-row-right">
                        <Tooltip title="密度">
                            <Dropdown overlay={sizeSetMenu} trigger={['click']} placement="bottomCenter">
                                <ColumnHeightOutlined className="table-tools" />
                            </Dropdown>
                        </Tooltip>
                        <Tooltip title="刷新">
                            <RedoOutlined
                                className="table-tools"
                                onClick={() => {
                                    props.refresh()
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="下载">
                            <DownloadOutlined
                                className="table-tools"
                                onClick={() => {
                                    props.download()
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="列设置">
                            <Dropdown
                                overlay={cloSet}
                                trigger={['click']}
                                placement="bottomRight"
                                onVisibleChange={handleVisibleChange}
                                visible={cloSetVisible}
                            >
                                <SettingOutlined className="table-tools" />
                            </Dropdown>
                        </Tooltip>
                        <Tooltip title="多列筛选">
                            <FilterOutlined
                                className="table-tools"
                                onClick={() => {
                                    setShowModal(true)
                                }}
                            />
                        </Tooltip>
                    </Col>
                ) : null}
            </Row>
            <Modal
                title="多列筛选"
                width={'56%'}
                visible={showModal}
                onOk={() => {
                    console.log('ok')
                }}
                onCancel={() => {
                    setShowModal(false)
                }}
                cancelText="取消"
                okText="筛选"
            >
                <FiltersTable data={columnsQ1 || []} filtersTableChange={filtersTableChange} />
            </Modal>
            <Table
                className="q1-layout-table"
                rowClassName="editable-row"
                {...props}
                size={sizeQ1}
                dataSource={dataSource}
                columns={columnsQ1}
                onChange={handleTableChange}
            />
        </>
    )
}

export default Q1Table
