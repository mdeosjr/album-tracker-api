import { Track } from '@prisma/client'
import { prisma } from '../db.js'

async function saveTracks(tracks: Track[]) {
    await prisma.track.createMany({ data: tracks })
}

export const trackRepository = {
    saveTracks
}