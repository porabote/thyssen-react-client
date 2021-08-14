import React, { Component } from 'react'
import { ButtonUpload } from '@porabote/uploader'
import { StripedList, StripedListRow, StripedListCell } from '@porabote/striped-list'

class PaymentsSetViewFiles extends Component {

    state = {
        files: null
    }

    componentDidMount() {
//console.log(this.props)
        //this.fetchFiles()

    }

    getRows = () => {
        if(this.state.files) {
            return this.state.files.map((file) => {
                return(
                    <StripedListRow key={file.id}>
                        <StripedListCell>
                            <a
                                href={`https://api.porabote.ru${file.uri}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {file.basename}
                            </a>
                        </StripedListCell>
                        <StripedListCell>
                            {file.date_created}
                        </StripedListCell>
                        <StripedListCell>
                            {file.title}
                        </StripedListCell>
                    </StripedListRow>
                )
            })
        }

    }

    render() {

        const rows = this.getRows()

        return(
            <div>
                <ButtonUpload
                    target-path="/payments-set/"
                    title="Отчет"
                    dscr=""
                    label="report"
                    main="none"
                    model_alias="App.PaymentsSet"
                    record_id="1"
                />

                <div style={{paddingBottom: '20px'}}></div>

                <StripedList style={{gridTemplateColumns: '250px 200px 1fr'}}>
                    {rows}
                </StripedList>


            </div>
        )
    }
}

export default PaymentsSetViewFiles