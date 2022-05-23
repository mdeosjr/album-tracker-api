import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import * as albumController from '../controllers/albumController.js'

const albumRouter = Router()

albumRouter.post('/save-album', validateToken, albumController.save)
albumRouter.get('/get-albums', validateToken, albumController.albums)
albumRouter.delete('/delete-album/:albumId', validateToken, albumController.deleteAlbum)

export default albumRouter  