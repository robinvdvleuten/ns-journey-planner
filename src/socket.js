import got from "got"
import nanoid from "nanoid"
import {Wit} from 'node-wit'

async function computeJourney(trip) {
  return trip.legs.map(leg => ({
    fromStation: leg.origin.name,
    fromTrack: leg.origin.plannedTrack,
    toStation: leg.destination.name,
    toTrack: leg.destination.plannedTrack,
    departure: leg.origin.plannedDateTime,
    arrival: leg.destination.plannedDateTime
  }))
}

function extractValueFromEntity (entity) {
  return entity[0].value
}

async function queryTrips(fromStation, toStation) {
  const response = await got(`https://ns-api.nl/reisinfo/api/v3/trips?fromStation=${fromStation}&toStation=${toStation}`, {
    responseType: 'json',
    headers: {
      'x-api-key': process.env.RAZZLE_NS_API_TOKEN
    }
  })

  const result = JSON.parse(response.body)
  console.log(`Received ${result.trips.length + 1} trip(s) from NS API`)

  return result.trips
}

export default io => {
  const wit = new Wit({ accessToken: process.env.RAZZLE_WIT_ACCESS_TOKEN })

  io.on('connection', socket => {
    const message = (body, journey = false) => socket.emit('message', { id: nanoid(), body, journey })

    socket.on('reply', async ({ body }) => {
      const { entities } = await wit.message(body, {})

      if (!entities.fromStation || !entities.toStation) {
        message('Dat begreep ik niet helemaal 🤔')
        return
      }

      message('Je route wordt berekend, een moment geduld 😅')

      try {
        const trips = await queryTrips(
          extractValueFromEntity(entities.fromStation),
          extractValueFromEntity(entities.toStation)
        )

        if (trips.length === 0) {
          message('Je geplande reis is helaas niet mogelijk 😞')
          return
        }

        const journey = await computeJourney(trips.shift())
        message(journey, true)
      } catch (err) {
        console.error(err)
        message('Er ging iets mis 😢')
        return
      }
    });

    setTimeout(() => message("Hallo 👋"), 100)
    setTimeout(() => message("Waar gaat de reis naartoe vandaag? 🚂"), 800)
  })
}
