/** @jsx jsx */
import { Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import { Flex } from "@rebass/emotion"
import { format } from 'date-fns'
import Bubble from "../../components/bubble"

const JourneyStep = ({ datetime, station, track, departure, ...props }) => (
  <Flex mb={1} {...props}>
    <div css={css`
      font-weight: ${departure && '700'};
    `}>
      {format(new Date(datetime), 'HH:mm')}
    </div>
    <Flex flex="1 0" justifyContent="space-between" ml={4}>
      <div css={css`
        font-weight: ${departure && '700'};
      `}>
        {station}
      </div>
      <div css={css`
        font-weight: ${departure && '700'};
      `}>
        Spoor {track}
      </div>
    </Flex>
  </Flex>
)

const JourneyBubble = ({ journey, ...props }) => (
  <Bubble width={1} {...props}>
    {journey.map((step, index) => (
      <Fragment key={index}>
        <JourneyStep datetime={step.departure} station={step.fromStation} track={step.fromTrack} departure />
        <JourneyStep datetime={step.arrival} station={step.toStation} track={step.toTrack} arrival />
      </Fragment>
    ))}
  </Bubble>
)

export default JourneyBubble
