import React, { Component } from 'react'
import { StripedList, StripedListRow, StripedListCell } from '@porabote/striped-list'

class ReportData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    render() {

        const { data, dicts } = this.props

        if(data === null) {
            return(
                <StripedList>
                    <StripedListRow>
                        <StripedListCell>Данные не загружены</StripedListCell>
                    </StripedListRow>
                </StripedList>
            )
        }

        return(
            <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
                <StripedListRow>
                    <StripedListCell>Объект</StripedListCell>
                    <StripedListCell>{data.relationships.departments.attributes.name}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Представительство</StripedListCell>
                    <StripedListCell>
                        {data.relationships.departments.attributes.name}
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Тип отчета</StripedListCell>
                    <StripedListCell>{data.relationships.types.attributes.name}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>На дату</StripedListCell>
                    <StripedListCell>{data.attributes.date_created}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Комментарий</StripedListCell>
                    <StripedListCell>{data.attributes.comment}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Дата загрузки</StripedListCell>
                    <StripedListCell>{data.attributes.date_created}</StripedListCell>
                </StripedListRow>
            </StripedList>
        )
    }

}

export default ReportData