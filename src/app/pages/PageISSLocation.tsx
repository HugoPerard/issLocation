import React, { useState } from 'react';

import { Checkbox } from '@chakra-ui/checkbox';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Switch } from '@chakra-ui/switch';
import { Tooltip } from '@chakra-ui/tooltip';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { useQuery, UseQueryOptions } from 'react-query';

import { Loader, Page } from '@/app/layout';
import { convertTimestampToDate } from '@/utils/convertTimestampToDate';

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
          <Flex bg="gray.700" py={4} px={20} justifyContent="space-between">
            <HStack spacing={8}>
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
                  {ISSLocationInfo?.altitude?.toFixed(3)} kms
                </Text>
              </Stack>
            </HStack>
            <HStack alignItems="center" spacing={8}>
              <HStack spacing={2}>
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
              </HStack>
              <HStack spacing={2}>
                <Text fontWeight="bold" color="gray.100">
                  Pause
                </Text>
                <Switch size="md" onChange={() => setIsPaused(!isPaused)} />
              </HStack>
            </HStack>
          </Flex>

          <Box
            alignSelf="center"
            my="5"
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
                <Tooltip
                  label={`Latitude : ${ISSLocationInfo?.latitude?.toFixed(
                    4
                  )} - Longitude : ${ISSLocationInfo?.longitude?.toFixed(
                    4
                  )} - Date : ${date.format('DD/MM/YYYY-HH:mm:ss')}`}
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
                </Tooltip>
              </Box>
            </GoogleMapReact>
          </Box>
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
