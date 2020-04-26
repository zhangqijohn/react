import React from 'react'
import Q1Table from '@/components/Q1Table' //引入Q1Table组件
import {ColumnPropsSwith} from '@/components/Q1Table/Q1Table'
const datas = [
    {
        id: '1',
        serverId: 1,
        actorId: 1001,
        goodsName: '1服1000',
    },
    {
        id: '2',
        serverId: 3,
        actorId: 1002,
        goodsName: '妃非1',
    },
    {
        id: '3',
        serverId: 2,
        actorId: 104792065,
        goodsName: '妃非妃',
    },
]

const defaultColumnsData: ColumnPropsSwith[] = [
    {
        dataIndex: 'serverId',
        title: '游戏世界',
        switch: 1,
        align: 'center',
        fixed: 'left',
        sorter: (a: any, b: any) => a.serverId - b.serverId,
        // defaultSortOrder: 'descend',
    },
    {
        dataIndex: 'goodsName',
        title: '商品名',
        switch: 0,
        align: 'center',
    },
    {
        dataIndex: 'actorId',
        title: '角色名(ID)',
        switch: 1,
        align: 'center',
        sorter: (a: any, b: any) => a.actorId - b.actorId,
    },
    {
        dataIndex: 'action',
        title: '操作',
        width: 120,
        switch: 1,
        align: 'center',
        fixed: 'right',
    },
]

const TableDemo = () => {
    const tabelChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log(pagination, filters, sorter, extra)
    }
    const refreshFn = () => {
        console.log('refreshFn')
    }
    const downloadFn = () => {
        console.log('downloadFn')
    }
    const filtersFn = () => {
        console.log('filters')
    }
    const headerTop = (
        <div>
            <button
                onClick={() => {
                    window.alert('批量删除')
                }}
            >
                批量删除
            </button>
            <button
                onClick={() => {
                    window.alert('批量通过')
                }}
            >
                批量通过
            </button>
        </div>
    )
    return (
        <>
            <Q1Table
                bordered
                size="small"
                rowKey="id"
                columns={defaultColumnsData}
                tableTools={headerTop}
                dataSource={datas}
                onChange={tabelChange}
                refresh={refreshFn}
                download={downloadFn}
                filters={filtersFn}
            />
        </>
    )
}

export default TableDemo
