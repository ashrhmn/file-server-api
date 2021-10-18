import { Request, Response, Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const router = Router()

router.get('/', (req: Request, res: Response) => {

    try {
        const path = join(__dirname, 'files');

        const files = readdirSync(path, {
            withFileTypes: true
        })

        return res.json(files.map(file => {
            if (file.isDirectory()) return file.name + '/'
            return file.name;
        }));
    } catch (error) {
        return res.json(error)
    }

})

router.get('/:sub', (req: Request, res: Response) => {

    try {

        const subDir = req.params.sub;
        const dirs = subDir.split('-');
        const root = [__dirname, 'files']
        const dirsPath = root.concat(dirs);
        const path = join.apply(null, dirsPath)

        const files = readdirSync(path, {
            withFileTypes: true
        })

        return res.json(files.map(file => {
            if (file.isDirectory()) return file.name + '/'
            return file.name;
        }));
    } catch (error) {
        return res.json(error)
    }
})

router.get('/:sub/:file', (req: Request, res: Response) => {

    try {
        const subDir = req.params.sub;
        const dirs = subDir.split('-');
        const root = [__dirname, 'files']
        const dirsPath = root.concat(dirs);
        const file = req.params.file;
        const fileNameArr = file.split("_")
        let fileName = "";
        fileNameArr.forEach(subName => {
            if (fileNameArr.indexOf(subName) != fileNameArr.length - 1) {
                subName += " "
            }
            fileName += subName
        })

        const filePath = dirsPath.concat(fileName)

        const path = join.apply(null, filePath)


        return res.download(path)
    } catch (error) {
        return res.json(error)
    }
})

export default router;