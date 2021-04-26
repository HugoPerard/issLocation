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
    (): Promise<any> =>
      axios.get('https://api.wheretheiss.at/v1/satellites/25544'),
    {
      ...config,
    }
  );

  return result;
};

export const PageISSLocation = () => {
  const { data } = useISSLocation({ refetchInterval: 5 });
  const ISSLocationInfo = data?.data;

  return (
    <Page>
      {ISSLocationInfo && (
        <div style={{ height: '91vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDFpEXmYoOgaIEElR0e9rxfuE9pLcSEx0M' || null,
            }}
            center={{
              lat: ISSLocationInfo?.latitude,
              lng: ISSLocationInfo?.longitude,
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
          >
            <Tooltip
              label={`Latitude : ${ISSLocationInfo?.latitude?.toFixed(
                4
              )} - Longitude : ${ISSLocationInfo?.longitude?.toFixed(4)}`}
            >
              <Image
                lat={ISSLocationInfo?.latitude}
                lng={ISSLocationInfo?.longitude}
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
