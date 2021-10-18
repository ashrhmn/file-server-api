import { readdirSync, statSync } from 'fs'
import { extname, join } from 'path'

const serveDir = ['files','..','..']

export const subDir = (sub: string, root: string[]): string => {
  const dirWithSpace = sub.split('|').join(' ')
  const dirsArray = dirWithSpace.split('>')
  const absRoot = [__dirname, ...root]

  const pathArray = absRoot.concat(dirsArray)

  const path = join.apply(null, pathArray)

  return path
}

export const fileName = (file: string): string => {
  return file.split('|').join(' ')
}

export const getDirectoryContents = (dir: string) => {
  try {
    const files = readdirSync(subDir(dir, serveDir), {
      withFileTypes: true,
    })

    return files.map((file) => {
      if (file.isDirectory()) {
        return {
          name: file.name,
          type: 'directory',
        }
      }
      const stats = statSync(join(subDir(dir, serveDir), file.name))
      return {
        name: file.name,
        ext: extname(file.name),
        size: stats.size,
      }
    })
  } catch (error) {
    return error
  }
}

export const getFilePath = (sub: string, file: string) => {
  return join(subDir(sub, serveDir), fileName(file))
}
