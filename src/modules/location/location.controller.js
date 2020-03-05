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
