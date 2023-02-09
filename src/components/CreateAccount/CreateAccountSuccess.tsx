import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import ReturnButton from "../layout/ReturnButton";

export default function CreateAccountSuccess(): ReactElement {
  const router = useRouter();
  const { query } = router;

  return (
    <Flex flexDir={"column"} height={"100vH"} justifyContent={"space-between"} py={10} px={5}>
      <ReturnButton prevUrl={"/"} />

      <Box>
        <Heading size={"2xl"} color={"white"}>
          Congratulations your registration was successful.
        </Heading>
        <Text color={"white"} mt={5}>
          You will receive "magic links" that can be used to sign in.
        </Text>
      </Box>
    </Flex>
  );
}
