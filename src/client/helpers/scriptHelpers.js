export function loadSocketIo(callback) {
    const existingScript = document.getElementById('socket-io');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = '/api/socket-io-client/socket.io.js';
        script.id = 'socket-io';
        script.type = 'text/javascript'
        script.defer = true
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) {
                callback();
            }
        };
    }

    if (existingScript && callback) callback();
}