import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapsComponent = (props) => {
  return (
    <Map
      google={props.google}
      style={{ width: '300px', height: '200px' }}
      initialCenter={{
        lat: props.latitude,
        lng: props.longitude
      }}
      center={{
        lat: props.latitude,
        lng: props.longitude
      }}
      zoom={14}
    >
      <Marker
        position={{
          lat: props.latitude,
          lng: props.longitude
        }}
      />
    </Map>
  );
};


export default MapsComponent