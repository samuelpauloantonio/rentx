import { app } from './app';

const port = 3337;
app.listen(port, () => {
    console.log(`🚀 server is running ${port}`);
});
