import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import Navbar from "../Navbar";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/map", { headers: { Authorization: token } })
      .catch(() => alert("User not logged in"));

    // Fetch user's location
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;

        if (!this.map) {
          // Initialize the map only once
          this.map = L.map("map").setView([latitude, longitude], 6);

          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            minZoom: 1,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(this.map);

          L.marker([latitude, longitude]).addTo(this.map)
            .bindPopup("Your Location")
            .openPopup();
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Navbar />
        <div id="map" style={{ height: "90vh", width: "100%" }}></div>
      </div>
    );
  }
}

export default MapView;
