# Guest Wish Setup - Request to Join Feature

## Overview

The Guest Wish feature allows people who aren't on the guest list to request permission to join the wedding celebration. These requests are sent to a separate Google Sheet for the couple to review.

## Google Apps Script Implementation

Your Google Apps Script should have a sheet named `WishGuest` with the following structure:

### Sheet Structure

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Name     | Email    | Phone    | RSVP     | Message  |

### Header Row (Row 1)
```
Name | Email | Phone | RSVP | Message
```

## Complete Code Snippet

```javascript
function doPost(e) {
  // Guard against running without event data (e.g., from editor test runs)
  if (!e || !e.postData) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Invalid request. This function must be called via web app deployment.' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WishGuest');
  
  // Parse the request body
  const body = JSON.parse(e.postData.contents);
  
  try {
    if (body.action === 'update') {
      // Find and update row by name
      const lastRow = sheet.getLastRow();
      let found = false;
      
      for (let i = 2; i <= lastRow; i++) {
        const cellValue = sheet.getRange(i, 1).getValue().toString().trim();
        const searchName = body.Name.trim();
        
        if (cellValue === searchName) {
          // Update the existing row
          sheet.getRange(i, 2).setValue(body.Email || 'Pending');
          sheet.getRange(i, 3).setValue(body.Phone || '');
          sheet.getRange(i, 4).setValue(body.RSVP || '');
          sheet.getRange(i, 5).setValue(body.Message || '');
          found = true;
          break;
        }
      }
      
      if (!found) {
        // If not found, add as new guest instead
        sheet.appendRow([
          body.Name,
          body.Email || 'Pending',
          body.Phone || '',
          body.RSVP || '',
          body.Message || ''
        ]);
      }
      
    } else if (body.action === 'delete') {
      // Find and delete row by name
      const lastRow = sheet.getLastRow();
      
      for (let i = 2; i <= lastRow; i++) {
        const cellValue = sheet.getRange(i, 1).getValue().toString().trim();
        const searchName = body.Name.trim();
        
        if (cellValue === searchName) {
          sheet.deleteRow(i);
          break;
        }
      }
      
    } else {
      // Add new guest (default action - when no action specified)
      sheet.appendRow([
        body.Name,
        body.Email || 'Pending',
        body.Phone || '',
        body.RSVP || '',
        body.Message || ''
      ]);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WishGuest');
  
  // Get all data from the sheet
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  // Skip header row
  const guests = [];
  for (let i = 1; i < values.length; i++) {
    guests.push({
      Name: values[i][0],
      Email: values[i][1],
      Phone: values[i][2],
      RSVP: values[i][3],
      Message: values[i][4]
    });
  }
  
  return ContentService.createTextOutput(
    JSON.stringify(guests)
  ).setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this from the Apps Script editor to verify setup
function testSetup() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WishGuest');
    const lastRow = sheet.getLastRow();
    Logger.log('Sheet found. Last row: ' + lastRow);
    Logger.log('Headers: ' + sheet.getRange(1, 1, 1, 5).getValues());
    return 'Setup looks good! Sheet has ' + (lastRow - 1) + ' request(s).';
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}
```

## Deployment Steps

1. Open your Google Sheet with the `WishGuest` tab
2. Go to **Extensions → Apps Script**
3. Paste the code above into the editor
4. Save the script (Ctrl+S or Cmd+S)
5. Click **Deploy → New deployment**
6. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
7. Fill in the deployment settings:
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
8. Click **Deploy**
9. **Copy the new Web App URL** that appears
10. **Update** the `GUEST_WISH_SCRIPT_URL` constant in `app/api/guest-requests/route.ts` with the new URL

## After Deployment

1. Open `app/api/guest-requests/route.ts`
2. Find line 4: `const GUEST_WISH_SCRIPT_URL = 'YOUR_GUEST_WISH_SCRIPT_URL_HERE'`
3. Replace with your new deployment URL
4. Save the file
5. Restart your development server

## Features

### Request to Join
- When a name is not found in the guest list, users can click "Request to Join"
- Modal opens with a form for:
  - Full Name (required)
  - Email (required)
  - Phone Number (optional)
  - Message (optional)
- Requests are saved to the `WishGuest` Google Sheet
- Users receive a confirmation message

### Dashboard View
- View all guest requests in the dashboard
- Review and approve/reject requests
- Contact information available for follow-up

## Notes

- Keep this separate from the main guest list for better organization
- Review requests periodically and add approved guests to the main list
- The RSVP field in the request form is typically left empty - it's for your internal tracking

