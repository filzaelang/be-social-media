// import { Request, Response } from "express";


// export default new class ThreadQueue {
//     async create(req: Request, rea: Response): Promise<Response> {
//         try {
//             const data = {
//                 content: req.body.content,
//                 image: resolve.locals.filename
//             }

//             //validate
//             //validate

//             const user = res.locals.loginSession
//             const payload = {
//                 content: // value.content,
//                 image: // value.image
//                 user: // user.obj.id
//             }

//             const errorQueue = await RabbitMQConfig.sendToMessage(process.env.QUEUE_NAME, payload)
//             if (errorQueue) return // res.status(500).json({message: errorQueue})


//         } catch (error) {

//         }
//     }
// }