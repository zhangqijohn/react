import {SizeValType, filterTypeOptionsType} from '@/components/Q1Table/Q1Table'

export const filterTypeOptions: filterTypeOptionsType[] = [
    {label: '等于', value: 1},
    {label: '大于', value: 2},
    {label: '小于', value: 3},
    {label: '包含', value: 4},
]

export const sizeOptions: SizeValType[] = [
    {value: 'large', label: '默认'},
    {value: 'middle', label: '中等'},
    {value: 'small', label: '紧凑'},
]
