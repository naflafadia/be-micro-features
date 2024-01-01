import { AppDataSource } from "./data-source"
import * as express from "express"
import articleRoute from "./route/articleRoute"; 
import paslonRoute from "./route/paslonRoute";
import partaiRoute from "./route/partaiRoute";
import voteRoute from "./route/voteRoute";
import 'dotenv/config'

AppDataSource.initialize()
    .then(async () => {
        const app = express()

        app.use(express.json())
        app.use("/api/v1", articleRoute)
        app.use("/api/v1", paslonRoute)
        app.use("/api/v1", partaiRoute)
        app.use("/api/v1", voteRoute)
        app.listen(process.env.PORT, () => console.log("server is running"))
    })
    .catch(error => console.log(error))
