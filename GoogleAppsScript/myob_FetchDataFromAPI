/**
 * Function: fetchDataFromAPI
 * Description: Fetches data from a specified API endpoint and parses it into a Google Sheet.
 * Parameters:
 *   - endpointUrl: The URL of the API endpoint to fetch data from.
 *   - sheetName: Name of the Google Sheet to insert the data.
 */
function fetchDataFromAPI(endpointUrl, sheetName) {
    var token = retrieveSecret('myob_access_token'); // Get access token from Google Secret Manager
    var myobClientId = retrieveSecret('myob_client_id'); // Get MYOB client ID from Google Secret Manager

    if (!token || !myobClientId) {
        console.error("Token or MYOB client ID retrieval failed. Unable to fetch data from the API.");
        return;
    }

    var options = {
        'method': 'GET',
        'muteHttpExceptions': false,
        'headers': {
            'Connection': 'keep-alive',
            'Authorization': token,
            'x-myobapi-key': myobClientId,
            'x-myobapi-version': 'v2',
        }
    };

    var response = UrlFetchApp.fetch(endpointUrl, options);
    var responseCode = response.getResponseCode();

    // If there's an error in retrieving data, attempt to refresh token and retry
    if (responseCode !== 200) {
        console.error("Failed to fetch data from the API. Response code: " + responseCode);
        refreshTokenAndRetry(endpointUrl, sheetName);
        return;
    }

    var responseData = JSON.parse(response.getContentText());
    var parsedData = parse_JSON_Data_to_GoogleSheets(responseData, null, null);

    if (parsedData.length > 0) {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        var range = sheet.getRange(1, 1, parsedData.length, parsedData[0].length);
        range.setValues(parsedData);
    } else {
        console.error("Parsed data is empty. No data inserted into the sheet.");
    }
}

/**
 * Function: refreshTokenAndRetry
 * Description: Refreshes the access token and retries fetching data from the API.
 * Parameters:
 *   - endpointUrl: The URL of the API endpoint to fetch data from.
 *   - sheetName: Name of the Google Sheet to insert the data.
 */
function refreshTokenAndRetry(endpointUrl, sheetName) {
    refreshToken(); // Refresh access token

    // Retry fetching data with the updated token
    fetchDataFromAPI(endpointUrl, sheetName);
}

/**
 * Function: retrieveSecret
 * Description: Retrieves a secret from the Google Secret Manager.
 * Parameters:
 *   - secretName: The name of the secret to retrieve.
 * Returns:
 *   - The value of the secret, or null if retrieval fails.
 */
function retrieveSecret(secretName) {
    var projectId = 'your-project-id'; // Replace with your Google Cloud Project ID

    var response = UrlFetchApp.fetch('https://secretmanager.googleapis.com/v1/projects/' + projectId + '/secrets/' + secretName + '/versions/latest:access', {
        method: 'get',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
        }
    });

    if (response.getResponseCode() === 200) {
        var secretPayload = JSON.parse(response.getContentText()).payload.data;
        return Utilities.newBlob(Utilities.base64Decode(secretPayload)).getDataAsString();
    } else {
        console.error('Failed to retrieve secret: ' + response.getContentText());
        return null;
    }
}
