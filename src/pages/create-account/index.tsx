import { Container } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import CreateAccount from "../../components/CreateAccount";
import Layout from "../../components/layout/Layout";

type LoginPageProps = {
  prevUrl?: string;
};

const CreateAccountPage = ({ prevUrl }: LoginPageProps) => {
  return (
    <Layout title="Login">
      <Container maxW={"xl"}>
        <CreateAccount />
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
export default CreateAccountPage;
