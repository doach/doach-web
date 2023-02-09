import { Container } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import CreateAccountSuccess from "../../components/CreateAccount/CreateAccountSuccess";
import Layout from "../../components/layout/Layout";

type LoginPageProps = {
  prevUrl?: string;
};

const CreateAccountPage = ({ prevUrl }: LoginPageProps) => {
  return (
    <Layout
      title="Login"
      styles={{
        bg: "#FF886B",
        bgImage: "url('/svg/ellipse-749.svg')",
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxW={"xl"}>
        <CreateAccountSuccess />
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
