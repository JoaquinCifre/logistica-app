"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function OperationsMap(
  { order }: any
) {

  if (
    !order?.client?.latitude ||
    !order?.client?.longitude
  ) {
    return (
      <div
        className="
        bg-slate-100
        rounded-xl
        p-6
        text-center
        "
      >
        Este cliente no tiene coordenadas cargadas.
      </div>
    );
  }

  return (
    <MapContainer
      center={[
        order.client.latitude,
        order.client.longitude,
      ]}
      zoom={14}
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          order.client.latitude,
          order.client.longitude,
        ]}
      >
        <Popup>
          {order.client.name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}