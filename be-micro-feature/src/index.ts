import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"
import route from "./route";
import 'dotenv/config'

AppDataSource.initialize()
    .then(async () => {
        const app = express()

        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }))
        app.use(express.json())
        app.use("/api/v1", route)
        app.listen(process.env.PORT, () => console.log("server is running"))
    })
    .catch(error => console.log(error))
    
