import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toastPosition } from "../../config/constants";
import ReturnButton from "../layout/ReturnButton";

type IFormInput = {
  name: string;
};

export default function Onboarding(): ReactElement {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex flexDir={"column"} justifyContent={"space-between"} height={"100vH"} py={8} px={2}>
        <Box>
          {query.prev && <ReturnButton prevUrl={query.prev as string} />}
          <Heading color={"gray.400"} fontSize={"lg"} mt={12}>
            Welcome
          </Heading>
          <Heading fontSize={"4xl"} mt={2} mr={10}>
            How shall we call you?
          </Heading>

          <FormControl isInvalid={Boolean(errors.name)} isRequired mt={14}>
            <FormLabel id="name" htmlFor="name">
              First name
            </FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="First name"
              {...register("name", {
                required: "This is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormHelperText>We'll never share your name.</FormHelperText>
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
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
