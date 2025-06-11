import './App.css'
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import 'leaflet/dist/leaflet.css';
import BottomSheet from './BottomSheet';

function Root() {
    const position = new LatLng(51.505, -0.09);
    return (
        <>
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100vw' }} className="z-0">
            <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
        <BottomSheet />
        </>
    )
}

export default Root