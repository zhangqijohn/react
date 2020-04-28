
export interface filterTypeOptionsType {
    value: string;
    label: string;
}

export const filterTypeOptions:filterTypeOptionsType[] = [
    {value: 'input', label: '输入框'},
    {value: 'select', label: '下拉选择框'},
    {value: 'radio', label: '单选框'},
    {value: 'checkbox', label: '多选框'},
    {value: 'switch', label: 'switch开关'},
    {value: 'password', label: '密码框'},
    {value: 'textarea', label: '文本框'},
    {value: 'rate', label: '评分'},
    {value: 'slider', label: 'slider滑块'},
    {value: 'timePicker', label: '时间选择框'},
    {value: 'datePicker', label: '日期选择框'},
]
