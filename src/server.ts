import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./Config";
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is Running...");

    //root route
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from node js with typescrit...",
          path: req.url,
        })
      );
    }

    //health route

    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: " Health status is good...",
          path: req.url,
        })
      );
    }

    // user route
    if (req.url == "/api/users" && req.method == "POST") {
      //   const user = {
      //     id: 1,
      //     name: "Rebeka",
      //     email: "rebeka@example.com",
      //   };
      //   res.writeHead(200, { "content-type": "application/json" });
      //   res.end(JSON.stringify(user));
      let body = "";
      // listen for data event to receive chunks
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          console.log("catching curent cheanges");
          res.end(JSON.stringify(parseBody));
        } catch (err: any) {
          console.error(err?.message);
        }
      });
    }
  }
);
server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
