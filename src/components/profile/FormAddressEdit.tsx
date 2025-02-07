import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Konfigurasi ikon Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// Skema validasi Yup
const addressSchema = Yup.object().shape({
  address_name: Yup.string().required("Address name is required"),
  address: Yup.string().required("Address is required"),
  subdistrict: Yup.string().required("Subdistrict is required"),
  city: Yup.string().required("City is required"),
  city_id: Yup.string().required("City ID is required"),
  province: Yup.string().required("Province is required"),
  province_id: Yup.string().required("Province ID is required"),
  postcode: Yup.string().required("Postcode is required"),
  latitude: Yup.number().typeError("Must be a number").required("Latitude is required"),
  longitude: Yup.number().typeError("Must be a number").required("Longitude is required"),
});

// Field input yang akan ditampilkan
const fields = [
  { name: "address_name", label: "Address Name", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "subdistrict", label: "Subdistrict", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "city_id", label: "City ID", type: "text" },
  { name: "province", label: "Province", type: "text" },
  { name: "province_id", label: "Province ID", type: "text" },
  { name: "postcode", label: "Postcode", type: "text" },
  { name: "latitude", label: "Latitude", type: "number" },
  { name: "longitude", label: "Longitude", type: "number" },
];

// Komponen untuk memilih lokasi di peta
const LocationPicker = ({ setFieldValue, setMarkerPosition, markerPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]); // Update posisi marker
      setFieldValue("latitude", lat);
      setFieldValue("longitude", lng);
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
};

// Formulir Edit Address
const FormAddressEdit = ({ formData, onSubmit, setPrimaryAddress }) => {
  // State untuk menyimpan posisi marker
  const [markerPosition, setMarkerPosition] = useState([formData.latitude || -6.19676128457438, formData.longitude || 106.83754574840799]);
  const [addressId, setAddressId] = useState(0)
  // State untuk initial values
  const [initialValues, setInitialValues] = useState({
    address_name: "",
    address: "",
    subdistrict: "",
    city: "",
    city_id: "",
    province: "",
    province_id: "",
    postcode: "",
    latitude: "",
    longitude: "",
  });

  // Efek untuk mengatur default values saat formData berubah
  useEffect(() => {
    if (formData) {
      setAddressId(formData.address_id)
      setInitialValues({
        address_name: formData.address_name || "",
        address: formData.address || "",
        subdistrict: formData.subdistrict || "",
        city: formData.city || "",
        city_id: formData.city_id || "",
        province: formData.province || "",
        province_id: formData.province_id || "",
        postcode: formData.postcode || "",
        latitude: formData.latitude || -6.19676128457438,
        longitude: formData.longitude || 106.83754574840799,
      });
      setMarkerPosition([formData.latitude || -6.19676128457438, formData.longitude || 106.83754574840799]);
    }
  }, [formData]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={addressSchema}
      onSubmit={(values) => {
        console.log("Updated Data:", values);
        console.log(addressId)
        onSubmit(addressId, values);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-500">
                {field.label}
              </label>
              <Field
                id={field.name}
                name={field.name}
                type={field.type}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name={field.name} component="p" className="mt-1 text-sm text-red-600" />
            </div>
          ))}

          {/* Map Section */}
          <div className="mt-5">
            <h3 className="text-sm font-medium text-gray-500">Select Location on Map</h3>
            <MapContainer
              center={markerPosition}
              zoom={8}
              style={{ height: "300px", width: "100%", marginTop: "1rem" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={markerPosition}>
                <Popup>
                  <span>Your Selected Address</span>
                </Popup>
              </Marker>
              <LocationPicker setFieldValue={setFieldValue} setMarkerPosition={setMarkerPosition} markerPosition={markerPosition} />
            </MapContainer>
          </div>

          <div className="grid-cols-2 grid gap-3">
            <button
              type="button"
              onClick={() => setPrimaryAddress(addressId)}
              // disabled={isSubmitting}
              className={`w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-700}`}
            >
              {"Jadikan Alamat Utama"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"}`}
            >
              {isSubmitting ? "Updating..." : "Update Address"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormAddressEdit;
