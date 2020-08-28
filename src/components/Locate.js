import React from 'react';

const Locate = ({handleLocateClick}) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            handleLocateClick(location);
          }, () => null)
        }
      }>
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

export default Locate;