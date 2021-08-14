import React, { Component } from 'react'
import { ButtonUpload } from '@porabote/form'
import { StripedList, StripedListRow, StripedListCell } from '@porabote/striped-list'

class ReportsViewFiles extends Component {

    render() {

        return(
            <div>

                <StripedList style={{gridTemplateColumns: '250px 200px 1fr'}}>
                    {this.props.files.data.map((file, index) => {
                        return(
                            <StripedListRow key={index}>
                                <StripedListCell>
                                    <a
                                        href={`https://api.porabote.ru${file.attributes.uri}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {file.attributes.basename}
                                    </a>
                                </StripedListCell>
                                <StripedListCell>
                                    {file.attributes.date_created}
                                </StripedListCell>
                                <StripedListCell>
                                    {file.title}
                                </StripedListCell>
                            </StripedListRow>
                        )
                    })}
                </StripedList>

                <div style={{marginTop: '50px'}}></div>
                <ButtonUpload
                    progressBar={true}
                    uri='/api/reports/uploadReportFile/'
                    data={{
                        record_id: this.props.data.id,
                        model_alias: 'reports'
                    }}
                    afterUpload={response => {
                        console.log(response);
                        // this.setState({
                        //     files: e.target.files
                        // })
                    }}
                >
                    <span>Загрузить отчет</span>
                </ButtonUpload>
                
                <div style={{paddingBottom: '20px'}}></div>

            </div>
        )
    }
}

export default ReportsViewFiles