/**
 * This Google Apps Script refreshes access tokens for accessing secure endpoints.
 * It retrieves sensitive data such as client ID, client secret, and refresh token 
 * from the Google Secret Manager. The script then uses this data to obtain a new 
 * access token by making a POST request to a secure endpoint. The new access token 
 * is then stored in the Google Secret Manager for future use.
 * 
 * Usage:
 * 1. Set up a Google Apps Script project.
 * 2. Run the refreshToken() function at regular intervals (e.g., every hour) 
 *    using Google Apps Script triggers. This ensures that access tokens are 
 *    automatically refreshed when needed.
 */

// Function to refresh access tokens
function refreshToken() {
    // Retrieve sensitive data from Google Secret Manager
    var myobClientId = retrieveSecret('myob_client_id');
    var myobClientSecret = retrieveSecret('myob_client_secret');
    var myobRefreshToken = retrieveSecret('myob_refresh_token');
    
    // Construct form data
    var formData = {
      'client_id': myobClientId,
      'client_secret': myobClientSecret,
      'grant_type': 'refresh_token',
      'refresh_token' : myobRefreshToken
    };
    
    var options =
    {
      "method" : "post",
      "contentType" : "application/x-www-form-urlencoded",
      "payload" : formData
    };
    
    // Fetch access token from secure endpoint
    var responseText = UrlFetchApp.fetch("https://secure.myob.com/oauth2/v1/authorize/", options).getContentText();
    
    // Parse response JSON
    var obj = JSON.parse(responseText);
    
    // Store access token in Google Secret Manager
    saveSecret('myob_access_token', obj.access_token);
    
    // Optionally, if you still want to use the access token directly with "Bearer" prefix:
    var accessTokenWithBearer = "Bearer " + obj.access_token;
    saveSecret('myob_access_token_with_bearer', accessTokenWithBearer);
  }
  
  // Function to retrieve a secret from Google Secret Manager
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
      Logger.log('Failed to retrieve secret: ' + response.getContentText());
      return null;
    }
  }
  