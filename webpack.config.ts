import * as path from "path"
import fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack, { CleanPlugin } from "webpack"
import nodeExternals from "webpack-node-externals"

type Kind = "dashboard" | "graphics" | "extentions"

const baseConfig = (kind: Kind, names: string[]): webpack.Configuration => {
  const entries = Object.assign(
    {},
    ...names.map((name) => ({
      [name]:
        kind === "extentions"
          ? `./src/${kind}/index.${name}.ts`
          : `./src/browser/${kind}/index.${name}.tsx`,
    }))
  )
  const htmlWebpackPlugins = names.map(
    (name) =>
      new HtmlWebpackPlugin({
        filename: path.join(__dirname, kind, `${name}.html`),
        template: `./public/index.html`,
      })
  )

  return {
    entry: entries,
    output: {
      path: path.join(__dirname, kind),
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2021",
            tsconfigRaw:
              kind !== "extentions"
                ? require("./src/browser/tsconfig.json")
                : undefined,
          },
        },
      ],
    },
    plugins: [...htmlWebpackPlugins, new CleanPlugin({ keep: ".gitkeep" })],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  }
}

const graphics = baseConfig(
  "graphics",
  fs
    .readdirSync(path.join(__dirname, "src", "browser", "graphics"))
    .map((x) => x.match(/index\.(.+)\.tsx?$/i))
    .filter((x): x is NonNullable<typeof x> => x != null)
    .map((x) => x[1])
)

const dashboard = baseConfig(
  "dashboard",
  fs
    .readdirSync(path.join(__dirname, "src", "browser", "dashboard"))
    .map((x) => x.match(/index\.(.+)\.tsx?$/i))
    .filter((x): x is NonNullable<typeof x> => x != null)
    .map((x) => x[1])
)

const extension: webpack.Configuration = {
  target: "node",
  node: false,
  entry: path.resolve(__dirname, "src/extension/index.ts"),
  output: {
    path: path.resolve(__dirname, "extension"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "node16",
        },
      },
    ],
  },
  externals: [nodeExternals()],
}

export default [graphics, dashboard, extension]
