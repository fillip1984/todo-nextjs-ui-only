import { prisma } from "@/prisma/globalPrismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const taskId = parseInt(req.query.id as string);

  const data = { completedDateTime: new Date() };

  const result = await prisma.task.update({
    where: { id: taskId },
    data,
  });
  res.json(result);
}
