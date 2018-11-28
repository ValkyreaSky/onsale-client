import React from 'react';
import { Col } from 'antd';
import MapWithGeocode from 'components/common/Map/GoogleMap';
import styled from 'styled-components';

const Container = styled.div`
  height: 40rem;
  position: relative;
  background-color: rgb(236, 236, 236);
`;

const MapBox = ({ ad }) => (
  <Col
    xs={{
      span: 24,
    }}
    lg={{
      span: 12,
    }}
  >
    <Container>
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCvT_wwDrhz-auv8et2CZSbK0VNSzGF3uc&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={(
          <div style={{
            height: '100%',
          }}
          />
                )}
        containerElement={(
          <div style={{
            height: '100%',
          }}
          />
                )}
        mapElement={(
          <div style={{
            height: '100%',
          }}
          />
                )}
        location={ad.location}
      />
    </Container>
  </Col>
);

export default MapBox;
