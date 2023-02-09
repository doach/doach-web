import { Box, Button, Center, Flex, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function Welcome(): ReactElement {
  const router = useRouter();

  return (
    <Flex height={"100vH"} alignItems={"center"} justifyContent={"center"} py={8} px={5}>
      <Image
        overflow={"hidden"}
        w={[400, 700]}
        src={"/svg/ellipse-750.svg"}
        position={"absolute"}
        transform={"rotate(270deg)"}
        left={-150}
      />
      <Box position={"absolute"} bottom={0} right={0} top={0}>
        <Image src={"/images/woman-1.png"} height={"full"} width={"full"} />
      </Box>
      <Flex zIndex={1} height={"full"} flexDir={"column"} justifyContent={"flex-end"}>
        <Heading size={"2xl"} color={"white"}>
          Learn to date the right way
        </Heading>
        <Button
          borderRadius={"full"}
          size={"lg"}
          color={"#FF886B"}
          mt={10}
          onClick={() => router.push("/login?prev=home")}
        >
          Sign in
        </Button>
        <HStack mt={5}>
          <Button leftIcon={<FaGoogle />} w={"full"} borderRadius={"full"} size={"lg"}>
            Google
          </Button>
          <Button leftIcon={<FaFacebookF />} w={"full"} borderRadius={"full"} size={"lg"}>
            Facebook
          </Button>
        </HStack>
        <Center mt={5}>
          <Text color="white" whiteSpace={"nowrap"}>
            Join with us.{" "}
            <Link
              fontWeight={"bold"}
              color={["#FF513A", "white"]}
              whiteSpace={"nowrap"}
              onClick={() => router.push("/create-account?prev=home")}
            >
              Create Account
            </Link>
          </Text>
        </Center>
      </Flex>
    </Flex>
  );
}
