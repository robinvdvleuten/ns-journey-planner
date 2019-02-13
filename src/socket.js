import got from 'got'
import nanoid from 'nanoid'
import { Wit } from 'node-wit'
import qs from 'query-string'
import LRU from 'lru-cache'

const cache = new LRU({
  max: 0,
  maxAge: 1000 * 60 * 5
})

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

function extractValueFromEntity(entity) {
  // We lowercase the extracted value to have a better cache HIT ratio.
  return entity && entity[0] && entity[0].value.toLowerCase()
}

async function queryTrips(fromStation, toStation, viaStation) {
  const query = qs.stringify({ fromStation, toStation, viaStation })
  const url = `https://ns-api.nl/reisinfo/api/v3/trips?${query}`

  if (cache.has(query)) {
    console.log('Cache HIT for NS API:', url)
    return cache.get(query)
  }

  console.log('Querying NS API:', url)

  const response = await got(url, {
    responseType: 'json',
    headers: {
      'x-api-key': process.env.RAZZLE_NS_API_TOKEN
    }
  })

  const result = JSON.parse(response.body)
  console.log(`Received ${result.trips.length + 1} trip(s) from NS API`)

  cache.set(query, result.trips)

  return result.trips
}

export default io => {
  const wit = new Wit({ accessToken: process.env.RAZZLE_WIT_ACCESS_TOKEN })

  io.on('connection', socket => {
    const message = (body, journey = false) =>
      socket.emit('message', { id: nanoid(), body, journey })

    socket.on('reply', async ({ body }) => {
      if (body.length < 3) {
        message('Dat begreep ik niet helemaal 🤔')
        return
      }

      const { entities } = await wit.message(body, {})

      if (!entities.fromStation || !entities.toStation) {
        message('Dat begreep ik niet helemaal 🤔')
        return
      }

      message('Je route wordt berekend, een moment geduld 😅')

      try {
        const trips = await queryTrips(
          extractValueFromEntity(entities.fromStation),
          extractValueFromEntity(entities.toStation),
          extractValueFromEntity(entities.viaStation)
        )

        if (trips.length === 0) {
          message('Je geplande reis is helaas niet mogelijk 😞')
          return
        }

        const journey = await computeJourney(trips.shift())
        message(journey, true)
      } catch (err) {
        console.error(err.response.body)
        message('Er ging iets mis 😢')
        return
      }
    })

    setTimeout(() => message('Hallo 👋'), 100)
    setTimeout(() => message('Waar gaat de reis naartoe vandaag? 🚂'), 800)
  })
}
