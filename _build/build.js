// https://github.com/evanw/esbuild/issues/802
const esbuild = require("esbuild");

esbuild
  .build({
    jsxFactory: "_p_h",
    jsxFragment: "_p_f",
    inject: ["./_build/shim.js"],
    entryPoints: ["./packages/okra/index.ts"],
    format: "esm",
    bundle: true,
    minify: true,
    outfile: "./dist/bundle.js",
  })
  // .then(() => console.log("Built!"))
  .catch(() => process.exit(1));
