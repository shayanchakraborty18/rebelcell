import React from 'react';

export const Loader = () => {
  return  (
    <div className="loader"></div>
  )
}

export const SmallLoader = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) ;
}
