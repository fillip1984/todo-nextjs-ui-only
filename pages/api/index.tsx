import type { GetServerSideProps } from "next";
import type { Prisma } from "@prisma/client";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "@/prisma/globalPrismaClient";
import ProjectListPage from "../projects";

interface Props {
  projects: Prisma.ProjectSelect[];
}

const Home = ({ projects }: Props) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log({ projects });

  return (
    <>
      <Head>
        <title>Projects | Task Glitter</title>
        <meta
          name="description"
          content="Adding a little sparkle to your everyday to dos."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectListPage projects={projects} refreshData={refreshData} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  return {
    props: { projects },
  };
};
