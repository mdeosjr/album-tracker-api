type AppErrorTypes =
   | 'conflict'
   | 'unauthorized'
   | 'not_found'
   | 'unprocessable_entity'
   | 'bad_request'

export interface AppError {
   type: AppErrorTypes
   message: string
}

export function isAppError(error: object): error is AppError {
   return (error as AppError).type !== undefined
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
   if (type === 'conflict') return 409
   if (type === 'unauthorized') return 401
   if (type === 'not_found') return 404
   if (type === 'unprocessable_entity') return 422
   if (type === 'bad_request') return 400
}
