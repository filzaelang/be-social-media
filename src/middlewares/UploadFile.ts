import * as multer from "multer"
import { NextFunction, Request, Response } from "express"

export default new class UploadImage {


    upload(fieldName: string) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "src/uploads")
            },
            filename: function (req, file, cb) {
                cb(null, `${file.fieldname}-${Date.now()}.png`)
            },
        })

        const uploadFile = multer({ storage: storage })

        return (req: Request, res: Response, next: NextFunction) => {
            // single, array, dll
            uploadFile.single(fieldName)(req, res, function (error: any) {
                if (error instanceof multer.MulterError) {
                    return res.status(400).json({ error: error.message });
                } else if (error) {
                    return res.status(500).json({ error: "Internal server error" });
                }

                if (req.file && req.file.filename) {
                    res.locals.filename = req.file.filename;
                } else {
                    res.locals.filename = null;
                }

                next()
            })
        }
    }
}