const http = require("http");
const { NODE_ENV, PORT } = require(".");

const startServer = (app) => {
  // if (NODE_ENV === "production") {
  //   log.info(`Master ${process.pid} is running`);
  //   for (let i = 0; i < cpus; i++) cluster.fork();
  //   cluster.on("exit", (worker, code, signal) => {
  //     log.info(`worker ${worker.process.pid} died`);
  //     cluster.fork();
  //   });
  // } else {
  const server = http.createServer(app);
  server.listen(PORT, () => console.info("Server started at PORT: ", PORT));
  // }
};

module.exports = { startServer };
