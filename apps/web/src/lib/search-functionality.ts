export function startWebsocket(cb: (data: any) => void) {
  const socket = new WebSocket('ws://localhost:8000/q');
  socket.addEventListener('open', function () {
    console.log('WebSocket connection established');
  });
  socket.addEventListener('message', function (event: MessageEvent<string>) {
    let data = JSON.parse(event.data)
    data = data.map((item: any) => ({
      ...item,
      aired: JSON.parse(item.aired),
    }));
    cb(data);
  });
  socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
  });
  socket.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
  });
  return socket;
}
