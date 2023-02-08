import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toastPosition } from "../../config/constants";
import ReturnButton from "../layout/ReturnButton";

type IFormInput = {
  email: string;
};

export default function CreateAccountWithEmail(): ReactElement {
  // Hooks
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const { query } = router;

  // Logic
  /**
   * Form submit
   * @param {IFormInput} values
   */
  async function onSubmit(values: IFormInput) {
    try {
      await signInWithEmailAndPassword(values);
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: "Failure",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: toastPosition,
      });
    }
  }
  /**
   * Signin with email and password function
   * @param {IFormInput} data
   * @return {Promise<CognitoUser>}
   */
  async function signInWithEmailAndPassword(data: IFormInput) {
    try {
      const { email } = data;
      const result = (await signIn("credentials", {
        redirect: false,
        email,
      })) as unknown as SignInResponse;

      if (result.error) {
        toast({
          title: "Failure",
          description: result.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: toastPosition,
        });
      } else {
        router.push("/room");
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex flexDir={"column"} justifyContent={"space-between"} height={"100vH"} py={8} px={2}>
        <Box>
          {query.prev && <ReturnButton prevUrl={query.prev as string} />}
          <Heading color={"gray.400"} fontSize={"lg"} mt={12}>
            Create Account
          </Heading>
          <Heading fontSize={"4xl"} mt={2} mr={10}>
            What's Your Email Address?
          </Heading>

          <FormControl isInvalid={Boolean(errors.email)} isRequired mt={14}>
            <FormLabel id="email" htmlFor="email">
              Email
            </FormLabel>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "This is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <Button
            w={"full"}
            bgColor={"#FF513A"}
            color={"white"}
            borderRadius={16}
            size={"xl"}
            isLoading={isSubmitting}
            type="submit"
          >
            Next
          </Button>
        </Box>
      </Flex>
    </form>
  );
}
