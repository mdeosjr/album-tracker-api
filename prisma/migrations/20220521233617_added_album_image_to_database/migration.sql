/*
  Warnings:

  - Added the required column `image` to the `albums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "image" TEXT NOT NULL;
