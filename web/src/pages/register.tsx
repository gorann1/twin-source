import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import { Box, Button, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
const router = useRouter()   
const [, register] = useRegisterMutation();
  return  (
    <Wrap w="100%">
      <WrapItem mx="auto">
      <Center maxW="600px" h="auto" mt="8">
        <Formik 
        initialValues={{username: '', password:''}}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          console.log(response)
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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