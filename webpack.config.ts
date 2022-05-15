import * as path from "path"
import fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

const toKebabCase = (s: string) =>
  s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()

const baseConfig = (kind: string, name: string): webpack.Configuration => {
  return {
    entry: `./src/${kind}/${name}/entrypoint.tsx`,
    output: {
      path: path.join(__dirname, kind),
      filename: `${toKebabCase(name)}.bundle.js`,
      uniqueName: name,
    },
    resolve: {
      extensions: [".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2021",
            tsconfigRaw: require("./tsconfig.web.json"),
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: path.join(__dirname, kind, `${toKebabCase(name)}.html`),
        template: `./public/index.html`,
        scriptLoading: "module",
      }),
    ],
  }
}

const graphics = fs
  .readdirSync(path.join(__dirname, "src", "graphics"))
  .map((x) => baseConfig("graphics", x))

// const frontendConfig: webpack.Configuration | webpack.WebpackOptionsNormalized =
//   {
//     ...baseConfig,
//     entry: "./src/frontend/index.tsx",
//     output: {
//       path: path.resolve(__dirname, "build", "frontend"),
//     },
//     plugins: [
//       // Generates an `index.html` file with the <script> injected.
//       new HtmlWebpackPlugin(
//         Object.assign(
//           {},
//           {
//             inject: true,
//             template: "./public/index.html",
//           },
//           isEnvProduction
//             ? {
//                 minify: {
//                   removeComments: true,
//                   collapseWhitespace: true,
//                   removeRedundantAttributes: true,
//                   useShortDoctype: true,
//                   removeEmptyAttributes: true,
//                   removeStyleLinkTypeAttributes: true,
//                   keepClosingSlash: true,
//                   minifyJS: true,
//                   minifyCSS: true,
//                   minifyURLs: true,
//                 },
//               }
//             : undefined
//         )
//       ),
//     ],
//     devServer: isEnvDevelopment
//       ? {
//           contentBase: path.join(__dirname, "build", "frontend"),
//           compress: true,
//           port: 9000,
//           open: true,
//           writeToDisk: true,
//         }
//       : undefined,
//   }

export default [...graphics]
