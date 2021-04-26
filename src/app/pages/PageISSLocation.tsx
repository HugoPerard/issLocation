import React from 'react';

import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { RiSpaceShipFill } from 'react-icons/ri';
import { useQuery, UseQueryOptions } from 'react-query';

import { Page } from '@/app/layout';

export const useISSLocation = (config: UseQueryOptions<any> = {}) => {
  const result = useQuery(
    ['ISSLocation'],
    (): Promise<any> => axios.get('http://api.open-notify.org/iss-now.json'),
    {
      ...config,
    }
  );

  return result;
};

export const PageISSLocation = () => {
  const { data } = useISSLocation({ refetchInterval: 5 });
  const ISSLocation = data?.data?.iss_position;
  return (
    <Page>
      {ISSLocation && (
        <div style={{ height: '91vh', width: '100%' }}>
          <GoogleMapReact
            center={{
              lat: parseInt(ISSLocation?.latitude),
              lng: parseInt(ISSLocation?.longitude),
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
          >
            <RiSpaceShipFill
              // @ts-ignore
              lat={parseInt(ISSLocation?.latitude)}
              lng={parseInt(ISSLocation?.longitude)}
              size="30px"
              color="white"
            />
          </GoogleMapReact>
        </div>
      )}
    </Page>
  );
};
