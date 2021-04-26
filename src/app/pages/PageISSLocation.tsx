import React from 'react';

import { Image } from '@chakra-ui/image';
import { Tooltip } from '@chakra-ui/tooltip';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
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
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || null,
            }}
            center={{
              lat: parseInt(ISSLocation?.latitude),
              lng: parseInt(ISSLocation?.longitude),
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
          >
            <Tooltip
              label={`Latitude : ${ISSLocation?.latitude} - Longitude : ${ISSLocation?.longitude}`}
            >
              <Image
                lat={parseInt(ISSLocation?.latitude)}
                lng={parseInt(ISSLocation?.longitude)}
                boxSize="30px"
                alt="ISS"
                src="https://icons.iconarchive.com/icons/goodstuff-no-nonsense/free-space/512/international-space-station-icon.png"
              />
            </Tooltip>
          </GoogleMapReact>
        </div>
      )}
    </Page>
  );
};
