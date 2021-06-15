import React from 'react'
import Option from './option'
import selectService from './select-service'

export default class Select extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            options: [],
            empty: (props.empty === undefined) ? 'Не выбрано' : props.empty,
            url: (props.url) ? props.url : null,
            uri: (props.uri) ? props.uri : null,
            limit : (props.limit) ? props.limit : 50,
            value : '',
            valueInit: null,            
            valueInput: '',
            searchPhrase: '',
            firstLoaded: null,
            seekDelay: 300,
            isAjaxCompleted: false,
            isOpened: false,
            isFirstLoad: true
        }

        this.textInput = React.createRef();
        this.dropPanel = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.toggleDropList = this.toggleDropList.bind(this);

    }

    componentDidMount() {

        this.setDropPanelWidth();
        this.setElementPositions();

        if(this.state.url) this.setDataByApi()
        else this.setOptions(this.props.children)

    }

    /*
    * Set Default Option
    * */
    getEmptyOption = () => {
        if(this.state.empty) {
            this.setState({valueInput: this.state.empty})
            return <Option key={Math.random()} value>{this.state.empty}</Option>;
        } else {
            return null
        }
    }

    /*
    * Set Options
    * */

    setOptions(Options) {

        let options = Options.map( (child, key) => {
            return child
        });

        let emptyOption = this.getEmptyOption()
        if(emptyOption) options = [this.getEmptyOption()].concat(options)

        this.setState({
            options: options,
        })

        this.setInitSelectValue()
        this.setInitvalueInput()
    }

    setInitSelectValue()
    {
        //console.log(this.state.options)
    }

    setInitvalueInput()
    {

    }

    setOptionsApi(data) {

        let options = [];
        for (const [key, option] of Object.entries(data)) {
            options.push(<Option key={key} value={option.id}>{option.name}</Option>)
        }

        this.setOptions(options)
    }

    focusTextInput(e) {

        // this.textInput.current.focus();
        //
        // this.dropPanel.current.style.visibility = 'visible';
        // this.dropPanel.current.style.zIndex = 301;
    }

    clickByLinkOption = (e) => {

        this.setState({
            isOpened: false,
            value: e.target.getAttribute('value'),
            valueInput: e.target.innerText
        })

        e.preventDefault();
    }

    setElementPositions() {

        this.dropPanel.current.style.width = this.refs.wrap.offsetWidth + 'px';
        this.dropPanel.current.style.top = this.refs.select.offsetHeight + 34 + "px";
    }

    setDataByApi = () => {

        var Select = this;

        setTimeout(function(e){
//console.log(Select.textInput.current);
            if(Select.textInput.current.value === Select.state.searchPhrase) {

                if(!Select.state.isFirstLoad && Select.dropPanel.current.style.visibility === 'hidden') {
                    Select.showDropPanel();
                }

                Select._loadDataByApi();
            }

        }, Select.seekDelay);
    }

    _loadDataByApi()
    {
        let Select = this;

        let url = this._setUrl();
        this.setState({
            isAjaxCompleted: false
        })

        selectService.fetch(url, {access_token: localStorage.getItem('access_token')}, {validateStatus: false})
            .then( resp => {
                if (resp.status === 200) {

                    Select.setOptionsApi(resp.data)

                    Select.setState({
                        isAjaxCompleted: true,
                        isFirstLoad: false
                    })
                }

            });
    }

    _setUrl = () => {

        let url = this.state.url
        return url
    }

    toggleDropList(el)
    {
        if(!this.state.isOpened) {

            this.textInput.current.focus();

            this.setState({
                isOpened: true
            })

        } else {

            this.setState({
                isOpened: false
            })
        }
    }

    showDropPanel = () => {
        this.dropPanel.current.style.zIndex = 1000
        this.setState({ isOpened: true })
    }

    hideDropPanel = () => {
        this.dropPanel.current.style.zIndex = 10
        this.setState({
            isOpened: false
        })
    }

    /* Если селект был инициализирован в display:none, обновляем ширину */
    setDropPanelWidth()
    {
        if(this.refs.wrap.offsetWidth !== this.dropPanel.current.offsetWidth) {
            this.dropPanel.current.style.width = this.refs.wrap.offsetWidth + 'px';
        }
    }

    render() {

        let dropStyle = { visibility: "hidden" }

        if(this.state.isOpened) {
            dropStyle = { visibility: "visible" }
        }

        return(
            <div className="form-item flex no_padding">
                <label className="form-item__label">{this.props.label}</label>
                <div className="form-item__select-wrap" ref="wrap">
                    <span className="form-item__select-custom on_wrap">

                        <select
                            ref="select"
                            value={this.state.value}
                            id={`select_${Math.random()}`}
                            name={this.props.name}
                            empty="Не выбрано"
                            placeholder=""
                            className="on-select__finder"
                            type="select"
                            onChange={ () => {} }
                        >
                           {this.state.options.map((option, index) => {
                               return option
                           })}

                        </select>

                        <input
                            ref={this.textInput}
                            className="form-item__select-custom__input on_listener"
                            type="text"
                            //onKeyUp={() => {}}
                            onChange={() => {

                            }}
                            onFocus={this.showDropPanel}
                            onBlur={ e => {
                                this.hideDropPanel();
                            }}
                            value={this.state.valueInput}
                        />

                        <span
                            ref="toggle"
                            className="form-item__select-custom__toggle"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                this.toggleDropList()
                            }}
                        >
                            <span className="form-item__select-custom__icon"></span>
                        </span>

                        <div
                            style={dropStyle}
                            ref={this.dropPanel}
                            className="form-item__select__drop-blok on_drop"
                        >
                            <span>
                               {this.state.options.map((option, index) => {

                                   return <p
                                       href="/test/"
                                       onClick={this.clickByLinkOption}
                                       value={(option.props.value) ? option.props.value : ''}
                                       key={index}
                                       className="form-item__select__drop-link on_drop_link"
                                   >
                                       {option.props.children}
                                   </p>
                               })}
                            </span>

                        </div>
                    </span>
                </div>

            </div>
        )
    }

}
// onClick={modalOpen("/peoples/add/")}

// <Button
//     type="button"
//     className="form-item__icon-plus tooltip js-open-modal"
//
// />



// _setUri()
// {
//     let encodedUri = '';
//
//     if(this.state.defaultValue && this.state.limit) {
//
//         let defaultUri = this.state.uri;
//         if(typeof defaultUri.where['AND'] == "undefined") defaultUri.where['AND'] = {};
//
//         let uri = {where : {AND : {id : this.state.defaultValue} }}
//         if(typeof this.state.pattern != "undefined") uri.state = this.state.pattern;
//         encodedUri = this.state.form.objectToQuerystring(uri);
//         if(!encodedUri) return null;
//         //encodedUri = encodedUri.replace(/7B\%7Bvalue\%7D\%7D/g, this.searchPhrase);
//
//         this.setState({'value': this.state.defaultValue, 'defaultValue': null})
//
//     } else if (typeof this.state.uriDefault != 'undefined') {
//
//         encodedUri = this.state.form.objectToQuerystring(typeof this.state.uriDefault);
//         //encodedUri = encodedUri.replace(/7B\%7Bvalue\%7D\%7D/g, this.state.searchPhrase);
//
//         delete this.state.uriDefault;
//
//     } else {
//
//         if(this.state.defaultValue) {
//             this.setState({'value': this.state.defaultValue})
//             delete this.state.defaultValue;
//         }
//
//         encodedUri = (typeof this.state.uri != 'undefined') ? this.state.form.objectToQuerystring(this.state.uri) : null;
//
//         if(!encodedUri) return null;
//         //encodedUri = encodedUri.replace(/7B\%7Bvalue\%7D\%7D/g, this.searchPhrase);
//     }
//
//     return encodedUri;
//
// }

// setSelected()
// {
//     //Опредляем дефолтное значение селекта, устанавливаем и обнуляем
//     if(this.state.value) {
//         this.refs.select.value = this.state.value;
//     }
//
//     var selectedOption = this.refs.select.options[this.refs.select.selectedIndex];
//
//     if(typeof selectedOption === "undefined") {
//         this.refs.textInput.value = 'Не выбрано';
//         this.refs.select.value = null;
//     } else {
//         this.textInput.current.value = selectedOption.innerHTML;
//         this.refs.select.value = selectedOption.getAttribute('value');
//     }
// }