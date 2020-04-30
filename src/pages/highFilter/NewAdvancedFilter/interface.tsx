
export interface FilterType {
  value: string | number;
  label: string | number;
}
export interface FilterItem {
  attributeName: string | number;
  filterType: string | number;
  filterValue1: string | number;
  filterValue2: string | number;
}

export interface Item extends FilterItem {
  key?: string;
  selectType?: string | number;
  [propName: string]: any;
}
export interface EditItem {
  title: string;
  editable: boolean;
  dataIndex: string;
  inputType?: string;
}

export interface FormItemData {
  title: string;
  dataIndex: string;
  editable: boolean;
  inputType?: string;
  record: Item;
  handleSave?: () => void;
  [propName: string]: any;
}

export interface ColItem {
  key: string;
  [propsName:string]: any;
}

export interface FilterProps {
  tableName: string;
  className?: string;
  advancedQuery: () => void;
}

export interface FilterResult {
  filterList: FilterItem[];
  filterSelectType: number;
  templateName?: string; 
}