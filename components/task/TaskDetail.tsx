// import type { Tasks } from "@prisma/client";
// import { Icon } from "@/modules/shared/icon";
import { Task } from "@prisma/client";
import { useRef, useState } from "react";
// import { formatDate } from "@/lib/formatHelpers";
// import { DeleteButton } from "@/modules/shared/DeleteButton";
import { useForm } from "react-hook-form";
import { Icon } from "../shared/icon";
import { DeleteButton } from "../shared/DeleteButton";
import { formatDate } from "@/utils/DateFormats";

interface TaskDetailProps {
  task: Task;
  refreshData: () => void;
}

const TaskDetail = ({ task, refreshData }: TaskDetailProps) => {
  const [taskState, setTaskState] = useState<"view" | "edit">("view");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<Task>();
  const checkbox = useRef<HTMLInputElement>(null);

  console.log({ task });

  const editTask = async (data: Task) => {
    try {
      const body = { name: data.name };
      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      refreshData();
      setTaskState("view");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = () => {
    if (checkbox?.current?.checked) completeTask();
    else incompleteTask();
  };

  const completeTask = async () => {
    console.log(task.id);
    try {
      await fetch(`/api/tasks/complete/${task.id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const incompleteTask = async () => {
    console.log(task.id);
    try {
      await fetch(`/api/tasks/incomplete/${task.id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (): Promise<void> => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });
    refreshData();
  };

  const cancelEdit = () => {
    setTaskState("view");
    reset();
  };

  return (
    <>
      {taskState === "view" && (
        <div className="flex justify-between pb-4">
          <div className="flex flex-1">
            <input
              type="checkbox"
              className="task"
              name={`task-${task.id}`}
              id={`task-${task.id}`}
              onChange={toggleComplete}
              ref={checkbox}
              //TODO: figure this out: defaultChecked={task.completedDateTime}
            />
            <label htmlFor={`task-${task.id}`} className="text-white task-name">
              {task.name}
            </label>
          </div>
          <div className="flex items-center mr-5 text-stormGray">
            {task.completedDateTime && formatDate(task.completedDateTime)}
          </div>
          <div className="flex gap-5">
            <button
              className="icon-button"
              onClick={() => setTaskState("edit")}>
              <Icon name="Edit" />
            </button>
            <DeleteButton deleteItem={deleteTask} />
          </div>
        </div>
      )}
      {taskState === "edit" && (
        <div className="pb-4 block h-[60px]">
          <form
            onSubmit={handleSubmit(editTask)}
            className="flex justify-between items-center m-0 p-0 w-full relative">
            <input
              type="text"
              defaultValue={task.name}
              {...register("name", { required: true })}
              className="p-0 m-0 list-input flex-1 text-base text-white border-b border-dashed bg-transparent focus:outline-none mr-5 ml-[54px]"
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
        </div>
      )}
    </>
  );
};

export { TaskDetail };
