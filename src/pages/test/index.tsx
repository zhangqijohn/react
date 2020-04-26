import React, {useState} from 'react'
import {Select, Divider, Button} from 'antd'
import SelectMultiple from '@/components/Q1DataEntry/SelectMultiple'

// const array = ['请选择请选1择请选择adararf', 'l请1选择uc请选择y', 1, true, '3', '4']
const array = [
    {value: 1, label: 'joh1'},
    {value: 101, label: 'joh101'},
    {value: 102, label: 'joh102'},
]

function Test() {
    return (
        <>
            <SelectMultiple options={array} values={'value'} label={'label'}></SelectMultiple>
        </>
    )
}

export default Test
