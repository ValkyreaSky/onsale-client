import React from 'react';
import { withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow } from 'react-google-maps';

function MapComponent(props) {
  const { coordinates, isError, isLocationLoaded } = props;

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={coordinates}
      center={coordinates}
      options={{
        disableDefaultUI: true,
      }}
    >
      {!isError && isLocationLoaded && (
      <Circle
        center={coordinates}
        radius={500}
        options={{
          fillColor: '#6ad8d3',
          strokeColor: '#6ad8d3',
          strokeWeight: 2,
        }}
      />
      ) }
      {isError && (
      <InfoWindow
        position={coordinates}
        options={{
          maxWidth: 300,
        }}
      >
        <div>
          There is a problem to find location on the map, we are trying to resolve problem as fast as possible. Contact host for additional informations if you are still intrested in booking this place. We are sorry for incoviniance.
        </div>
      </InfoWindow>
      ) }
    </GoogleMap>
  );
}

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    state = {
      coordinates: {
        lat: 0,
        lng: 0,
      },
      isError: false,
      isLocationLoaded: false,
    }

    componentWillMount() {
      this.geocodeLocation();
    }

    geocodeLocation = () => {
      const { location } = this.props;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({
        address: location,
      }, (res, status) => {
        if (status === 'OK') {
          const geometry = res[0].geometry.location;
          const coordinates = {
            lat: geometry.lat(),
            lng: geometry.lng(),
          };

          this.setState({
            coordinates,
            isLocationLoaded: true,
          });
        } else {
          this.setState({
            isError: true,
          });
        }
      });
    }

    render() {
      return (
        <WrappedComponent {...this.state} />
      );
    }
  };
}

export default withScriptjs(withGoogleMap(withGeocode(MapComponent)));
