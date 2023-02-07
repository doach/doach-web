// import Storyblok from "../config/storyblok-service";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
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
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxW={"container.lg"}
        bgImage={"url('/svg/ellipse-750.svg')"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"contain"}
        backgroundPosition={"top"}
        height={"100vH"}
      >
        <Box height={"100vH"}>
          <Box position={"absolute"} bottom={0} right={0} top={0}>
            <Image src={"/images/woman-1.png"} height={"full"} width={"full"} />
          </Box>
          <Flex position={"absolute"} bottom={0} flexDir={"column"} justifyContent={"flex-end"}>
            <Heading color={"white"}>Learn to date the right way</Heading>
            <Button>Sign in</Button>
          </Flex>
        </Box>
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
