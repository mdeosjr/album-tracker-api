-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
