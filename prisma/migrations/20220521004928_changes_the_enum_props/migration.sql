/*
  Warnings:

  - The values [TOLISTEN] on the enum `List` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "List_new" AS ENUM ('LISTENING', 'LISTENED', 'TO_LISTEN');
ALTER TABLE "albums" ALTER COLUMN "list" TYPE "List_new" USING ("list"::text::"List_new");
ALTER TYPE "List" RENAME TO "List_old";
ALTER TYPE "List_new" RENAME TO "List";
DROP TYPE "List_old";
COMMIT;
