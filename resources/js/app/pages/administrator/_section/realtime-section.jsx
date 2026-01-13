import React, { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { setReload } from "@/app/redux/app-slice";

export default function RealtimeSection() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Enable debug logs if needed
        Pusher.logToConsole = true;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,  // important for HTTPS
        });

        const channel = pusher.subscribe("data-channel");

        channel.bind("data-sent", (response) => {
           dispatch(setReload(Math.random()));
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe("data-channel");
            pusher.disconnect();
        };
    }, []);

    return <div />;
}
