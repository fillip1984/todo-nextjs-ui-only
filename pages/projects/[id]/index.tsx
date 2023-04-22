import { Page } from "@/components/shared/layout/Page";
import { TaskListPage } from "@/pages/tasks";

import { prisma } from "@/prisma/globalPrismaClient";
import { safeJson } from "@/utils/SafeJson";
import { Prisma } from "@prisma/client";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  project: Prisma.ProjectSelect;
}

const Tasks = ({ project }: Props) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log({ project });

  return (
    <>
      <Head>
        <title>Tasks | Task Glitter</title>
        <meta
          name="description"
          content="Adding a little sparkle to your everyday to dos."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <TaskListPage
          // projectName={project.name}
          // projectId={project.id}
          // tasks={project.Tasks}
          project={project}
          refreshData={refreshData}
        />
      </Page>
    </>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
    };
  }

  let project = await prisma.project.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      Tasks: true,
    },
  });

  // TODO: figure out what this is doing:
  project = safeJson(project);

  return {
    props: { project: project },
  };
};
