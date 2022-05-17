import styled from "@emotion/styled"
import React from "react"
import { Track } from "../../../../nodecg"
import { useReplicant } from "../../../hooks"

const Container = styled.div`
  display: inline-grid;
  grid-gap: 16px;
  grid-template-columns: auto 1fr;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
`

const Artist = styled.div`
  display: inline-block;
  font-size: 16px;
  color: #999;
`

const StyledCoverJacket = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`

const Track = () => {
  const [nowPlaying] = useReplicant("now-playing")
  // const prevPlaying = usePrevious(nowPlaying)

  if (nowPlaying === undefined) return <div>loading...</div>

  return (
    <Container>
      <StyledCoverJacket src={nowPlaying.imageUrl} />
      <InfoContainer>
        <Title>{nowPlaying.title}</Title>
        <Artist>{nowPlaying.album}</Artist>
        <Artist>{nowPlaying.artist}</Artist>
      </InfoContainer>
    </Container>
  )
}

export default Track
