import React from 'react';

import classes from './Spinner.module.css';

const Spinner = props => {
  return (
    <div className={`${props.asOverlay && classes.loadingSpinner__overlay}`}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default Spinner;
