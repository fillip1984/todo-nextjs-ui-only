import { prisma } from "@/prisma/globalPrismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  const result = await prisma.project.create({
    data: {
      name,
    },
  });
  res.json(result);
}
