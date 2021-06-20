import chalk from "chalk";
import { initDatabase } from "./src/db/connect";
import app from "./src/index";

const port = process.env.PORT || 5000;

(async () => {
  try {
    await initDatabase(app);
    app.listen(port, (error, address) => {
      if (error) {
        app.log.error(error);
        process.exit(1);
      }
      console.log(chalk.blue(`[server] Listening on: ${address}`));
    });
  } catch (error) {
    console.log(chalk.red(`[server] Error: `, error.message));
    process.exit(1);
  }
})();
