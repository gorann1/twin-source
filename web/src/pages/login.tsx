import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router'


const Login: React.FC<{}> = ({}) => {
const router = useRouter()   
const [, login] = useLoginMutation();
  return  (
    <Wrap w="100%">
      <WrapItem mx="auto">
      <Center maxW="600px" h="auto" mt="8">
        <Formik 
        initialValues={{username: '', password:''}}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({options: values});
          console.log(response)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
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
              size="md"> Login </Button>
            </Form>
          )}
        </Formik>
        </Center>
      </WrapItem>
    </Wrap>
  )

};

export default  Login;