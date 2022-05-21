import { Album, AlbumToUser } from '@prisma/client'
import { prisma } from '../db.js'

async function create(albumData: Album) {
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

export const albumRepository = {
   create,
   createUserAlbum,
   getUserAlbums
}
