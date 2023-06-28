import React, { useEffect, useState } from 'react';
import GenericBar from './visualizations/genericBar';
import { useSelector, useDispatch } from 'react-redux';
import { setTransactionsGraphData } from '../store/slices/dataSlice';

export function TransactionsBar() {
  const transactionsGraphData = useSelector(
    (state) => state.dataSlice.transactionsGraphData
  );
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const getTransactionsData = async () => {
    const data = await fetch('/api/data/transactionsBar').then((resp) =>
      resp.json()
    );

    const categories = Object.keys(data[0]).filter((key) => key != 'month');

    setCategories(categories);
    dispatch(setTransactionsGraphData(data));
  };

  useEffect(() => {
    getTransactionsData();
  }, []);

  return (
    <GenericBar
      data={transactionsGraphData}
      xkey="month"
      dataKeys={categories}
      stacked={true}
    />
  );
}
