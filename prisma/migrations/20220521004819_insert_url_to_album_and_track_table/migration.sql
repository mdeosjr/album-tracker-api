/*
  Warnings:

  - Added the required column `url` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "url" TEXT NOT NULL;
