
export interface FilterType {
  value: string | number;
  label: string | number;
}
export interface Item {
  key: string;
  slectRangeMin: string;
  attributeName: string | number;
  filterType: string | number;
  filterValue1: string | number;
  filterValue2: string | number;
  slectRangeMax: string;
  selectType: string | number;
  [propName: string]: any;
}

export interface EditableRowProps {
  index: number;
}
export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  inputType?: string;
  record: Item;
  handleSave: (record: Item) => void;
}