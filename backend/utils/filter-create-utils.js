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
    options: [
      { value: "ocean", label: "Ocean", color: "#00B8D9" },
      { value: "blue", label: "Blue", color: "#0052CC" },
      { value: "purple", label: "Purple", color: "#5243AA" },
      { value: "red", label: "Red", color: "#FF5630" },
      { value: "orange", label: "Orange", color: "#FF8B00" },
      { value: "yellow", label: "Yellow", color: "#FFC400" },
      { value: "green", label: "Green", color: "#36B37E" },
      { value: "forest", label: "Forest", color: "#00875A" },
      { value: "slate", label: "Slate", color: "#253858" },
      { value: "silver", label: "Silver", color: "#666666" },
    ],
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
