import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import ReturnButtonWithLabel from "../layout/ReturnButtonWithLabel";

export default function CreateAccountSuccess(): ReactElement {
  const router = useRouter();
  const { query } = router;

  return (
    <Flex
      flexDir={"column"}
      height={"100vH"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      py={16}
      px={5}
    >
      <ReturnButtonWithLabel label={"Back Home"} color="white" prevUrl={"/"} />
      <Box>
        <Heading size={"2xl"} color={"white"}>
          Congratulations Your Signin Was Successful.
        </Heading>
        <Text color={"white"} mt={5}>
          You will receive "magic links" that can be used to sign in.
        </Text>
      </Box>
    </Flex>
  );
}
