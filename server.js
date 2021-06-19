const chalk = require("chalk");
const { connectDB } = require("./src/db/connect");
const app = require("./src/index");
const port = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(
      chalk.green(
        `[server] Listening on: http://localhost:${port} in ${process.platform}`
      )
    );
  });
})();
