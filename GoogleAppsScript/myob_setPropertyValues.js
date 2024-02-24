/**
 * This Google Apps Script initializes and saves initial values of properties 
 * in the script project. These properties can include sensitive data such as 
 * client ID, client secret, refresh token, etc.
 * 
 * Usage:
 * 1. Set up a Google Apps Script project.
 * 2. Run the saveInitialPropertyValues() function to save the initial values 
 *    of properties in the Google Secret Manager.
 * 3. Retrieve the Google Cloud Project ID from the Google Cloud Console:
 *    - Open the Google Cloud Console: https://console.cloud.google.com
 *    - Select your project from the project selector dropdown at the top.
 *    - The Project ID is displayed under the project name.
 */

// Function to initialize and save initial values of properties
function saveInitialPropertyValues() {
    // Set initial values of properties for each app
    
    // For MYOB app
    var myobClientId = 'your_myob_client_id';
    var myobClientSecret = 'your_myob_client_secret';
    var myobRefreshToken = 'your_myob_refresh_token';
    var myobSpreadsheetId = 'your_myob_spreadsheet_id';
    
    // Save initial values of properties for each app
    
    // For MYOB app
    saveSecret('myob_client_id', myobClientId);
    saveSecret('myob_client_secret', myobClientSecret);
    saveSecret('myob_refresh_token', myobRefreshToken);
    saveSecret('myob_spreadsheet_id', myobSpreadsheetId);
    
    // Add properties for other apps as needed
  }
  
  // Function to save a secret in Google Secret Manager
  function saveSecret(secretName, secretValue) {
    var projectId = 'your-project-id'; // Replace with your Google Cloud Project ID
    var versionId = 'latest'; // Use 'latest' to always retrieve the latest version of the secret
    
    var payload = {
      'name': 'projects/' + projectId + '/secrets/' + secretName + '/versions/' + versionId,
      'payload': {
        'data': Utilities.base64Encode(secretValue)
      }
    };
    
    var response = UrlFetchApp.fetch('https://secretmanager.googleapis.com/v1/projects/' + projectId + '/secrets/' + secretName + ':addVersion', {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      },
      payload: JSON.stringify(payload)
    });
    
    if (response.getResponseCode() !== 200) {
      Logger.log('Failed to save secret: ' + response.getContentText());
    }
  }
  