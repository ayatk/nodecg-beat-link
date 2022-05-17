import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import React, { useState } from "react"
import { entrypoint } from "../entrypoint"
import { useReplicant } from "../hooks"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const NowPlaying = () => {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")

  const [, setNowPlaying] = useReplicant("now-playing")
  const onSave = () => {
    setNowPlaying({
      title: title,
      artist: artist,
      album: album,
      imageUrl: "",
    })
  }

  return (
    <Stack component="form" spacing={2} autoComplete="off">
      <TextField
        required
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Artist"
        variant="outlined"
        onChange={(e) => setArtist(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Album"
        variant="outlined"
        onChange={(e) => setAlbum(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={onSave}>
        Save
      </Button>
    </Stack>
  )
}

entrypoint(
  <ThemeProvider theme={darkTheme}>
    <NowPlaying />
  </ThemeProvider>
)
