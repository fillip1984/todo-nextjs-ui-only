import { prisma } from "@/prisma/globalPrismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { name, text, status, projectId } = req.body;
  const { name, projectId } = req.body;

  const result = await prisma.task.create({
    data: {
      name,
      // text,
      // status,
      project: {
        connect: {
          id: parseInt(projectId),
        },
      },
    },
  });

  res.json(result);
}
