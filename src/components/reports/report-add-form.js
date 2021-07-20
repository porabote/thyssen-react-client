import React, { Component } from 'react'
import { Input, Button, Select } from '../app/form'
import { Formik, Form, Field } from 'formik'

class ReportAddForm extends Component {

   // import { useFormik } from 'formik';

//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';


// const WithMaterialUI = () => {
//     const formik = useFormik({
//         initialValues: {
//             email: 'foobar@example.com',
//             password: 'foobar',
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values) => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
// }


    render() {


        return (
            <div>
                <form >

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>


        )
    }

}

export default ReportAddForm