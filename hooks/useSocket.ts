import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://api.alertacidadaoapi.com';

export const useSocket = (token: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!token) return;

        const socketInstance = io(SOCKET_URL, {
            query: {token},
            transports: ['websocket'],
            reconnectionAttempts: 5,
        });

        socketInstance.on('connect', () => {
            console.log('Socket conectado:', socketInstance.id);
        });

        socketInstance.on('disconnect', () => {
            console.log('socket desconectado');
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [token]);

    return socket;
};
