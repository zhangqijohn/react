import {fixedType} from "@/components/Q1Table/Q1Table";

export type SizeS = 'large' | 'middle' | 'small'
export type SizeSwitch = 'default' | 'small'
export type RadioOptionType = { label: string; value: number | string; [key: string]: any }

export interface ParamsType {
    addonAfter?: string | React.ReactNode
    addonBefore?: string | React.ReactNode
    defaultValue?: any
    id?: string
    maxLength?: number
    prefix?: string | React.ReactNode
    size?: SizeS | undefined
    sizeSwitch?: SizeSwitch | undefined
    suffix?: string | React.ReactNode
    placeholder?: string
    value?: string
    disable?: boolean
    allowClear?: boolean
    autoSize?: boolean | { minRows: number; maxRows: number }
    loading?: boolean
    visibilityToggle?: boolean
    radioOption?: RadioOptionType[]
    allowHalf?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    vertical?: boolean
    step?: number
    tooltipVisible?: boolean
    options?: any
    mode?: 'multiple' | 'tags' /*select*/
    maxTagCount?: number
    maxTagTextLength?: number
    showSearch?: boolean
    showArrow?: boolean

    [key: string]: any
}

export interface InputType {
    params?: ParamsType
    onChange?: (e: any) => void
    onPressEnter?: (e: any) => void
}

export interface RulesType {
    required?: boolean
    message?: string
}

export interface SearchType extends InputType {
    onSearch?: (e: any) => void
}

export interface TextareaType extends SearchType {
    onChange?: (e: any) => void
    onResize?: (e: any) => void
}

export interface Q1DataEntryJsonType extends TextareaType {
    templateType: string
    name: string
    id: number
    label?: string
    rules?: Array<RulesType>
    gameid?: number
    hidden?: boolean
}

export interface EditableTablePropsType extends TextareaType {
    data: Q1DataEntryJsonType[]
    dataSourceChange?: (data: Q1DataEntryJsonType[]) => void;
}

export interface EditableTableColumnsType {
    id?: number;
    title?: React.ReactNode;
    key?: React.Key;
    dataIndex?: string | string[];
    align?: 'left' | 'right' | 'center';
    defaultSortOrder?: 'ascend' | 'descend';
    colSpan?: number;
    width?: string | number;
    className?: string;
    defaultSortOrder?: 'ascend' | 'descend';
    switch?: 0 | 1 | undefined;
    fixed?: fixedType;
    editable?: boolean;

    [index: string]: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editable?: boolean;
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: any;
    record: Q1DataEntryJsonType;
    index: number;
    children: React.ReactNode;
    handleSave: any;
}
