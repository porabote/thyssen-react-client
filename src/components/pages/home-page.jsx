import React from "react";
import "./HomePage.less";
import PurchaseRequestWidjet from "../PurchaseRequest/PurchaseRequestWidjet";

const HomePage = (props) => {

  const style = {
    gridTemplateColumns: '50% 1fr',
    gridTemplateAreas: `'pr_widjet'` ,
  };

  return(
    <div
      className="home-page-content"
      style={style}
    >
      <PurchaseRequestWidjet/>
    </div>
  );
}

export default HomePage;
