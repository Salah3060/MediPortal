import propTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const LocationPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [30.0444, 31.2357], // Default coordinates (e.g., Cairo, Egypt)
      zoom: 13,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapInstance) {
      // Add click event listener
      mapInstance.on("click", (e) => {
        const { lat, lng } = e.latlng;

        // Update or add the marker
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          const newMarker = L.marker([lat, lng], { draggable: true }).addTo(
            mapInstance
          );
          setMarker(newMarker);

          // Listen for marker drag events
          newMarker.on("dragend", () => {
            const { lat: newLat, lng: newLng } = newMarker.getLatLng();
            onLocationSelect({ lat: newLat, lng: newLng });
          });
        }

        onLocationSelect({ lat, lng });
      });
    }
  }, [mapInstance, marker, onLocationSelect]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      // Fetch suggestions from Nominatim API
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5, // Limit the number of suggestions
          },
        }
      );

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon } = suggestion;

    // Update map view and marker position
    mapInstance.setView([lat, lon], 13);

    if (marker) {
      marker.setLatLng([lat, lon]);
    } else {
      const newMarker = L.marker([lat, lon], { draggable: true }).addTo(
        mapInstance
      );
      setMarker(newMarker);

      newMarker.on("dragend", () => {
        const { lat: newLat, lng: newLng } = newMarker.getLatLng();
        onLocationSelect({ lat: newLat, lng: newLng });
      });
    }

    // Pass the selected location to the parent
    onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lon) });
    setSuggestions([]); // Clear suggestions after selection
    setSearchQuery(""); // Clear the search query
  };

  return (
    <div>
      {/* Search Bar */}
      <div
        style={{ marginBottom: "10px", position: "relative" }}
        className="z-10"
      >
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-primary my-2 focus:border-primary"
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
              width: "80%",
              maxHeight: "150px",
              overflowY: "auto",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              listStyle: "none",
              padding: "0",
              margin: "0",
              zIndex: 1000,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="z-0"
      ></div>
    </div>
  );
};

LocationPicker.propTypes = {
  onLocationSelect: propTypes.func.isRequired,
};

export default LocationPicker;
