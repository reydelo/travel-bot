module.exports = {
  bahnCardNumber: {
    label: "BahnCard Number",
    type: "text",
    name: "bahnCardNumber",
    optional: true
  },
  bahnCardType: {
    label: "BahnCard Type",
    type: "select",
    name: "bahnCardType",
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
  destinationStation: {
    label: "Train Station that you frequently visit",
    name: "destinationStation",
    type: "text",
  },
  destinationDepartureTime: {
    label: "Destination Departure Time",
    name: "destinationDepartureTime",
    type: "text",
    hint: "Format: 00:00 (24 Hour)",
  },
  homeDepartureTime: {
    label: "Home Departure Time",
    name: "homeDepartureTime",
    type: "text",
    hint: "Format: 00:00 (24 Hour)",
  },
  homeStation: {
    label: "Train Station in your home city",
    name: "homeStation",
    type: "text",
  },
  outwardDate: {
    label: "Outward Journey Date",
    name: "outwardDate",
    type: "text",
    hint: "Format: DD.MM.YYYY"
  },
  returnDate: {
    label: "Return Journey Date",
    name: "returnDate",
    type: "text",
    hint: "Format: DD.MM.YYYY"
  },
  travelMessage: {
    label: "Additional message to Office Management",
    type: "textarea",
    name: "travelMessage",
    optional: true
  },
  travelReason: {
    label: "Reason for Traveling",
    type: "select",
    name: "travelReason",
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
