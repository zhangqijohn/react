import {ColumnProps} from 'antd/es/table'
import * as React from 'react'

export interface filterTypeOptionsType {
    value: number
    label: string
}

export interface SizeVal {
    value: string
    label: string
}

export interface OptionVal {
    id?: number
    value: number
    label: string
}

export type SizeType = 'large' | 'middle' | 'small'

export interface SizeValType extends SizeVal {
    value: SizeType
}

export declare type fixedType = boolean | 'left' | 'right' | undefined

export interface ColumnsType {
    title?: React.ReactNode
    key?: React.Key
    dataIndex?: string | string[]
    align?: 'left' | 'right' | 'center'
    defaultSortOrder?: 'ascend' | 'descend'
    colSpan?: number
    width?: string | number
    className?: string
    defaultSortOrder?: 'ascend' | 'descend'
    switch?: 0 | 1 | undefined
    fixed?: fixedType
    [index: string]: any
}

export interface ColumnPropsSwith extends ColumnProps<ColumnsType> {
    switch?: 0 | 1 | undefined
    fixed?: fixedType
    [index: string]: any
}

export interface DragSortingTablePropsType {
    columns: ColumnPropsSwith[]
    columsChange?: ColumnPropsSwith[]
    colChange?: (data: ColumnPropsSwith[]) => void
}

export declare type PaginationPosition =
    | 'top'
    | 'bottom'
    | 'both'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
export interface PaginationType {
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    current?: number
    pageSize?: number
    total?: number
    pageSizeOptions?: string[]
    position?: PaginationPosition[]
    showTotal?: () => React.ReactNode
}

export interface Q1TablePropsType {
    bordered?: boolean
    columns?: ColumnPropsSwith[]
    size?: SizeType
    rowKey?: string | (() => string)
    dataSource?: any[]
    colChange?: (data: ColumnPropsSwith[]) => void
    components?: any
    tableTools?: React.ReactNode
    showHeaderRightTool?: boolean | undefined
    pagination?: PaginationType
    [index: string]: any
}
