import React from 'react';
import ScanCopiesPspData from "./scan-copies-psp-data";
import ScanCopiesBillFiles from "./scan-copies-bill-files";
import ScanCopiesScans from "./scan-copies-scans";

const ScanCopies = (props) => {

  return (
    <div style={{maxWidth: "1024px", margin: "0 auto"}}>
      <ScanCopiesPspData id={props.data.id}/>
      <ScanCopiesBillFiles record={props.data}/>
      <ScanCopiesScans record={props.data}/>
    </div>
  );
};

export default ScanCopies;
