/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "List" AS ENUM ('LISTENING', 'LISTENED', 'TOLISTEN');

-- DropTable
DROP TABLE "Album";

-- CreateTable
CREATE TABLE "albums" (
    "spotifyAlbumId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "list" "List" NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("spotifyAlbumId")
);

-- CreateTable
CREATE TABLE "albumToUser" (
    "id" SERIAL NOT NULL,
    "albumId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "albumToUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "spotifyTrackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "isMarked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("spotifyTrackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "albums_name_key" ON "albums"("name");

-- AddForeignKey
ALTER TABLE "albumToUser" ADD CONSTRAINT "albumToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albumToUser" ADD CONSTRAINT "albumToUser_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("spotifyAlbumId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("spotifyAlbumId") ON DELETE RESTRICT ON UPDATE CASCADE;
