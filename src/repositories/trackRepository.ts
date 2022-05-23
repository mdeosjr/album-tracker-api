import { Track } from '@prisma/client'
import { prisma } from '../db.js'

async function saveTracks(tracks: Track[]) {
    await prisma.track.createMany({ data: tracks })
}

async function deleteTracks(albumId: string) {
    await prisma.track.deleteMany({
        where: {
            albumId
        }
    })
}

export const trackRepository = {
    saveTracks,
    deleteTracks
}