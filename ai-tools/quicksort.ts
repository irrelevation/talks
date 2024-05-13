// quicksort

const quicksort = (arr: number[]): number[] => {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  const less = arr.slice(1).filter((item) => item <= pivot);
  const greater = arr.slice(1).filter((item) => item > pivot);
  return [...quicksort(less), pivot, ...quicksort(greater)];
};
