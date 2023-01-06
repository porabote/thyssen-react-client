import React, {useState, MouseEvent} from 'react'

export type OptionProps = {
  children: string;
  selected: boolean;
  value: string;
  key: number | string;
  onSelect: (value: any, props: OptionProps, mouseEvent: React.MouseEvent<HTMLDivElement>) => any;
};

export type IOption = (props: OptionProps) => JSX.Element;

const Option: IOption = (props: OptionProps) => {

  const [value, setValue] = useState(props.value);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e);
    props.onSelect(value, props, e);
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="form-item__select__drop-link"
    >
      {props.children}
    </div>
  )
}

export default Option
