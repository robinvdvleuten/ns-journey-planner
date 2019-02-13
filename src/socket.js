import nanoid from "nanoid"

export default io => {
  io.on('connection', socket => {
    const message = body => socket.emit('message', { id: nanoid(), body })

    socket.on('reply', message => {
      console.log(message)
    });

    message("Hey!")

    setTimeout(() => message("Can I have a banana?"), 800)
  })
}
