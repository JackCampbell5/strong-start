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
} from "react-icons/md";

export const serviceInputDefaultValues = {
  name: { default: "Community Food Kitchen", icon: MdOutlinePerson },
  address: { default: "123 Main St, Anytown, USA", icon: MdOutlineLocationOn },
  zipcode: { default: "12345", icon: MdNumbers },
  description: {
    default: "Providing free meals to those in need",
    icon: MdOutlineTextSnippet,
  },
  email: { default: "info@communityfoodkitchen.org", icon: MdEmail },
  phone: { default: "(555) 555-5555", icon: MdLocalPhone },
  website: {
    default: "https://www.communityfoodkitchen.org",
    icon: MdLanguage,
  },
  hours: {
    default: "Monday - Friday: 11am - 2pm, Saturday: 12pm - 3pm",
    icon: MdHourglassBottom,
  },
  logo: {
    default: "https://www.communityfoodkitchen.org/logo.png",
    icon: MdImage,
  },
  language: { default: "English", icon: MdOutlineSpatialAudioOff },
  date_needed: { default: "As soon as possible", icon: MdDateRange },
  services_offered: {
    default: "Free meals, food pantry, nutrition counseling",
    icon: MdFilterList,
  },
  restrictions: { default: "None", icon: MdOutlineStopCircle },
  next_steps: {
    default: "Call or email to schedule an appointment",
    icon: MdOutlineSkipNext,
  },
};

export const serviceNameInputDefault = {
  id: "unselected",
  text: "Select a Service",
};
