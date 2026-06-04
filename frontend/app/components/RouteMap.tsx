"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface Order {
  id: number;

  client: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export default function RouteMap({
  orders,
}: {
  orders: Order[];
}) {
  const positions = orders.map((o) => [
    o.client.latitude,
    o.client.longitude,
  ]) as [number, number][];

  return (
    <MapContainer
      center={[-34.6037, -58.3816]}
      zoom={11}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {orders.map((order, index) => (
        <Marker
          key={order.id}
          position={[
            order.client.latitude,
            order.client.longitude,
          ]}
        >
          <Popup>
            #{index + 1}
            <br />
            {order.client.name}
            <br />
            {order.client.address}
          </Popup>
        </Marker>
      ))}

      <Polyline positions={positions} />
    </MapContainer>
  );
}