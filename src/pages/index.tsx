// import Storyblok from "../config/storyblok-service";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { FaFacebook, FaFacebookF, FaGoogle } from "react-icons/fa";
import Layout from "../components/layout/Layout";

interface HomeProps {}

/**
 * Renders index (home) page
 * @param {any} story
 * @param {any} preview
 * @return {ReactElement}
 */
export default function Home({}: HomeProps) {
  const [pageLoading, setLoading] = useState(false);

  const handleSignin = async () => {};

  return (
    <Layout
      title="Doach - Learn to date the right way"
      styles={{
        bg: "#FF886B",
        bgImage: "url('/svg/ellipse-749.svg')",
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container height={"100vH"} alignItems={"center"}>
        <Flex height={"100vH"} alignItems={"center"} justifyContent={"center"}>
          <Image
            overflow={"hidden"}
            w={[400, 1000]}
            src={"/svg/ellipse-750.svg"}
            position={"absolute"}
            transform={"rotate(270deg)"}
            left={-150}
          />
          <Box position={"absolute"} bottom={0} right={0} top={0}>
            <Image src={"/images/woman-1.png"} height={"full"} width={"full"} />
          </Box>
          <Flex zIndex={1} height={"full"} flexDir={"column"} justifyContent={"flex-end"}>
            <Heading color={"white"}>Learn to date the right way</Heading>
            <Button borderRadius={"full"} size={"lg"} color={"#FF886B"} mt={10}>
              Sign in
            </Button>
            <HStack mt={5} mb={14}>
              <Button leftIcon={<FaGoogle />} w={"full"} borderRadius={"full"} size={"lg"}>
                Google
              </Button>{" "}
              <Button leftIcon={<FaFacebookF />} w={"full"} borderRadius={"full"} size={"lg"}>
                Sign in
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}

function SkeletonFeature() {
  return (
    <Box width="100%">
      <SkeletonCircle startColor="gray.100" endColor="gray.600" size="14" mx="auto" />
      <SkeletonText startColor="gray.500" mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/devs",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
