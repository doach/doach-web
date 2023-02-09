import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
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
          <Flex justifyContent={"flex-end"}>
            {query.prev && <ReturnButton prevUrl={query.prev as string} />}
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
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
