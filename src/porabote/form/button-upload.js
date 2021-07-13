import React from 'react'

class ButtonUpload extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.create.Ref();
    }

    render() {

        return(
            <label className='uploader__label-default' style={this.props.style || {}}>
                <div className="input_file">
                    <input
                        ref={this.fileInput}
                        multiple="multiple"
                        className="dropArea_input"
                        type="file"
                        {...this.props}
                    />
                    {this.props.children}
                </div>
            </label>
        )

    }

}