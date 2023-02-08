import { Container } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/layout/Layout";
import Login from "../components/Login";

type LoginPageProps = {
  prevUrl?: string;
};

const LoginPage = ({ prevUrl }: LoginPageProps) => {
  return (
    <Layout title="Login">
      <Container maxW={"xl"}>
        <Login prevUrl={prevUrl} />
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
    props: {
      prevUrl: req.headers.referer,
    },
  };
};
export default LoginPage;
