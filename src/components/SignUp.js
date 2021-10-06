import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory} from 'react-router';
export default function SignUp({addAllUsers}) {
    const history= useHistory();
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        pin: Yup.string()
            .required('Required')
            .min(4,'Must be 4 digits'),
        
        email: Yup.string().email('Invalid email').required('Required'),
        phoneNumber: Yup.string()
          .required('Required'),
        password: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-9">
                        <h1>Signup</h1>
                        <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            phoneNumber: '',
                            password: '',
                            pin:''
                        }}
                        validationSchema={SignupSchema}
                        
                        onSubmit={(values) => {
                            // same shape as initial values
                            addAllUsers(values)
                            history.push('/signin')
                        }}
                        >
                        {({ errors, touched }) => (
                            <Form>
                            <Field name="firstName" className="form-control my-2" placeholder="First Name" />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}
                            <Field name="lastName" className="form-control my-2" placeholder="Last Name" />
                            {errors.lastName && touched.lastName ? (
                                <div>{errors.lastName}</div>
                            ) : null}
                             <Field name="phoneNumber" className="form-control my-2" placeholder="Phone Number" />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <div>{errors.phoneNumber}</div>
                            ) : null}
                            <Field name="email" type="email" className="form-control my-2" placeholder="Email"/>
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <Field name="password" type="text" className="form-control my-2" placeholder="Password"/>
                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                            <Field name="pin" type="text" className="form-control my-2" placeholder="Four-digit Pin" maxlength='4'/>
                            {errors.pin && touched.pin ? <div>{errors.pin}</div> : null}
                            <button type="submit" className="btn btn-success my-2">Submit</button>
                            
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    )
}
