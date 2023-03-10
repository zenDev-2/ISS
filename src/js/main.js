"use strict";

// ISS location tracker

// Global vars
let trackISS = false; // to be toggled to lock on and follow ISS movement
let lastKnownLand = "Verifying..."; // Helps handle when water body returns undefined (in a transitionary coordinate between sea & land that the api doesn't know)

// Country codes obj
const codes__json = {
  AF: "Afghanistan",
  AX: "Åland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "The Democratic Republic of the Congo",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Islamic Republic Of Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Democratic People's Republic of Korea",
  KR: "Republic of Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "The Former Yugoslav Republic of Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Federated States of Micronesia",
  MD: "Republic of Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Occupied Palestinian Territory",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  CS: "Serbia and Montenegro",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan, Province of China",
  TJ: "Tajikistan",
  TZ: "United Republic of Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

// DOM nodes
const locationTxt = document.querySelector(".locationTxt");
const mvmntTxt = document.querySelector(".mvmnt");
const distanceTxt = document.querySelector(".distance");
const latTxt = document.querySelector(".lat");
const lonTxt = document.querySelector(".lon");

// Initializes the map
const map = L.map("map");
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
).addTo(map);

// Initializes Map View
const initializeMap = async (map) => {
  const res = await fetch("http://localhost:3000/isscoords");
  const data = await res.json();
  map.setView([data.latitude, data.longitude], 6);
  initialLat = data.latitude;
  initialLon = data.longitude;
  latTxt.innerText = `${initialLat.toFixed(4)}\u00b0`;
  lonTxt.innerText = `${initialLon.toFixed(4)}\u00b0`;
};

// Recenters Map View
const recenterMap = async (map) => {
  const res = await fetch("http://localhost:3000/isscoords");
  const data = await res.json();
  map.setView([data.latitude, data.longitude], map.getZoom());
};

// ISS icon
const ISSicon = L.icon({
  iconUrl: "./img/iss.png",
  iconSize: [50, 50],
});

let initialLat;
let initialLon;

// Calculates distance between coordinates
const distance = function (lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;
  return Math.floor(c * r);
};

// || FUNCTION || Makes api calls and updates ISS position on map
const ISSlocation = async () => {
  // Request Handling
  const res = await fetch("http://localhost:3000/isscoords");
  const data = await res.json();
  const coordinates = [data.latitude, data.longitude];
  latTxt.innerText = `${data.latitude.toFixed(4)}\u00b0`;
  lonTxt.innerText = `${data.longitude.toFixed(4)}\u00b0`;
  const locationRes = await fetch(
    `http://localhost:3000/openweather?lat=${data.latitude}&lon=${data.longitude}`
  );
  const geodata = await locationRes.json();

  // Calculate distance
  distanceTxt.innerText = `~ ${distance(
    initialLat,
    data.latitude,
    initialLon,
    data.longitude
  )} km `;

  // Visual components
  const currentMarker = L.marker(coordinates, { icon: ISSicon });
  const circle = L.circle(coordinates, {
    color: "rgb(194, 44, 44)",
    fillColor: "rgb(194, 44, 44)",
    radius: 10000,
  });

  // Popup messages + marker update functions
  let water;
  let hasState_msg;
  let msg;
  let msgPopup;
  let markerMsg;

  // receives global countries.json object
  const countryCodes = await codes__json;

  // returns country name after matching its code
  const findCountry = (codes, countryCode) => codes[countryCode];

  if (geodata.length != 0) {
    const countryName = findCountry(countryCodes, geodata[0].country);
    if (geodata[0].state) {
      if (geodata[0].state === geodata[0].name) {
        hasState_msg = `${geodata[0].state}, ${countryName}`;
        markerMsg = `${
          geodata[0].state
        }, ${countryName}<br>[ ${data.latitude.toFixed(
          4
        )}\u00b0, ${data.longitude.toFixed(4)}\u00b0 ]`;
        lastKnownLand = hasState_msg.slice();
      } else {
        if (`${geodata[0].name} ${geodata[0].state}`.length > 20) {
          hasState_msg = `${geodata[0].name}, <br>${geodata[0].state}, ${countryName}`;
        } else {
          hasState_msg = `${geodata[0].name}, ${geodata[0].state}, <br>${countryName}`;
        }
        markerMsg = `${geodata[0].name}, ${
          geodata[0].state
        }, ${countryName}<br>[ ${data.latitude.toFixed(
          4
        )}\u00b0, ${data.longitude.toFixed(4)}\u00b0 ]`;
        lastKnownLand = hasState_msg.slice();
      }
    }
    msg = `${geodata[0].name}, ${countryName}`;
    msgPopup = `${geodata[0].name}, ${countryName}<br>[ ${data.latitude.toFixed(
      4
    )}\u00b0, ${data.longitude.toFixed(4)}\u00b0 ]`;
    lastKnownLand = msg.slice();
    // console.log(`msgPopup is: ${msgPopup}. state: ${geodata[0].state}`);
  }
  const placeMarker = (popup) => {
    currentMarker.addTo(map).bindPopup(popup);
  };
  const replaceWithCircle = (popup) => {
    circle.addTo(map).bindPopup(popup);
    map.removeLayer(currentMarker);
  };

  // Helpful debug console logs
  // console.log(geodata.length, geodata);
  // console.log("Last known land: ", lastKnownLand);

  // Marker updates on location changes
  // handler for when above water
  if (geodata.length === 0) {
    const waterRes = await fetch(
      `http://localhost:3000/opencage?lat=${data.latitude}&lon=${data.longitude}`
    );
    const waterData = await waterRes.json();
    try {
      water = waterData.results[0].components.body_of_water;
    } catch {
      water = lastKnownLand;
    }
    locationTxt.innerText = water;
    placeMarker(water);
    setTimeout(() => {
      replaceWithCircle(water);
    }, 7000);
    // handler for when above United States
  } else if (geodata[0].state) {
    locationTxt.innerHTML = hasState_msg;
    placeMarker(markerMsg);
    setTimeout(() => {
      replaceWithCircle(markerMsg);
    }, 7000);
    // handler for when above everything else
  } else {
    locationTxt.innerText = msg;
    placeMarker(msgPopup);
    setTimeout(() => {
      replaceWithCircle(msgPopup);
    }, 7000);
  }

  // console logs
  try {
    const location = `${geodata[0].name}, ${countryName}`;
    console.log(location, coordinates);
  } catch (err) {
    if (water === undefined) {
      console.log(`ISS is above ${lastKnownLand}!`);
    } else {
      console.log(`ISS is above the ${water}! 🌊 `, coordinates);
    }
  }
  return [data.latitude, data.longitude];
};
// || FUNCTION END ||

// Event Handlers
const recenter__BTN = document.querySelector(".recenterBTN");
recenter__BTN.addEventListener("click", () => {
  recenterMap(map);
});

const toggleTracking__BTN = document.querySelector(".trackingBTN");
toggleTracking__BTN.addEventListener("click", () => {
  trackISS = true ? !trackISS : (trackISS = false);
  if (trackISS) {
    toggleTracking__BTN.style.backgroundColor = "#078343";
    mvmntTxt.innerText = "On";
  } else {
    toggleTracking__BTN.style.backgroundColor = "#141414";
    mvmntTxt.innerText = "Off";
  }
});

// Program Loop
initializeMap(map);
ISSlocation();
setInterval(() => {
  if (trackISS) {
    recenterMap(map);
  }
  ISSlocation();
}, 7000);
