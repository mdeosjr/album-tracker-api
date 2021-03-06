import { Album, AlbumToUser } from '@prisma/client'
import { prisma } from '../db.js'

async function createAlbum(albumData: Album) {
   await prisma.album.create({
      data: albumData
   })
}

async function createUserAlbum(userAlbum: Omit<AlbumToUser, 'id'>) {
   await prisma.albumToUser.create({
      data: userAlbum
   })
}

async function getUserAlbums(userId: number) {
   return await prisma.albumToUser.findMany({
      where: {
         userId
      },
      include: {
         album: {
            include: {
               tracks: true
            }
         }
      }
   })
}

async function findAlbumOfUser(userId: number, albumId: string) {
   return await prisma.albumToUser.findFirst({
      where: {
         AND: [{ userId, albumId }]
      }
   })
}

async function deleteUserAlbum(id: number) {
   await prisma.albumToUser.delete({
      where: { id }
   })
}

async function deleteAlbum(albumId: string) {
   await prisma.album.delete({
      where: {
         spotifyAlbumId: albumId
      }
   })
}

export const albumRepository = {
   createAlbum,
   createUserAlbum,
   getUserAlbums,
   findAlbumOfUser,
   deleteUserAlbum,
   deleteAlbum
}
