import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addQuery(query) {
  try {
    await prisma.query.create({
      data: query,
    });
    return { status: "success" };
  } catch (e) {
    return {
      status: "error",
      message: String(e),
    };
  }
}

export async function fetchQueries() {
  try {
    const res = await prisma.query.findMany();
    return res;
  } catch (e) {
    return {
      status: "error",
      message: String(e),
    };
  }
}
