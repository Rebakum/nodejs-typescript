"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Config_1 = __importDefault(require("./Config"));
const server = http_1.default.createServer((req, res) => {
    console.log("server is Running...");
    if (req.url == "/" && req.method == "GET") {
        res.writeHead(200, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({
            message: "Hello from node js with typescrit...",
            path: req.url,
        }));
    }
});
server.listen(Config_1.default.port, () => {
    console.log(`server is running on port ${Config_1.default.port}`);
});
