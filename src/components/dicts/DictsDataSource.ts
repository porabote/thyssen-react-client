import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import { requestDicts } from "./store/dicts-actions";

const DictsDataSource = (componentName: string): [] => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDicts([componentName], 'accessLists'));
  }, []);

console.log(componentName);
  const dicts = useSelector((state: { dicts: any; }) => state.dicts);
  console.log(dicts);
  return dicts[componentName];

};

export default DictsDataSource;
