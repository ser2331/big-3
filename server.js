// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults({
    static: "./build"
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;
server.use(middlewares);
server.use(jsonServer.rewriter({
    "/api/*": "/$1",
}));
server.listen(PORT, () => {
    console.log("Server is running");
});