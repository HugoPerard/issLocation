import React, { useState } from 'react';

import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Switch } from '@chakra-ui/switch';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useQuery, UseQueryOptions } from 'react-query';

import { Loader, Page } from '@/app/layout';
import { convertTimestampToDate } from '@/utils/convertTimestampToDate';
import { getIsInDaylight } from '@/utils/getIsInDaylight';

export const useISSLocation = (config: UseQueryOptions<any> = {}) => {
  const result = useQuery(
    ['ISSLocation'],
    (): Promise<any> =>
      axios.get('https://api.wheretheiss.at/v1/satellites/25544'),
    {
      ...config,
    }
  );
  console.log({ result });

  return result;
};

export const PageISSLocation = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading, isError } = useISSLocation({
    refetchInterval: 1000,
    enabled: !isPaused,
  });
  const ISSLocationInfo = data?.data;
  const date = convertTimestampToDate(ISSLocationInfo?.timestamp);

  const [focusOn, setFocusOn] = useState('ISS');

  return (
    <Page bg="gray.800">
      {!isLoading && !isError && ISSLocationInfo && (
        <>
          <HStack bg="gray.700" py={2} px={20} spacing={8}>
            <Stack spacing={0}>
              <Text fontSize="sm" color="gray.200">
                {date?.format('dddd DD MMMM')}
                <Text>{date?.format('HH:mm:ss')}</Text>
              </Text>
            </Stack>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <Stack spacing={0}>
              <Text fontWeight="bold" color="gray.100">
                Latitude
              </Text>
              <Text fontSize="sm" color="gray.200">
                {ISSLocationInfo?.latitude?.toFixed(4)}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text fontWeight="bold" color="gray.100">
                Longitude
              </Text>
              <Text fontSize="sm" color="gray.200">
                {ISSLocationInfo?.longitude?.toFixed(4)}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text fontWeight="bold" color="gray.100">
                Altitude
              </Text>
              <Text fontSize="sm" color="gray.200">
                {ISSLocationInfo?.altitude?.toFixed(0)} kms
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text fontWeight="bold" color="gray.100">
                Velocity
              </Text>
              <Text fontSize="sm" color="gray.200">
                {ISSLocationInfo?.velocity?.toFixed(0)} kms/h
              </Text>
            </Stack>
            <Stack spacing={1}>
              <Text fontWeight="bold" color="gray.100">
                Visibility
              </Text>
              <Text fontSize="sm" color="gray.200">
                {getIsInDaylight(ISSLocationInfo) ? <BsSun /> : <BsMoon />}
              </Text>
            </Stack>
          </HStack>
          <HStack my={2} ml={10} spacing={2}>
            <Box
              flex={9}
              alignSelf="center"
              height="78vh"
              width="70%"
              borderColor="gray.700"
              borderWidth="3px"
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyDFpEXmYoOgaIEElR0e9rxfuE9pLcSEx0M' || null,
                }}
                center={
                  focusOn === 'ISS' && {
                    lat: ISSLocationInfo?.latitude,
                    lng: ISSLocationInfo?.longitude,
                  }
                }
                defaultZoom={1}
                yesIWantToUseGoogleMapApiInternals
              >
                <Box
                  position="relative"
                  lat={ISSLocationInfo?.latitude}
                  lng={ISSLocationInfo?.longitude}
                  boxSize="40px"
                >
                  {/* <Circle
                  size="100px"
                  bg="white"
                  opacity="0.3"
                  position="absolute"
                  right="-2.5"
                  bottom="-2.5"
                  border="solid 1px gray"
                /> */}

                  <Image
                    opacity="1"
                    boxSize="40px"
                    alt="ISS"
                    src="https://icons.iconarchive.com/icons/goodstuff-no-nonsense/free-space/512/international-space-station-icon.png"
                    position="absolute"
                    right="19"
                    bottom="19"
                  />
                </Box>
              </GoogleMapReact>
            </Box>
            <Stack spacing={4} flex={1} mr={2} alignSelf="flex-start">
              <Stack spacing={2}>
                <Text fontWeight="bold" color="gray.100">
                  Focus
                </Text>
                <Select
                  size="xs"
                  placeholder="None"
                  defaultValue={focusOn}
                  onChange={(e) => setFocusOn(e?.target?.value)}
                >
                  <option value="ISS">ISS</option>
                </Select>
              </Stack>
              <Stack spacing={2}>
                <Text fontWeight="bold" color="gray.100">
                  Pause
                </Text>
                <Switch size="md" onChange={() => setIsPaused(!isPaused)} />
              </Stack>
            </Stack>
          </HStack>
        </>
      )}
      {isLoading && <Loader />}
      {isError && (
        <Center flex="1" p="8">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            align="center"
            spacing="0"
          >
            <Box textAlign={{ base: 'center', md: 'left' }}>
              <Heading>Error API</Heading>
              <Text color="gray.600">We can't fetch data from the API.</Text>
            </Box>
          </Stack>
        </Center>
      )}
    </Page>
  );
};
