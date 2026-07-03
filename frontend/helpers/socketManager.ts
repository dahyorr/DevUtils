import { Manager } from "socket.io-client";

export const socketManager = new Manager(
    process.env.NEXT_PUBLIC_BASE_URL as string || ``,
    { autoConnect: false }
)