/**
 * SETUP INSTRUCTIONS
 * ==================
 * 1. In your Google Sheet → Extensions → Apps Script
 * 2. Delete everything, paste this entire file, save (Ctrl+S)
 * 3. Deploy → Manage deployments → edit existing → New version → Deploy
 *    - Execute as: Me
 *    - Who has access: Anyone
 * The URL does not change when you create a new version.
 */

const SHEET_NAME = 'Leads'

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet()
    let   sheet = ss.getSheetByName(SHEET_NAME)

    // Create sheet + header row on very first submission
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME)
      const header = sheet.getRange(1, 1, 1, 6)
      sheet.appendRow(['Submitted At', 'Name', 'Email', 'Phone', 'Interest', 'Message'])
      header.setFontWeight('bold').setBackground('#C9A86A').setFontColor('#ffffff')
    }

    // Body arrives as text/plain containing a JSON string
    const raw  = e.postData ? e.postData.contents : ''
    const data = raw ? JSON.parse(raw) : {}

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name        || '',
      data.email       || '',
      data.phone       || '',
      data.interest    || '',
      data.message     || '',
    ])

    // Return CORS headers so the browser doesn't log a network error
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput('Peachtree Tower — contact endpoint is live.')
}
