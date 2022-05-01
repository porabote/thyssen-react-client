import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Api from "@services";
import View from "./view";
import ViewPreloader from "../view/view-preloader";

const ViewContainer = (props) => {

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getRecord();
  }, []);

  const { relationships } = useSelector(state => state.users);

  const getRecord = () => {

    const { id } = props;

    Api.get(`/api/api-users/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
     setData(resp.data);
     setLoaded(true);
    })
  }

  if (!loaded) {
    return <ViewPreloader/>;
  }

  return(
    <View data={data}/>
  );

}

export default ViewContainer;