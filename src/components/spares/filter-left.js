import React, { Component } from 'react'
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

class FilterLeft extends Component {

    render() {

        const { objects } = this.props.dicts

        return (

            <React.Fragment>
              <div className="content__filter__left__title">Фильтр</div>


                <Field>
                    <Select
                        name="where.object_id"
                        label="Обьект"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(objects).map((id) => {
                            if (objects[id].kind == "store") {
                                return <Option key={id} value={id}>{objects[id].name}</Option>
                            }
                        })}
                    </Select>
                </Field>
            </React.Fragment>

        )
    }

}

export default withDictsData(FilterLeft, { storeAlias: "spares" });