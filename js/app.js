const inputValue = document.getElementById("search");
const submit = document.getElementById("submit");

const peticion = async (ipNew) => {
  const IP = inputValue.value;

  const url = `https://geo.ipify.org/api/v1?apiKey=at_BUWwkV96Ux5Axpb6n9QEp4k4AHVu9&ipAddress=${IP}`;
  const res = await fetch(url);
  const data = await res.json();

  const dataTracker = {
    ip: data.ip,
    locationLat: data.location.lat,
    locationLng: data.location.lng,
    locationCountry: data.location.country,
    locationCity: data.location.city,
    timezone: data.location.timezone,
    isp: data.isp,
  };

  generateMapa(
    dataTracker.locationLat,
    dataTracker.locationLng,
    dataTracker.ip,
    dataTracker.locationCity + ", " + dataTracker.locationCountry
  );
  generateInfo(
    dataTracker.ip,
    dataTracker.locationCity + ", " + dataTracker.locationCountry,
    "UTC" + dataTracker.timezone,
    dataTracker.isp
  );
//   console.log(data);
};
peticion();
const ipNew = submit.addEventListener("click", (e) => {
  e.preventDefault();
  peticion();
});

const generateMapa = (Lat, Lng, ip = "", location ="") => {
  document.getElementById("weathermap").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";

  var map = L.map("map").setView([Lat, Lng], 13);

  const iconMarker = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [46, 56] 
});

  let marker = L.marker([Lat, Lng], {icon: iconMarker})
    .addTo(map)
    // .bindPopup(ip + "<br>" + location)
    // .openPopup();

  let circle = L.circle([Lat, Lng], {
    // color: "red",
    // fillColor: "#f03",
    // fillOpacity: 0.5,
    // radius: 500,
  }).addTo(map);
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    map
  );
};

const generateInfo = (address, location, timezone, isp) => {
  document.querySelector("#address").innerHTML = address;
  document.querySelector("#location").innerHTML = location;
  document.querySelector("#timezone").innerHTML = timezone;
  document.querySelector("#isp").innerHTML = isp;
};