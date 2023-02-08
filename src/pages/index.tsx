import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "../components/layout/Layout";
import Welcome from "../components/Welcome";

export default function Home() {
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
      <Welcome />
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/onboarding",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
