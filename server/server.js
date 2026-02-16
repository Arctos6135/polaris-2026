const scoutingDataMap = {
  // Common fields
  "team": 1,           // Column B
  "match": 2,          // Column C
  "scout": 3,          // Column D
  "type": 4,           // Column E
  "id": 5,             // Column F

  // Scouting-specific fields (columns G-W)
  "auto score hub": 6,      // Column G
  "auto leave": 7,          // Column H
  "auto climb": 8,          // Column I
  "score hub": 9,           // Column J
  "defense": 10,            // Column K
  "got defended": 11,       // Column L
  "endgame": 12,            // Column M
  "trench": 13,             // Column N
  "bump": 14,               // Column O
  "alliance shifts": 15,    // Column P
  "off shifts": 16,         // Column Q
  "driving": 17,            // Column R
  "intaking": 18,           // Column S
  "precision": 19,          // Column T
  "issues": 20,             // Column U
  "comments": 21,           // Column V
  "penalties": 22,          // Column W
}

const pitScoutingDataMap = {
  // Common fields
  "team": 1,           // Column B
  "match": 2,          // Column C (not used in pit scouting but kept for consistency)
  "scout": 3,          // Column D
  "type": 4,           // Column E
  "id": 5,             // Column F

  // Pit Scouting-specific fields (columns G-AF)
  "preferred fuel capacity": 6,   // Column G
  "fuel capacity": 7,             // Column H
  "score hub": 8,                 // Column I
  "trench": 9,                    // Column J
  "bump": 10,                     // Column K
  "auto l1 climb": 11,            // Column L
  "l1 climb": 12,                 // Column M
  "l2 climb": 13,                 // Column N
  "l3 climb": 14,                 // Column O
  "drivetrain": 15,               // Column P
  "intake": 16,                   // Column Q
  "weight": 17,                   // Column R
  "width": 18,                    // Column S
  "length": 19,                   // Column T
  "width with bumpers": 20,       // Column U
  "length with bumpers": 21,      // Column V
  "retracted height": 22,         // Column W
  "extended height": 23,          // Column X
  "autos": 24,                    // Column Y
  "how climb": 25,                // Column Z
  "driver experience": 26,        // Column AA
  "preferences": 27,              // Column AB
  "general comments": 28,         // Column AC
  "reliability issues": 29,       // Column AD
  "miscellaneous": 30,            // Column AE
  "fave colour": 31,              // Column AF
}

function doPost(request) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const output = sheet.getSheetByName("App Output");
    const contents = JSON.parse(request.postData.contents);
    
    // Write data for each response
    contents.forEach((response) => {
      const lastRow = output.getLastRow() + 1;
      
      // Determine which map to use based on type
      const dataMap = response.type === "Scouting" ? scoutingDataMap : pitScoutingDataMap;
      
      for (const col in response) {
        const colIdx = dataMap[col];
        if (colIdx !== undefined) {
          output.getRange(lastRow, colIdx).setValue(response[col]);
        }
      }
    });
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: e.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const events = sheet.getSheetByName("Event Data");
    const teams = sheet.getRangeByName("GenTeamNumberList");
    const response = {
      success: true,
      matches: [],
      teams: [],
    };
    response.matches = events
      .getRange("B2:I1000")
      .getValues()
      .filter((lst) => lst[0] != "");
    response.teams = teams
      .getValues()
      .filter((lst) => lst[0] != "");

    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: e.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
