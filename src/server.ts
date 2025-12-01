import http, { IncomingMessage, Server, ServerResponse } from "http";
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is Running...");
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "Application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from node js with typescrit...",
          path: req.url,
        })
      );
    }
  }
);
server.listen(3000, () => {
  console.log(`cerver is runing on  port ${3000} `);
});
