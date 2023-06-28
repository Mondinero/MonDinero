export default function cleanTransactionGraphData(data) {
  const catSet = new Set();
  const cleanedData = [];
  data.forEach((el) => {
    if (Number(el.amount) > 0) {
      catSet.add(el.main_cat);
      cleanedData.push(el);
    }
  });
  return { categories: catSet, data: cleanedData };
}
