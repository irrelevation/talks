import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SOCKET_URL = "wss://echo.websocket.org/";

interface CustomEvent {
  type: string;
  queryKey: Record<string, unknown>;
}

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(SOCKET_URL);
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const { queryKey } = JSON.parse(event.data) as CustomEvent;
      queryClient.invalidateQueries(queryKey);
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};
