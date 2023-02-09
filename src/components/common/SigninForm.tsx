import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toastPosition } from "../../config/constants";

type IFormInput = {
  email: string;
};

export default function SigninForm(): ReactElement {
  // Hooks
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const { query } = router;

  /**
   * Form submit
   * @param {IFormInput} values
   */
  async function onSubmit(values: IFormInput) {
    try {
      await signInWithEmail(values);
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
   * Signin with email a
   * @param {IFormInput} data
   * @return {Promise<CognitoUser>}
   */
  async function signInWithEmail(data: IFormInput) {
    try {
      const { email } = data;
      const result = (await signIn("email", {
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
        router.push(`/create-account/success?prec${query.prev}`);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
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
      <FormHelperText>We'll send you a "magic link" that can be used to sign in.</FormHelperText>
      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>
  );
}
