import React from 'react';

export const Spinner = () => {
  return (
    <div className={'d-flex justify-content-center'} data-testid="spinner">
      <div className={'spinner-border'} role={'status'}>
        <span className={'sr-only'}></span>
      </div>
    </div>
  );
};
