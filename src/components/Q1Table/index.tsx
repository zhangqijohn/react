import React, {useState, useMemo, useEffect, useRef} from 'react'
import {Col, Dropdown, Menu, Row, Table, Tooltip, Modal} from 'antd'
import {ColumnHeightOutlined, SettingOutlined, RedoOutlined, DownloadOutlined, FilterOutlined} from '@ant-design/icons'
import {ColumnPropsSwith, Q1TablePropsType, SizeType, PaginationType, filterTypeOptionsType} from './Q1Table.d'
import DragSortingTable from './DragSortingTable'
import FilterItems from './FilterItems'
import {sizeOptions} from './js/enum'
import './css/q1-table.scss'

const Q1Table = (props: Q1TablePropsType) => {
    // 过滤原始数据，清除switch为0或者不存在的
    const {columns, size, dataSource, showHeaderRightTool, pagination} = {...props}
    const columnsQ1Trans = (columns && columns.length && columns.filter((item: any) => item.switch)) || []
    const [showFilterItems, setShowFilterItems] = useState(true)
    const [columnsQ1, setColumnsQ1] = useState(columnsQ1Trans)
    const [sizeQ1, setSizeQ1] = useState<SizeType>(size || 'large')
    const [cloSetVisible, setCloSetVisible] = useState<boolean>(false)
    const [showHRTool] = useState(showHeaderRightTool === undefined ? true : showHeaderRightTool)

    const paginationProps: PaginationType = {
        current: props?.pagination?.current || 1,
        pageSize: props?.pagination?.pageSize || 20,
        pageSizeOptions: ['10', '20', '50', '100'],
        position: ['bottomRight'],
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: () => `共 ${props?.pagination?.total || 0} 条`,
        total: props?.pagination?.total || 0,
    }

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
    const filterItemsOk = (val: any) => {
        setShowFilterItems(false)
        console.log(val)

        props.filters(val)
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
                                    setShowFilterItems(true)
                                }}
                            />
                        </Tooltip>
                    </Col>
                ) : null}
            </Row>
            <Modal
                title="多列筛选"
                width={800}
                footer={null}
                visible={showFilterItems}
                onCancel={() => setShowFilterItems(false)}
            >
                <FilterItems
                    data={columnsQ1 || []}
                    filterItemsOk={filterItemsOk}
                    filterItemsCancel={() => setShowFilterItems(false)}
                />
            </Modal>
            <Table
                {...props}
                className="q1-layout-table"
                rowClassName="editable-row"
                size={sizeQ1}
                dataSource={dataSource}
                columns={columnsQ1}
                onChange={handleTableChange}
                pagination={paginationProps}
            />
        </>
    )
}

export default Q1Table
