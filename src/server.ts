import app from './app';
import { env } from "./config/env";

const PORT = process.env.PORT || 3000;

app.listen(env.port, () => {
    console.log(
        `🚀 ${env.appName} (${env.appVersion}) running on port ${env.port} [${env.nodeEnv}]`
    );
});