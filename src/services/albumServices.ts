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

   const userAlbum: Omit<AlbumToUser, "id"> = {
      albumId: spotifyAlbumId,
      userId
   }

   await albumRepository.create(data)
   await albumRepository.createUserAlbum(userAlbum)
   await trackRepository.saveTracks(tracks)
}

async function getAlbums(userId: number) {
   return await albumRepository.getUserAlbums(userId)
}

export const albumServices = {
   saveAlbum,
   getAlbums
}
