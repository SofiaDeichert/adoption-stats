import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ data, year }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data (you'll need to provide this)
    fetch('../../public/countries.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const getColor = (value) => {
    // Implement color scale based on adoption numbers
    return value > 1000
      ? '#800026'
      : value > 500
      ? '#BD0026'
      : value > 200
      ? '#E31A1C'
      : value > 100
      ? '#FC4E2A'
      : value > 50
      ? '#FD8D3C'
      : value > 20
      ? '#FEB24C'
      : value > 10
      ? '#FED976'
      : '#FFEDA0';
  };

  const style = (feature) => {
    const countryData = data.find((d) => d.country === feature.properties.name);
    return {
      fillColor: getColor(countryData ? countryData.total_adoptions : 0),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={style}
          onEachFeature={(feature, layer) => {
            const countryData = data.find(
              (d) => d.country === feature.properties.name
            );
            layer.bindPopup(`
              <strong>${feature.properties.name}</strong><br/>
              Total Adoptions: ${
                countryData ? countryData.total_adoptions : 'N/A'
              }
            `);
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
