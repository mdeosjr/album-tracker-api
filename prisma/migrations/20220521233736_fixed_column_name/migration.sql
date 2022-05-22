/*
  Warnings:

  - You are about to drop the column `image` on the `albums` table. All the data in the column will be lost.
  - Added the required column `cover` to the `albums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "albums" DROP COLUMN "image",
ADD COLUMN     "cover" TEXT NOT NULL;
