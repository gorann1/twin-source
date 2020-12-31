import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button, Center, Wrap, WrapItem } from '@chakra-ui/react';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return  (
    <Wrap w="100%">
      <WrapItem mx="auto">
      <Center maxW="600px" h="auto" mt="8">
        <Formik initialValues={{username: '', password:''}}
        onSubmit={(values) => {
          console.log(values);
        }}>
          {({isSubmitting }) => (
            <Form>
              <InputField 
              name="username" 
              placeholder="username"
              label="username"
              />
              <Box mt={4}>
              <InputField 
              name="password" 
              placeholder="password"
              label="password"
              type="password"
              />
              </Box>
              <Button mt={4} type="submit" 
              isLoading={isSubmitting}
              colorScheme="teal" 
              variant="outline" 
              size="md"> Register </Button>
            </Form>
          )}
        </Formik>
        </Center>
      </WrapItem>
    </Wrap>
  )

};

export default  Register;