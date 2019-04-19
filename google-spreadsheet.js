const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./google-generated-credentials.json");

const spreadsheetKey = "1JuY40Zn3JtRZdbeBxD24GJYZw_469VpsSB8aYkfKSfs";
const spreadsheetKeyTest = "1F-80ym95Ti4GS7swrBFlQHAN0YPi893-3n3BoSEqjk4";
const doc = new GoogleSpreadsheet(spreadsheetKeyTest);

const slackCommands = {
  requestTrain: "request_train",
  updateTrainInfo: "update_train_info"
};

function setAuth() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(credentials, function(err) {
      if (err) {
        reject(new Error("failed to authenticate"));
        return;
      }
      resolve();
    });
  });
}

function getInfoAndWorksheets() {
  return new Promise((resolve, reject) => {
    doc.getInfo(function(err, info) {
      if (err) {
        reject(new Error("failed to connect to spreadsheet"));
        return;
      }
      resolve(info);
    });
  });
}

function findMatchingRow(worksheet, email) {
  return new Promise((resolve, reject) => {
    worksheet.getRows({}, (err, rows) => {
      if (err) {
        reject(new Error("failed to get rows from spreadsheet"));
        return;
      }
      resolve(rows.find(row => row.email === email));
    });
  });
}

function getTrainInfoForUser(email) {
  return setAuth()
    .then(getInfoAndWorksheets)
    .then(({ worksheets: [_, trainInfoSheet] }) => findMatchingRow(trainInfoSheet, email));
}

function updateTrainInfo(formSubmission) {
  const rowData = {
    email: formSubmission.email,
    homestation: formSubmission.home_station,
    destinationstation: formSubmission.destination_station,
    homedeparturetime: formSubmission.home_departure_time,
    destinationdeparturetime: formSubmission.destination_departure_time,
    bahncardtype: formSubmission.bahncard_type,
    bahncardnumber: formSubmission.bahncard_number
  };

  return setAuth()
    .then(getInfoAndWorksheets)
    .then(({ worksheets: [_, trainInfoSheet] }) => findMatchingRow(trainInfoSheet, formSubmission.email))
    .then(row => {
      if (row) {
        for (let prop in rowData) {
          row[prop] = rowData[prop];
        }
        row.save();
      } else {
        return new Promise((resolve, reject) => {
          trainInfoSheet.addRow(rowData, (err, row) => {
            if (err) {
              reject(new Error("failed to update spreadsheet"));
              return;
            }
            row.save();
            resolve();
          });
        });
      }
    });
}

function submitTravelRequest(formSubmission) {
  const rowData = {
    timestamp: Date.now(),
    email: formSubmission.email,
    traveltype: formSubmission.travel_type,
    outwarddate: formSubmission.outward_date,
    returndate: formSubmission.return_date,
    travelreason: formSubmission.travel_reason,
    travelmessage: formSubmission.travel_message
  };

  return new Promise((resolve, reject) => {
    setAuth().then(() => {
      getInfoAndWorksheets().then(info => {
        const travelRequestSheet = info.worksheets[0];

        travelRequestSheet.addRow(rowData, (err, row) => {
          if (err) {
            reject(new Error("failed to update spreadsheet"));
            return;
          }
          row.save();
          resolve();
        });
      }).catch(reject);
    }).catch(reject);
  });
}

module.exports = { submitTravelRequest, updateTrainInfo, getTrainInfoForUser };
