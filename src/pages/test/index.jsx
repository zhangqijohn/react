import React, {useState, useMemo, useEffect} from 'react'
import InlineForm from './InlineForm'
import Q1Table from '@/components/Q1Table'
import {json} from './form.js'
import {defaultTableColumn} from './table.js'
import {getCdkLogList, cdkFileExport} from '@/api/cdk'

function Test() {
    const [formData, setFormData] = useState([])
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [pageTotal, setPageTotal] = useState()

    useMemo(() => {
        console.log('useMemo')
        setFormData(json)
    }, [])

    const getTableData = () => {
        setIsLoading(true)
        const queryStr = {gameId: 2119, gameVersion: 'ZLTJ'}
        let params = {
            gameInfoDto: queryStr,
            pageFilterDto: {
                filters: [],
                pageIndex: pageCurrent,
                pageSize: pageSize,
                sorts: {createTime: 'desc'},
            },
        }
        getCdkLogList(queryStr, params)
            .then(res => {
                setTableData(res.datas)
                setPageCurrent(res.pageIndex)
                setPageSize(res.pageSize)
                setPageTotal(res.totalCount)
                setIsLoading(false)
            })
            .catch()
    }
    useEffect(() => {
        getTableData()
    }, [pageSize, pageCurrent])

    const onFinish = values => {
        // console.log('Success:', values)
        getTableData()
    }

    const tabelChange = (page, filters, sorter) => {
        setPageCurrent(page.current)
        setPageSize(page.pageSize)
        console.log(page, filters, sorter)
    }

    const tabelTefresh = () => {
        getTableData()
    }
    const tabelDownload = () => {
        const queryStr = {gameId: 2119, gameVersion: 'ZLTJ'}
        cdkFileExport(queryStr, [202003301648230], 'cdk.csv')
    }
    const tabelFiltersFn = () => {
        getTableData()
    }

    return (
        <>
            <div>
                <InlineForm formData={formData} onFinish={onFinish} />
            </div>
            <div style={{marginTop: 16}}>
                <Q1Table
                    bordered
                    size="small"
                    rowKey="userId"
                    columns={defaultTableColumn}
                    dataSource={tableData}
                    onChange={tabelChange}
                    refresh={tabelTefresh}
                    download={tabelDownload}
                    filters={tabelFiltersFn}
                    pagination={{
                        current: pageCurrent,
                        pageSize: pageSize,
                        total: pageTotal,
                    }}
                    loading={isLoading}
                />
            </div>
        </>
    )
}

export default Test
