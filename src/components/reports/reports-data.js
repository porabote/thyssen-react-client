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
console.log(data.relationships)
        return(
            <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
                <StripedListRow>
                    <StripedListCell>Объект</StripedListCell>
                    <StripedListCell>
                        {typeof data.relationships.departments !== "undefined" &&
                            data.relationships.departments.attributes.name
                        }</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Представительство</StripedListCell>
                    <StripedListCell>
                        {typeof data.relationships.departments !== "undefined" &&
                            data.relationships.departments.attributes.name
                        }
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Тип отчета</StripedListCell>
                    <StripedListCell>
                        {typeof data.relationships.types !== "undefined" &&
                            data.relationships.types.attributes.name
                        }</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>На дату</StripedListCell>
                    <StripedListCell>{data.attributes.date_period}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Комментарий</StripedListCell>
                    <StripedListCell>{data.attributes.comment}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Дата создания</StripedListCell>
                    <StripedListCell>{data.attributes.created_at}</StripedListCell>
                </StripedListRow>
            </StripedList>
        )
    }

}

export default ReportData