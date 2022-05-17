import React from "react"
import ReactDOM from "react-dom"
import { GlobalStyle } from "./GlobalStyle"

export const entrypoint = (children: JSX.Element) =>
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      {children}
    </React.StrictMode>,
    document.getElementById("root")
  )
