import React, { useEffect, useState } from "react";
declare function NodeView();
declare function LoadingSpinner();
declare function useParams();

const useFetch = (url: string) => {
  let [data, setData] = useState(null);

  useEffect(async () => {
    let res = await fetch(url);
    let json = await res.json();
    setData(json);
  }, []);

  return data;
};

const NodeDetail = () => {
  let params = useParams();
  let node = useFetch(`/data/${params.nodeType}/${params.nodeId}`);

  if (!node) {
    return <LoadingSpinner />;
  }

  return <NodeView data={node} />;
};
