const { GoogleSpreadsheet } = require("google-spreadsheet");

const {
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SPREADSHEET_KEY,
} = require("./config");

const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_KEY);

async function setAuth() {
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  });
}

async function getWorksheets() {
  await doc.loadInfo();
  return doc.sheetsByIndex;
}

async function findMatchingRow(worksheet, email) {
  const rows = await worksheet.getRows();
  return rows.find((row) => row.email === email);
}

async function getTrainInfoForUser(email) {
  await setAuth();
  const [_, trainInfoSheet] = await getWorksheets();
  return await findMatchingRow(trainInfoSheet, email);
}

async function updateTrainInfo(formSubmission) {
  await setAuth();
  const [_, trainInfoSheet] = await getWorksheets();
  const row = await findMatchingRow(trainInfoSheet, formSubmission.email);

  if (row) {
    for (let prop in formSubmission) {
      row[prop] = formSubmission[prop];
    }
    row.save();
  } else {
    trainInfoSheet.addRow(formSubmission);
  }
}

async function submitTravelRequest(formSubmission) {
  await setAuth();
  const [travelRequestSheet] = await getWorksheets();
  const newRow = await travelRequestSheet.addRow({
    timestamp: Date.now(),
    ...formSubmission,
  });

  newRow.save();
}

module.exports = { submitTravelRequest, updateTrainInfo, getTrainInfoForUser };
