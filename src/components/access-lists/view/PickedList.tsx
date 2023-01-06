import React, {useState, useEffect} from 'react'
import { Form, Field, Select, Input, Button } from "@/app/Form";
import ApiUsers from "@/components/users/Models/ApiUsers";
import Observers from "@/components/observers/Models/Observers";

type PickedListProps = {
    entity_id: number;
    event_ids: number[];
};

const PickedList = (props: PickedListProps) => {

    const [users, setUsers] = useState([]);
    const [values, setValues] = useState({
        user_ids: [],
        entity_id: props.entity_id,
        event_ids: props.event_ids
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let users = await new ApiUsers()
          .setWhere()
          .get();
        console.log(users);

            // let users_list: {} = {};
            //
            // data.data.map(item => {
            //     users_list[item.id] = item;
            // })
            //
            // setState({
            //     users: (typeof data.data !== 'undefined') ? data.data : [],
            //     users_list
            // })

    }

    const submitForm = (values) => {

        Observers.setMethod("subscribe").get();
        // Api.get(
        //   `/api/observers/method/subscribe/`,
        //   {
        //       query: values,
        //   }
        // ).then((data) => {
        //     props.fetchRecord();
        // })
    }


        if (users.length == 0) return <p>Данные загружаются...</p>;

        return (
            <div>
                <Form
                    values={values}
                    action="/api/observers/method/subscribe/"
                    submitForm={submitForm}
                    submitFormAfter={(resp) => {
                        //window.location = `/porabote/business-events/view/${resp.data.id}`
                        //props.fetchRecord()
                    }}
                >
                    <Field>
                        <Select
                            name="user_ids"
                            label="Пользователи"
                            mode="tags"
                            tagElement={(value) => {
                                return(`${users_list[value].attributes.name} (${users_list[value].attributes.post_name})`)
                            }}
                        >
                            {users.map((user, index) => {
                                return <Option key={index} value={user.id}>{`${user.attributes.name} (${user.attributes.post_name})`}</Option>
                            })}
                        </Select>
                    </Field>

                    <Field>
                        <Button
                            text="Сохранить"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            onClick={() => {
                                props.removeModalItem(props.itemkey)
                                props.fetchRecord()
                            }}
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </Field>
                </Form>
            </div>
        );


}

export default PickedList;
