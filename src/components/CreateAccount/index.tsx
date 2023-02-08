import { EmailIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, useToast, VStack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitch } from "react-icons/fa";
import { toastPosition } from "../../config/constants";
import ReturnButton from "../layout/ReturnButton";

type IFormInput = {
  email: string;
};

export default function CreateAccount(): ReactElement {
  // Hooks
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
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
            A Few Clicks Away From Your Date!
          </Heading>
        </Box>
        <VStack>
          <Button
            variant={"outline"}
            leftIcon={<FaGoogle />}
            w={"full"}
            borderRadius={"full"}
            size={"lg"}
          >
            Signup With Google
          </Button>
          <Button
            variant={"outline"}
            leftIcon={<FaInstagram />}
            w={"full"}
            borderRadius={"full"}
            size={"lg"}
          >
            Signup With Instagram
          </Button>
          <Button
            variant={"outline"}
            leftIcon={<FaFacebookF />}
            w={"full"}
            borderRadius={"full"}
            size={"lg"}
          >
            Signup With Facebook
          </Button>
          <Button
            variant={"outline"}
            leftIcon={<FaTwitch />}
            w={"full"}
            borderRadius={"full"}
            size={"lg"}
          >
            Signup With Twitch
          </Button>
          <Button
            leftIcon={<EmailIcon />}
            w={"full"}
            borderRadius={"full"}
            size={"lg"}
            bgColor={"#FF513A"}
            color={"white"}
            onClick={() =>
              router.push(`/create-account/email?prev=create-account?prev=${query.prev}`)
            }
          >
            Signup With Email
          </Button>
        </VStack>
      </Flex>
    </form>
  );
}
