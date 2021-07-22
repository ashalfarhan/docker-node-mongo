import chalk from "chalk";
import { initDatabase } from "./src/db/connect";
import app from "./src/index";

const port = process.env.PORT || 5000;

(async () => {
  try {
    await initDatabase(app);
    await app.listen(port);
    console.log(chalk.blue(`[server] Listening on: http://localhost:${port}`));
  } catch (error) {
    console.log(chalk.red(`[server] Error: `, error.message));
    process.exit(1);
  }
})();
