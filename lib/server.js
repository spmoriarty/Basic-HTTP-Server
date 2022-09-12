import net from 'net';

const logInfo = ( ...args) => console.log('[server]', ...args);

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        logInfo('So your connected now')
        socket.on('data', (data) => {
            const dataString = data.toString()
            logInfo('Got da data: ', dataString);
            const lines = dataString.split('\n')
            const startLine = lines[0];
            const [ method, path ] = startLine.split(' ');
            if(method === 'GET' && path === '/') {
                const body = `
                <html>
                <main>
                <body>
                <h1> THIS IS IT </h1>
                <h2> if you see this it is working </h2>
                </body>
                </main>
                </html>`;
                const values = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`
                socket.write(values)
            } else if(method === 'GET' && path === '/post') {
                
                const jsBody = JSON.stringify({ string:'This is a JSON string' });
                const JSvalues = `HTTP/1.1 200 Ok
Content-Length: ${jsBody.length}
Content-Type: application/json

${jsBody}`
socket.write(JSvalues)
            }
            
            else {
                socket.write(data.toString());
            }

        });
    });
    server.listen(port, host, () => {
        logInfo('Server is live');
    });
    logInfo('Attempting to start server');
    return server;
}