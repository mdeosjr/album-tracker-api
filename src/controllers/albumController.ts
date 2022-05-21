import { Request, Response } from 'express'
import { albumServices } from '../services/albumServices.js'   

export async function save(req: Request, res: Response) {
   const album: any = req.body
   const { id } = res.locals.user

   await albumServices.saveAlbum(album, id)

   res.sendStatus(201)
}

export async function albums(req: Request, res: Response) {
   const { id } = res.locals.user

   const albums = await albumServices.getAlbums(id)

   res.status(200).send(albums)
}