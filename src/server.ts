import chalk from "chalk";
import app from ".";

const port = process.env.PORT || 5000;

(async () => {
  try {
    await app.listen(port, process.env.HOST);
  } catch (error) {
    console.log(
      chalk.redBright(`[server] Something wen't wrong: `, error.message),
    );
    process.exit(1);
  }
})();

/**
 *
 * ## Env 
 * - pass in command
 * docker run --env PORT=5000 -d -p 5000:5000 <image_id|image_name>
 * - load file
 * docker run --env-file .env -d -p ...rest
 * 
 * ## Get in to container instance
 * docker exec -it <container_name|container_id> /bin/sh
 *  
 * ## Sync source code with bind mount
 * - this will rebuild the image automaticly
 * docker run -v ~/me/docker-node:/app -d -p 5000:5000 --name <container_name> <image_id|image_name>
 * 
 * ## Run compose using different environment
 * Note: -f stands for file config, and the first file should me the basic config
 * and then the second one should be the environment specifig config
 * docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
 */
