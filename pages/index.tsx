import { prisma } from "@/prisma/globalPrismaClient";
import { Project } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ProjectListPage from "./projects";

interface HomeProps {
  // projects: Prisma.ProjectSelect[];
  projects: Project[];
}

export default function Home({ projects }: HomeProps) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log({ projects });

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Todo Nextjs tutorial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectListPage projects={projects} refreshData={refreshData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  return {
    props: { projects },
  };
};
