import { Container } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/layout/Layout";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <Layout title="Login">
      <Container maxW={"xl"}>
        <Login />
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default LoginPage;
