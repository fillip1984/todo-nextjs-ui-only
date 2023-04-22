import { Icon } from "@/components/shared/icon";
import { TaskDetail } from "@/components/task/TaskDetail";
import { Task } from "@prisma/client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface TaskListPageProps {
  projectId: number;
  projectName: string;
  tasks: Task[];
  // project: Prisma.ProjectSelect;
  refreshData: () => void;
}

const TaskListPage = ({
  // project,
  projectId,
  projectName,
  tasks,
  refreshData,
}: TaskListPageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>();
  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      const body = { name: data.name, projectId: data.projectId };
      await fetch("/api/tasks", {
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
    <div>
      {/* back arrow */}
      <Link
        href="/"
        className="text-electricIndigo absolute left-0 top-0 bg-triangle w-[100px] h-[100px] bg-no-repeat p-3">
        <Icon name="Arrow" />
      </Link>

      <h1>{projectName}</h1>

      {/* add tasks */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
        <input type="text" {...register("name", { required: true })} />
        <input type="hidden" {...register("projectId")} value={projectId} />
        <div>
          <button
            type="submit"
            role="submit"
            className="text-white hover:text-persianBlue bg-persianBlue hover:bg-goldenTainoi rounded-full w-[57px] h-[57px] flex justify-center items-center">
            <Icon name="Plus" />
          </button>
        </div>
      </form>

      {/* task list */}
      {tasks?.map((task) => (
        <TaskDetail key={task.id} task={task} refreshData={refreshData} />
      ))}
    </div>
  );
};

export default TaskListPage;
