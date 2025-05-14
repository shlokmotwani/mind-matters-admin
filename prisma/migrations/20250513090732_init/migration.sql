-- CreateTable
CREATE TABLE "Query" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "contact" VARCHAR(10) NOT NULL,
    "message" TEXT,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);
