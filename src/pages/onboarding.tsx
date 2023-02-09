import { Container } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/layout/Layout";

const OnboardingPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"xl"}>Onboarding</Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default OnboardingPage;
