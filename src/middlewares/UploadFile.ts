import * as multer from "multer"
import * as express from "express"

export default new class UploadImage {

    // save to local storage
    // preparation for create a new buffer file types
    upload(fieldName: string) {
        const storage = multer.diskStorage({
            destination: (req, res, cb) => {
                cb(null, "src/uploads")
            },
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}-${Date.now()}.png`)
            }
        })

        const uploadFile = multer({ storage })

        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // single, array, dll
            uploadFile.single(fieldName)(req, res, (err: any) => {
                if (err) return res.status(400).json({ message: "Error while processing upload image" })

                res.locals.filename = req.file.filename
                next()
            })
        }
    }
}