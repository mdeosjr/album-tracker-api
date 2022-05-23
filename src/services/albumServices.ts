import { Album, AlbumToUser } from '@prisma/client'
import { albumRepository } from '../repositories/albumRepository.js'
import { trackRepository } from '../repositories/trackRepository.js'

async function saveAlbum(albumData: any, userId: number) {
   const { spotifyAlbumId, name, artist, url, cover, list, tracks } = albumData

   const data: Album = {
      spotifyAlbumId,
      name,
      artist,
      url,
      cover,
      list
   }

   const album = await albumRepository.findAlbumOfUser(userId, spotifyAlbumId)
   if (album) throw { type: 'conflict', message: 'Album already on your lists!' }

   const userAlbum: Omit<AlbumToUser, "id"> = {
      albumId: spotifyAlbumId,
      userId
   }

   await albumRepository.createAlbum(data)
   await albumRepository.createUserAlbum(userAlbum)
   await trackRepository.saveTracks(tracks)
}

async function getAlbums(userId: number) {
   return await albumRepository.getUserAlbums(userId)
}

async function deleteUserAlbum(userId: number, albumId: string) {
   const userAlbum = await albumRepository.findAlbumOfUser(userId, albumId)

   await trackRepository.deleteTracks(albumId)
   await albumRepository.deleteUserAlbum(userAlbum.id)
   await albumRepository.deleteAlbum(albumId)
}

export const albumServices = {
   saveAlbum,
   getAlbums,
   deleteUserAlbum
}
