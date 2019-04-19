module.exports = {
  bahncard_number: {
    label: "BahnCard Number",
    type: "text",
    name: "bahncard_number",
    value: "7081411182930772",
    optional: true
  },
  bahncard_type: {
    label: "BahnCard Type",
    type: "select",
    name: "bahncard_type",
    value: "BahnCard 50",
    optional: true,
    options: [
      { label: "BahnCard 25", value: "BahnCard 25" },
      { label: "BahnCard 50", value: "BahnCard 50" },
      { label: "BahnCard 100", value: "BahnCard 100" },
      { label: "BahnCard Business 25", value: "BahnCard Business 25" },
      { label: "BahnCard Business 50", value: "BahnCard Business 50" },
      { label: "BahnCard Business 100", value: "BahnCard Business 100" }
    ]
  },
  destination_station: {
    label: "Train Station that you frequently visit",
    name: "destination_station",
    type: "text",
    value: "Hamburg HBF"
  },
  destination_departure_time: {
    label: "Destination Departure Time",
    name: "destination_departure_time",
    type: "text",
    hint: "Format: 00:00 (24 Hour)",
    value: "17:35",
  },
  home_departure_time: {
    label: "Home Departure Time",
    name: "home_departure_time",
    type: "text",
    hint: "Format: 00:00 (24 Hour)",
    value: "07:40",
  },
  home_station: {
    label: "Train Station in your home city",
    name: "home_station",
    type: "text",
    value: "Berlin HBF"
  },
  outward_arrival_station: {
    label: "Outward Journey Arrival Station",
    name: "outward_arrival_station",
    type: "text",
    value: "Hamburg HBF"
  },
  outward_date: {
    label: "Outward Journey Date",
    name: "outward_date",
    type: "text",
    hint: "Format: DD.MM.YYYY"
  },
  outward_departure_station: {
    label: "Outward Journey Departure Station",
    name: "outward_departure_station",
    type: "text",
    value: "Berlin HBF"
  },
  outward_departure_time: {
    label: "Outward Journey Departure Time",
    name: "outward_departure_time",
    type: "text",
    hint: "Format: 00:00 (24 Hour)"
  },
  return_arrival_station: {
    label: "Return Journey Arrival Station",
    name: "return_arrival_station",
    type: "text"
  },
  return_date: {
    label: "Return Journey Date",
    name: "return_date",
    type: "text",
    hint: "Format: DD.MM.YYYY"
  },
  return_departure_station: {
    label: "Return Journey Departure Station",
    name: "return_departure_station",
    type: "text"
  },
  return_departure_time: {
    label: "Return Journey Departure Time",
    name: "return_departure_time",
    type: "text",
    hint: "Format: 00:00 (24 Hour)"
  },
  travel_message: {
    label: "Additional message to Office Management",
    type: "textarea",
    name: "travel_message",
    optional: true
  },
  travel_reason: {
    label: "Reason for Traveling",
    type: "select",
    name: "travel_reason",
    value: "Team Meetings",
    options: [
      { label: "Team Meetings", value: "Team Meetings" },
      { label: "Team Event", value: "Team Event" },
      { label: "Workshop", value: "Workshop" },
      { label: "Working with Team", value: "Working with Team" },
      { label: "1: 1 Meeting", value: "1: 1 Meeting" },
      { label: "Onboarding", value: "Onboarding" },
      { label: "Interviews", value: "Interviews" },
      {
        label: "External Meetings (with partners, investors)",
        value: "External Meetings"
      },
      { label: "Other (please specify below)", value: "Other" }
    ]
  }
};