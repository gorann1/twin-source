import React from 'react'
import {Formik, Form} from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

interface loginProps {

}

const Login: React.FC<loginProps> = ({}) => {
  return (
    <Formik 
    initialValues={{ username:"", password:""}}
    onSubmit={(values) => {
      console.log(values)
    }}
    >
      {({values, handleChange}) => (
        <Form>
           <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input 
              value={values.username}
              onChange={handleChange} 
              id="username" 
               placeholder="username" />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}


export default Login