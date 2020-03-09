import * as geolib from 'geolib';
import axios from 'axios';
import xmlJs from 'xml-js';

export const disto = async (locationOne, locationTwo) => {
  const ababio = geolib.getDistance(
    { latitude: locationOne.split(',')[0], longitude: locationOne.split(',')[1] },
    { latitude: locationTwo.split(',')[0], longitude: locationTwo.split(',')[1] },
  );
  return `${ababio} Meters`;
};

export const testSoapEndpoint = async () => {
  axios.get('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
    { headers: { 'Content-Type': 'text/xml' } })
    .then((res) => {
      console.log(xmlJs.xml2json(res.data, { compact: false, spaces: 2 }));
      // res.data;
    }).catch((err) => {
      console.log(err);
    });
};

export const getBounds = async () => {
  console.log(geolib.getBoundsOfDistance(
    { latitude: 5.627102, longitude: -0.303049 },
    200
));
}


export const computeDestination = async () => {
  console.log(geolib.computeDestinationPoint(
    [5.627102,-0.303049],
    // 5.627102, -0.3012503567881626
    // range
    200,
    3,
  ));
}
