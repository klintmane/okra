// https://github.com/evanw/esbuild/issues/802
const esbuild = require("esbuild");
const { createServer } = require("http");

const clients = [];
const liveReload = ` (() => new EventSource("http://localhost:8082").onmessage = () => location.reload())();`;

esbuild
  .build({
    jsxFactory: "h",
    jsxFragment: "Fragment",
    inject: ["./_build/shim.js"],
    entryPoints: ["./packages/okra-example/src/index.tsx"],
    bundle: true,
    outfile: "./dist/bundle.js",
    banner: { js: liveReload },
    watch: {
      onRebuild: (err) => {
        clients.forEach((res) => res.write("data: update\n\n"));
        clients.length = 0;
        console.log(err ? err : "Files changed, rebuilding...");
      },
    },
  })
  // .then(() => console.log("Built: Watching on localhost:3000"))
  .catch(() => process.exit(1));

createServer((req, res) =>
  clients.push(
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
    })
  )
).listen(8082);

esbuild.serve({ servedir: "./dist", port: 3000 }, {});
