import { Request, Response, Router } from 'express'
import {
  getDirectoryContents,
  getFilePath,
} from './controller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.json(getDirectoryContents('.'))
})

router.get('/:sub', (req: Request, res: Response) => {
  const sub = req.params.sub
  return res.json(getDirectoryContents(sub))
})

router.get('/:sub/:file', (req: Request, res: Response) => {
  try {
    const sub = req.params.sub
    const file = req.params.file

    const path = getFilePath(sub, file)

    return res.download(path)
  } catch (error) {
    return res.json(error)
  }
})

export default router
