import { useEffect, useState, useMemo } from "react";
import styles from "./map.module.css";
import { Layer, Map, Source, Popup } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import "./index.css";
import YearSlider from "./YearSlider";
import debounce from "lodash.debounce";

export default function App() {
  const [hoveredFeature, setHoveredFeature] = useState<{ year: number, latitude: number, longitude: number } | null>(null);
  const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 1800, max: 2020 });
  const [debouncedYearRange, setDebouncedYearRange] = useState<{ min: number; max: number }>({ min: 1800, max: 2020 });

  // Create debounced function using lodash
  const debouncedSetYearRange = useMemo(
    () => debounce((newRange: { min: number; max: number }) => {
      setDebouncedYearRange(newRange);
    }, 150),
    []
  );
  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  // Trigger debounced update when yearRange changes
  useEffect(() => {
    debouncedSetYearRange(yearRange);
  }, [yearRange, debouncedSetYearRange]);

  const handleHover = (event: any) => {
    const feature = event.features?.length ? {
      year: event.features?.[0].properties.constructi,
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    } : null;
    setHoveredFeature(feature);
  };

  const handleYearRangeChange = (minYear: number, maxYear: number) => {
    setYearRange({ min: minYear, max: maxYear });
  };

  return (
    <div className={styles.mapContainer}>
      <YearSlider
        minYear={1800}
        maxYear={2020}
        currentMinYear={yearRange.min}
        currentMaxYear={yearRange.max}
        onYearChange={handleYearRangeChange}
      />
      <Map
        initialViewState={{
          longitude: -73.95747,
          latitude: 40.71825,
          zoom: 10.5,
        }}
        interactiveLayerIds={["buildings"]}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
        mapLib={maplibregl}
        onMouseMove={handleHover}
      >
        <Source
          id="buildings"
          type="vector"
          url="pmtiles://https://storage.googleapis.com/ascend-map-cloud/nyc-buildings.pmtiles"
        >
          <Layer
            id="buildings"
            type="fill"
            source="buildings"
            source-layer="data"
            filter={[
              "all",
              [">=", ["to-number", ["get", "constructi"]], debouncedYearRange.min],
              ["<=", ["to-number", ["get", "constructi"]], debouncedYearRange.max]
            ]}
            paint={{
              "fill-color": [
                "interpolate-hcl",
                ["exponential", 1],
                ["get", "constructi"],
                // Early 19th century (pre-industrialization)
                1800, "#1D6996",
                // Erie Canal completed (1825)
                1825, "#0F8554", 
                // End of World War I (1918)
                1918, "#EDAD08", 
                // Great Depression/New Deal (1933)
                1933, "#E17C05", 
                1960, "#6F4070", 
                // 9/11 attacks (2001)
                2001, "#994E95", 
                2020, "#f00" 
                // #f3e79b,#fac484,#f8a07e,#eb7f86,#ce6693,#a059a0,#5c53a5
                // #009B9E,#42B7B9,#A7D3D4,#F1F1F1,#E4C1D9,#D691C1,#C75DAB
                // #fcde9c,#faa476,#f0746e,#e34f6f,#dc3977,#b9257a,#7c1d6f
              //  #5F4690,#1D6996,#38A6A5,#0F8554,#73AF48,#EDAD08,#E17C05,#CC503E,#94346E,#6F4070,#994E95,#666666
              ],
              "fill-opacity": 0.5,
            }}
          />
          {hoveredFeature && (
            <Popup longitude={hoveredFeature?.longitude} latitude={hoveredFeature?.latitude}
              anchor="bottom"
              offset={10}
              closeButton={false}
              className={styles.mapPopup}
            >
              {hoveredFeature?.year}
            </Popup>)}
        </Source>
      </Map>
    </div>
  );
}
