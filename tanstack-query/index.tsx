import { useQuery } from "@tanstack/react-query";
import React from "react";

declare function NodeView();
declare function LoadingSpinner();
declare function useParams();
declare function ErrorView();

const NodeDetail = () => {
  let { nodeType, nodeId } = useParams();
  let {
    data: node,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [{ nodeType, nodeId }],
    queryFn: async ({ signal }) => {
      let res = await fetch(`/data/${nodeType}/${nodeId}`, {
        signal,
      });
      return res.json();
    },
  });

  if (isError) {
    return <ErrorView error={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <NodeView data={node} />;
};
