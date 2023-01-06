import React, {useState, useEffect, useRef, MutableRefObject, MouseEvent, ChangeEvent, MouseEventHandler} from "react";
import Option, {OptionProps} from "./Option";
import {FormContextInterface} from "../FormContext";
//import SelectTags from "./select-tags";

type setData = () => {[key: string]: any;}[];

export interface ISelect {
  children?: React.ReactElement;
  formContext: FormContextInterface;
  isEmpty?: boolean | undefined;
  emptyTitle?: string | undefined;
  value: string | number | null;
  label: string;
  name: string;
  options: {props: OptionProps}[] | [];
  optionValueKey: string | number;
  optionTitle: string | number | undefined;
  setData: setData;
  mode?: 'tags' | 'default' | undefined;
  buttons?: [];
};

const Select = (props: ISelect) => {

  const [options, setOptions] = useState<{props: OptionProps}[] | []>([]);
  const [value, setValue] = useState(props.value || null);
  const [name, setName] = useState(props.name || "");
  const [optionValueKey, setOptionValueKey] = useState(props.optionValueKey || "id");
  const [optionTitle, setOptionTitle] = useState(props.optionTitle || "name");
  const [label, setLabel] = useState(props.label || "");
  const [isDisabled, setIsDIsabled] = useState(false);
  const [isEmpty, setIsEmpty] = useState(props.isEmpty || true);
  const [emptyTitle, setEmptyTitle] = useState(props.emptyTitle || "Не выбрано");
  const [seekValue, setSeekValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [seekDelay, setSeekDelay] = useState(300);
  const [mode, setMode] = useState(props.mode || "default");
  const [inputValue, setInputValue] = useState("");
  const [dataStorage, setDataStorage] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [buttons] = useState(props.buttons || []);

  const wrap = useRef() as MutableRefObject<HTMLDivElement>;
  const toggle = useRef() as MutableRefObject<HTMLDivElement>;
  const textInput = useRef() as MutableRefObject<HTMLInputElement>;
  const dropPanel = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {

    setDropPanelWidth();
    setElementPositions();
    setOptionsList();

  }, [props.children]);


  const setOptionsList = async () => {

    let data: {}[] = [];
    let selectedOption = null;

    if (typeof props.setData == "function") {
      data = await props.setData();
    }

    // if (isEmpty) setIsEmptyOption(Options);
    let optionsList: any[] = data.map((item: {[key: string]: any;}): {} => {

      let isSelected = (value == item[optionValueKey]) ? true : false;

      return (
        <Option
          key={item[optionValueKey]}
          value={item[optionValueKey]}
          selected={isSelected}
          onSelect={onSelect}
        >
          {item[optionTitle]}
        </Option>
      );
    });

    // let inputValue = (selectedOption && mode !== "tags")
    //   ? selectedOption.props.children : isEmptyTitle
    //

    setOptions(optionsList);
  }

  /*
  * Set Default Option
  * */
  const setEmptyOption = () => {
    // if (isEmpty) {
    //   options.unshift(<Option key={Math.random()} value="">{isEmptyTitle}</Option>)
    // }
    // return options
  }

  const onSelect = (newValue: any, optionProps: OptionProps, e: MouseEvent<HTMLDivElement>) => {//e

    setValue(newValue);
    setInputValue(optionProps.children);
    setIsOpened(false);

    setSeekValue("");


    if (props.formContext.entity) {console.log(props);
      props.formContext.entity.setAttribute(name, newValue);
    }

    // if (typeof props.clickByOption != "function") {
    //   props.formContext.setFieldValue(props.name, e.target.getAttribute("value"));
    // } else {
    //   props.clickByOption(e, props.formContext);
    // }
    //
    // if (typeof props.afterSelectCallback === "function") props.afterSelectCallback(e, props.formContext)

    // e.preventDefault();
  }

  const checkIsDIsabled = () => {
    // let disabled = (props.disabled) ? true : false;
    // if (typeof props.disabled == "function" ) {
    //   disabled = props.disabled(props.formContext);
    // }
    return false;
  }

  const clickByOptionTagsMode = () => {//e

    // if (e.target.getAttribute("value").length === 0) return

    // let value = [...props.formContext.values[props.name], e.target.getAttribute("value")]
    // props.formContext.setFieldValue(props.name, e.target.getAttribute("value"), "push")

    // value = value.filter((value, index, self) => {
    //   return self.indexOf(value) === index;
    // })

    // setState({
    //   value
    // })

    //props.formContext.setFieldValue(props.name, value)

  }

  const setElementPositions = () => {
    dropPanel.current.style.top = "34px";
  }


  const toggleDropList = () => {
    if (!isOpened) {
      textInput.current.focus();
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }

  const showDropPanel = () => {
    //   dropPanel.current.style.zIndex = 1000
    setIsOpened(true);
  }

  const hideDropPanel = () => {//e: ChangeEvent<HTMLInputElement>
    //dropPanel.current?.style.zIndex = 10
    setIsOpened(false);
  }

  /* Если селект был инициализирован в display:none, обновляем ширину */
  const setDropPanelWidth = () => {
    if (wrap.current && dropPanel.current && wrap.current.offsetWidth !== dropPanel.current.offsetWidth) {
      dropPanel.current.style.width = wrap.current.offsetWidth + "px";
    }
  }

  const buildOptions = () => {

    return options.map((option, index) => {

      //  if (typeof option === "undefined" || typeof option.props === "undefined") return

      if (!checkOnSeek(option.props.children || "")) return;

     // let onSelect = clickByOption;
      // if (mode === "tags") afterSelectCallback = clickByOptionTagsMode

      return option;
     // return React.cloneElement(option, {...option.props, onSelect})
    })

  }

  const checkOnSeek = (value: string | number): boolean => {// | number

    if (typeof value != "string" || !value) return true;

    return (
      value
      && value.length > 0
      && !value.toLowerCase().includes(seekValue)
    ) ? false : true;
  }

  const onClickByInput = (): void => {
    textInput.current.select();
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setSeekValue(e.target.value.toLowerCase());
  }

  let dropStyle = {visibility: "hidden"}

  if (isOpened) {
    dropStyle = {visibility: "visible"}
  }

  let reOptions = buildOptions();

  // const tags = (mode === "tags") ?
  //   <SelectTags
  //     name={props.name}
  //     formContext={props.formContext}
  //     tagElement={props.tagElement}
  //     dataStorage={dataStorage}
  //   /> : "";
  //

  return (
    <div className="form-item flex no_padding">
      <label className="form-item__label">{label}</label>
      <div
        className="form-item__select-wrap"
        ref={wrap}
      >
          <span className="form-item__select-custom">
              <input
                disabled={isDisabled}
                ref={textInput}
                className="form-item__select-custom__input"
                type="text"
                onChange={onChangeInput}
                onClick={onClickByInput}
                onFocus={showDropPanel}
                onBlur={hideDropPanel}
                value={(inputValue) ? inputValue : ""}
              />

              <span
                ref={toggle}
                className="form-item__select-custom__toggle"
                onMouseDown={(e) => {
                  if (isDisabled) return;
                  e.preventDefault();
                  toggleDropList()
                }}
              >
                  <span className="form-item__select-custom__icon"></span>
              </span>

              <div
                style={{visibility: (isOpened) ? "visible" : "hidden"}}
                ref={dropPanel}
                className="form-item__select__drop-blok"
              >
                  <span>
                      {reOptions}
                  </span>

              </div>

            <div className="form-item__select__buttons">
              {/*{buttons.map(item => item)}*/}
            </div>
          </span>
      </div>
      {/*{tags}*/}
    </div>
  );

}

export default Select;
