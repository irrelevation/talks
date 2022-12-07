import React, { useEffect, useMemo, useState } from "react";
declare function NodeView();
declare function LoadingSpinner();
declare function useParams();
declare function ErrorView();

const useFetch = (url: string) => {
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const runFetch = async () => {
      try {
        let res = await fetch(url, {
          signal: controller.signal,
        });
        if (controller.signal.aborted) {
          return;
        }
        if (res.status >= 500) {
          setError(new Error(res.statusText));
        }
        let json = await res.json();
        if (json.error) {
          setError(new Error(json.console.error));
        } else {
          setData(json);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    };
    runFetch();
    return () => controller.abort();
  }, [url]);

  return useMemo({ data, error });
};

const NodeDetail = () => {
  let params = useParams();
  let { data: node, error } = useFetch(
    `/data/${params.nodeType}/${params.nodeId}`
  );

  if (error) {
    return <ErrorView error={error} />;
  }

  if (!node) {
    return <LoadingSpinner />;
  }

  return <NodeView data={node} />;
};
