import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { toastPosition } from "../../config/constants";

type IFormInput = {
  email: string;
  password: string;
};

type LoginProps = {
  prevUrl?: string;
};

/**
 * Renders a Login Form
 * @return {ReactElement}
 */
export default function Login({ prevUrl }: LoginProps): ReactElement {
  // Hooks
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

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
      const { email, password } = data;
      const result = (await signIn("credentials", {
        redirect: false,
        email,
        password,
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
      <Flex flexDir={"column"} justifyContent={"space-between"} height={"100vH"} py={5} px={2}>
        <Box>
          {prevUrl && (
            <IconButton
              variant={"ghost"}
              icon={<ArrowBackIcon />}
              aria-label={"Go back"}
              onClick={() => router.push(prevUrl)}
            />
          )}
          <Heading color={"gray.400"} fontSize={"lg"} mt={12}>
            Sign In To Account
          </Heading>
          <Heading fontSize={"4xl"} mt={2} mr={10}>
            Input Your Account
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

          <FormControl isInvalid={Boolean(errors.password)} isRequired mt={5}>
            <Flex justifyContent="space-between">
              <FormLabel id="password" htmlFor="password">
                Password
              </FormLabel>
            </Flex>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label="Show password"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            <Flex justifyContent={"space-between"} mt={5}>
              <FormControl>
                <Checkbox color="gray.400">Remember me</Checkbox>
              </FormControl>
              <Link color="gray.400" whiteSpace={"nowrap"}>
                Forgot Password?
              </Link>
            </Flex>
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
            Sign In
          </Button>
          <HStack mt={5}>
            <Button
              variant={"outline"}
              leftIcon={<FaGoogle />}
              w={"full"}
              borderRadius={"full"}
              size={"lg"}
            >
              Google
            </Button>
            <Button
              variant={"outline"}
              leftIcon={<FaFacebookF />}
              w={"full"}
              borderRadius={"full"}
              size={"lg"}
            >
              Sign in
            </Button>
          </HStack>
          <Center mt={5}>
            <Text color="gray.400" whiteSpace={"nowrap"}>
              Join with us.{" "}
              <Link color="#FF513A" whiteSpace={"nowrap"}>
                Create Account
              </Link>
            </Text>
          </Center>
        </Box>
      </Flex>
    </form>
  );
}
