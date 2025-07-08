import {
  MdOutlinePerson,
  MdOutlineLocationOn,
  MdNumbers,
  MdOutlineTextSnippet,
  MdEmail,
  MdLocalPhone,
  MdLanguage,
  MdHourglassBottom,
  MdImage,
  MdOutlineSpatialAudioOff,
  MdDateRange,
  MdFilterList,
  MdOutlineStopCircle,
  MdOutlineSkipNext,
  MdAirplanemodeActive,
  MdOutlinePersonAddAlt,
} from "react-icons/md";

export const serviceInputDefaultValues = {
  name: {
    name: "Name*",
    default: "Community Food Kitchen",
    icon: MdOutlinePerson,
    required: true,
  },
  address: {
    name: "Address*",
    default: "123 Main St, Anytown, USA",
    icon: MdOutlineLocationOn,
    required: true,
  },
  zipcode: {
    name: "Zip Code*",
    default: "12345",
    icon: MdNumbers,
    required: true,
  },
  description: {
    name: "Description*",
    default: "Providing free meals to those in need",
    icon: MdOutlineTextSnippet,
    required: true,
  },
  email: {
    name: "Email",
    default: "info@communityfoodkitchen.org",
    icon: MdEmail,
    required: false,
  },
  phone: {
    name: "Phone",
    default: "(555) 555-5555",
    icon: MdLocalPhone,
    required: false,
  },
  website: {
    name: "Website*",
    default: "https://www.communityfoodkitchen.org",
    icon: MdLanguage,
    required: true,
  },
  hours: {
    name: "Hours",
    default: "Monday - Friday: 11am - 2pm, Saturday: 12pm - 3pm",
    icon: MdHourglassBottom,
    required: false,
  },
  logo: {
    name: "Logo",
    default: "https://www.communityfoodkitchen.org/logo.png",
    icon: MdImage,
    required: false,
  },
  language: {
    name: "Language",
    default: "English",
    icon: MdOutlineSpatialAudioOff,
    required: false,
  },
  date_needed: {
    name: "Date Needed",
    default: "As soon as possible",
    icon: MdDateRange,
    required: false,
  },
  services_offered: {
    name: "Services Offered*",
    default: "Free meals, food pantry, nutrition counseling",
    icon: MdFilterList,
    required: true,
  },
  restrictions: {
    name: "Restrictions",
    default: "None",
    icon: MdOutlineStopCircle,
    required: false,
  },
  next_steps: {
    name: "Next Steps*",
    default: "Call or email to schedule an appointment",
    icon: MdOutlineSkipNext,
    required: true,
  },
};

export const serviceNameInputDefault = {
  id: "unselected",
  text: "Select a Service",
};

export const serviceSearchIconMap = {
  MdOutlineLocationOn: MdOutlineLocationOn,
  MdOutlineStopCircle: MdOutlineStopCircle,
  MdAirplanemodeActive: MdAirplanemodeActive,
  MdOutlineSpatialAudioOff: MdOutlineSpatialAudioOff,
  MdDateRange: MdDateRange,
  MdOutlinePersonAddAlt: MdOutlinePersonAddAlt,
};
