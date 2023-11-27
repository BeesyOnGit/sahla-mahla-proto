import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { verrifiySocket } from "./MiddleWear/ServerFunctions";
import { myEmitter } from "./App";

export const sockets = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    let locationBasedSockets: any = {};

    io.on("connection", async (socket) => {
        try {
            const token: any = socket.handshake.headers.token;
            locationBasedSockets = await verrifiySocket(locationBasedSockets, token!, socket.id);
        } catch (error) {
            console.log("🚀 ~ file: App.ts:74 ~ io.on ~ error:", error);
        }
    });

    try {
        myEmitter.on("orderUpdate", () => {
            io.emit("orderUpdate");
        });
        myEmitter.on("newOrder", () => {
            io.emit("newOrder");
        });
        myEmitter.on("orderDelete", () => {
            io.emit("orderDelete");
        });

        myEmitter.on("qteNotif", (data: any[]) => {
            if (data.length == 0) {
                return io.emit("qteNotif", undefined);
            }

            let locations: any[] = [];

            data.forEach((element) => {
                locations.push(element.location);
            });

            for (const notif of data) {
                const { location, number } = notif;
                for (const id in locationBasedSockets) {
                    if (location == locationBasedSockets[id]) {
                        const socketById = io.sockets.sockets.get(id);
                        if (socketById) {
                            socketById.emit("qteNotif", number);
                        }
                    }
                    if (locationBasedSockets[id] == "all") {
                        const socketById = io.sockets.sockets.get(id);
                        if (socketById) {
                            const total = data.reduce((prev, curr) => {
                                if (curr.number) {
                                    return prev + curr.number;
                                }
                            }, 0);
                            socketById.emit("qteNotif", total);
                        }
                    }
                }
            }

            for (const id in locationBasedSockets) {
                if (!locations.includes(locationBasedSockets[id]) && locationBasedSockets[id] != "all") {
                    const socketById = io.sockets.sockets.get(id);
                    if (socketById) {
                        socketById.emit("qteNotif", undefined);
                    }
                }
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: SocketsCode.ts:23 ~ sockets ~ error:", error);
    }
};
