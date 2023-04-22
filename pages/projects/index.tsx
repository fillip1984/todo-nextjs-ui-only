import { ProjectDetail } from "@/components/project/ProjectDetail";
import { Icon } from "@/components/shared/icon";
import { Page } from "@/components/shared/layout/Page";
import { Prisma, Project } from "@prisma/client";

import { SubmitHandler, useForm } from "react-hook-form";

interface ProjectListPageProps {
  projects: Prisma.ProjectSelect[];
  refreshData: () => void;
}

const ProjectListPage = ({ projects, refreshData }: ProjectListPageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>();
  const onSubmit: SubmitHandler<Project> = async (data) => {
    try {
      const body = { name: data.name };
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      refreshData();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <h1>Projects</h1>

      {/* add a project */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <input type="text" {...register("name", { required: true })} />
        <div>
          <button
            type="submit"
            role="submit"
            className="text-white hover:text-persianBlue bg-persianBlue hover:bg-goldenTainoi rounded-full w-[57px] h-[57px] flex justify-center items-center">
            <Icon name="Plus" />
          </button>
        </div>
      </form>

      {/* project list */}
      <ul>
        {projects &&
          projects.map((project, index) => (
            <li className="w-full flex justify-between mb-5" key={index}>
              <ProjectDetail project={project} refreshData={refreshData} />
            </li>
          ))}
      </ul>
    </Page>
  );
};

export default ProjectListPage;
