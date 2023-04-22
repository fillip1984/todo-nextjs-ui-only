import { Prisma, Project } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteButton } from "../shared/DeleteButton";
import { Icon } from "../shared/icon";

interface ProjectDetailProps {
  // project: Prisma.ProjectSelect;
  project: Project;
  refreshData: () => void;
}

const ProjectDetail = ({ project, refreshData }: ProjectDetailProps) => {
  const [projectState, setProjectState] = useState<"view" | "edit">("view");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<Project>();

  useEffect(() => {
    setFocus("name");
  }, [setFocus, projectState]);

  const onSubmit: SubmitHandler<Project> = async (data) => {
    try {
      const body = { name: data.name };
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      refreshData();
      setProjectState("view");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (): Promise<void> => {
    await fetch(`/api/projects/${project.id}`, {
      method: "DELETE",
    });
    refreshData();
  };

  const cancelEdit = () => {
    setProjectState("view");
    reset();
  };

  return (
    <>
      {projectState === "view" && (
        <div className="flex justify-between items-center gap-x-5 w-full">
          <Link
            href={`/projects/${project.id}`}
            className="text-6xl font-bold text-white hover:text-goldenTainoi border-b border-transparent">
            {project.name}
          </Link>
          <div className="flex gap-4">
            <button
              className="icon-button w-[42px] h-[42px]"
              onClick={() => setProjectState("edit")}>
              <Icon name="Edit" />
            </button>
            <DeleteButton deleteItem={deleteProject} />
          </div>
        </div>
      )}
      {projectState === "edit" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between items-center m-0 p-0 w-full relative -top-[18px] -mb-[30px]">
          <input
            type="text"
            defaultValue={project.name}
            {...register("name", { required: true })}
            className="p-0 m-0 list-input flex-1 text-6xl font-bold text-white border-b border-dashed bg-transparent focus:outline-none"
          />
          <div className="flex gap-4">
            <button className="icon-button" type="submit" role="submit">
              <Icon name="Check" height={42} width={42} />
            </button>
            <button className="icon-button" onClick={cancelEdit}>
              <Icon name="Cancel" height={42} width={42} />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export { ProjectDetail };
