# ServiceM8 API Integration with Google Apps Script

This repository contains Google Apps Script functions to integrate with the ServiceM8 API. These functions allow you to fetch data from the ServiceM8 API and display the result in a Google Sheets spreadsheet.

## Scripts

### 1. `fetchFromServiceM8API`

This script fetches data from the ServiceM8 API and displays the result in the specified sheet.

Usage:

```javascript
fetchFromServiceM8API(endpoint, sheetName);


endpoint: The API endpoint to fetch data from.
sheetName: The name of the sheet to display the result in.


### 2. displayResult
This script parses the JSON response from the API and fills out the active spreadsheet with the parsed data.

Usage:

displayResult(responseText);
responseText: The JSON response text to parse.


### 3. getSecretValue
This script retrieves a token from Google Secret Manager.

Usage:

var token = getSecretValue(secretName, projectId, version);


secretName: The name of the secret containing the token.
projectId: The ID of the Google Cloud project (default: "YOUR_PROJECT_ID").
version: The version of the secret (default: "latest").


## Saving Token in Google Secret Manager
To use these scripts, you need to save your ServiceM8 API token in Google Secret Manager as a secret named "serviceM8_token". Follow these steps:

1. Obtain your ServiceM8 API token.
2. Navigate to Google Cloud Console.
3. Open Secret Manager.
4. Create a new secret named "serviceM8_token".
5. Add your ServiceM8 API token as the secret value.

## Authentication

ServiceM8 API utilizes Basic Authentication. You need to provide your API token as the username and leave the password empty. For more details, refer to the ServiceM8 API Authentication Documentation.

This `README.md` provides an overview of the scripts, their usage, instructions for saving the token in Google Secret Manager, and a reference to ServiceM8's API Authentication documentation.
```
