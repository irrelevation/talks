import { useQuery } from "@tanstack/react-query";
declare function fetchNodes();

function useNodes(nodeType) {
  const { data: nodes, ...rest } = useQuery(["nodes", nodeType], fetchNodes);
  return { nodes, ...rest };
}
