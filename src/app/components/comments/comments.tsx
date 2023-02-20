import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import "./comments.less";
import CommentsModel from "./models/Comments";

type CommentsProps = {
  recordId: number;
  businessEventId: number;
  modelName: string;
};

const Comments = (props: CommentsProps) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    setLoading(true);

    try {
      let data = await new CommentsModel().setWith(["user"]).setWhere({
        record_id: props.recordId,
        class_name: props.modelName,
      }).get();
      setData(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      alert("Ошибка загрузки комментариев.");
    }
  }

  return (
    <div className="comments">
      <CommentForm auth={auth} {...props}/>
      {/* <CommentList */}
      {/*   auth={auth} */}
      {/*   data={data} */}
      {/*   loading={loading} */}
      {/* /> */}
    </div>
  );

};

export default Comments;
