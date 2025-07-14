const data = [
  {
    id: "address",
    name: "Current Address*",
    value: "",
    default: "123 Main St, Anytown, USA",
    required: true,
    icon: "MdOutlineLocationOn",
  },
  {
    id: "services_needed",
    name: "Services Required*",
    value: "",
    default: "None",
    required: true,
    icon: "MdOutlineStopCircle",
  },
  {
    id: "country_of_origin",
    name: "Country of Origin",
    value: "",
    default: "Afghanistan",
    required: false,
    icon: "MdAirplanemodeActive",
  },
  {
    id: "language",
    name: "Language Spoken",
    value: "",
    default: "Arabic",
    required: false,
    icon: "MdOutlineSpatialAudioOff",
  },
  {
    id: "date_entered",
    name: "Date entered US",
    value: "",
    default: "2025-01-01",
    required: false,
    icon: "MdDateRange",
  },
  {
    id: "family_members",
    name: "Family Size",
    value: "",
    default: "2",
    required: false,
    icon: "MdOutlinePersonAddAlt",
  },
];

export default function createFilter(nonprofit) {
  return data;
}
