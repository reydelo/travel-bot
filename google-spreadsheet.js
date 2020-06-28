const { GoogleSpreadsheet } = require("google-spreadsheet");

const credentials = require("./google-generated-credentials.json");
const { GOOGLE_SPREADSHEET_KEY } = require("./constants.js");

const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_KEY);

async function setAuth() {
  await doc.useServiceAccountAuth(credentials);
}

async function getWorksheets() {
  await doc.loadInfo();
  return doc.sheetsByIndex;
}

async function findMatchingRow(worksheet, email) {
  const rows = await worksheet.getRows();
  return rows.find(row => row.email === email);
}

async function getTrainInfoForUser(email) {
  await setAuth();
  const [_, trainInfoSheet] = await getWorksheets();
  return await findMatchingRow(trainInfoSheet, email);
}

async function updateTrainInfo(formSubmission) {
  const rowData = {
    email: formSubmission.email,
    homestation: formSubmission.home_station,
    destinationstation: formSubmission.destination_station,
    homedeparturetime: formSubmission.home_departure_time,
    destinationdeparturetime: formSubmission.destination_departure_time,
    bahncardtype: formSubmission.bahncard_type,
    bahncardnumber: formSubmission.bahncard_number
  };

  await setAuth();
  const [_, trainInfoSheet] = await getWorksheets();
  const row = await findMatchingRow(trainInfoSheet, formSubmission.email);

  if (row) {
    for (let prop in rowData) {
      row[prop] = rowData[prop];
    }
    row.save();
  } else {
    trainInfoSheet.addRow(rowData);
  }
}

async function submitTravelRequest(formSubmission) {
  const rowData = {
    timestamp: Date.now(),
    email: formSubmission.email,
    traveltype: formSubmission.travel_type,
    outwarddate: formSubmission.outward_date,
    returndate: formSubmission.return_date,
    travelreason: formSubmission.travel_reason,
    travelmessage: formSubmission.travel_message
  };

  await setAuth();
  const [travelRequestSheet] = getWorksheets();
  const newRow = await travelRequestSheet.addRow(rowData);

  newRow.save();
}

module.exports = { submitTravelRequest, updateTrainInfo, getTrainInfoForUser };
