// import * as amqp from "amqplib"
// import 'dotenv/config'

// export default new class RabbitMQConfig {
//     async sendToMessage(queueName: string, payload: any): Promise<boolean> {
//         try {
//             const connection = await amqp.connect(process.env.URL_CONNECT)
//             const channel = await connection.createChannel()

//             await channel.assertQueue(queueName)

//             channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))

//             await connection.close()
//             await channel.close()

//             return null
//         } catch (error) {
//             throw error
//         }
//     }
// }