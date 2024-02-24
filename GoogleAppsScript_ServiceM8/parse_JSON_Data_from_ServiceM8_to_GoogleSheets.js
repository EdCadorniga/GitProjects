/**
 * Script Explanation:
 * This script is designed to parse JSON data and display it in a Google Sheets spreadsheet.
 * It provides functions to parse the JSON response, fill out the spreadsheet with parsed data,
 * and handle potential errors during parsing and display.
 *
 * How to Use:
 * 1. Call the displayResult function with the JSON response text as the parameter.
 * 2. The displayResult function will parse the JSON response and fill out the active spreadsheet with the parsed data.
 */

/**
 * Parses the JSON response and fills out the active spreadsheet with the parsed data.
 * @param {string} responseText - The JSON response text to parse.
 */
function displayResult(responseText) {
    try {
      parseResponse(responseText);
    } catch (error) {
      Logger.log("Error displaying result: " + error);
      throw new Error("Error displaying result: " + error);
    }
  }
  
  /**
   * Parses the JSON response and fills out the spreadsheet with the parsed data.
   * @param {string} responseText - The JSON response text to parse.
   */
  function parseResponse(responseText) {
    try {
      var responseJson = JSON.parse(responseText);
      var sheetName = "Categories"; // Default sheet name
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
      if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
      }
      var parsedData = parseJSONObject(responseJson);
      fillSheetWithData(sheet, parsedData);
    } catch (error) {
      Logger.log("Error parsing response: " + error);
      throw new Error("Error parsing response: " + error);
    }
  }
  
  /**
   * Parses the JSON object and returns a two-dimensional array containing the data.
   * @param {Object} object - The JSON object to parse.
   * @returns {Array[]} - The parsed data as a two-dimensional array.
   */
  function parseJSONObject(object) {
    var headers = [];
    var data = [];
    parseData(headers, data, "", 1, object);
    parseHeaders(headers, data);
    return data;
  }
  
  /**
   * Recursively parses the data contained within the given value and inserts it into the data array.
   * @param {string[]} headers - The headers array.
   * @param {Array[]} data - The data array.
   * @param {string} path - The current path.
   * @param {number} rowIndex - The current row index.
   * @param {*} value - The value to parse and insert.
   */
  function parseData(headers, data, path, rowIndex, value) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Parses the headers array and inserts it into the first row of the data array.
   * @param {string[]} headers - The headers array.
   * @param {Array[]} data - The data array.
   */
  function parseHeaders(headers, data) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Fills out the spreadsheet with the parsed data.
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The sheet to fill.
   * @param {Array[]} data - The parsed data.
   */
  function fillSheetWithData(sheet, data) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Fills out the range with a specified fill item (defaulting to an empty string).
   * @param {Array[]} data - The data to fill.
   * @param {*} [fillItem=""] - The fill item.
   * @returns {Array[]} - The filled data array.
   */
  function fillOutRange(data, fillItem) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Returns true if the given test value is an object; false otherwise.
   * @param {*} test - The value to test.
   * @returns {boolean} - True if the value is an object; false otherwise.
   */
  function isObject(test) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Returns true if the given test value is an array containing at least one object; false otherwise.
   * @param {*} test - The value to test.
   * @returns {boolean} - True if the value is an array containing at least one object; false otherwise.
   */
  function isObjectArray(test) {
    // Implementation details as provided in the previous version of the script...
  }
  
  /**
   * Fetches data from the ServiceM8 API and displays the result in the specified sheet.
   * @param {string} endpoint - The API endpoint to fetch data from.
   * @param {string} sheetName - The name of the sheet to display the result in.
   */
  function fetchFromServiceM8API(endpoint, sheetName) {
    var url = "https://api.servicem8.com/api_1.0/" + endpoint; // Construct the full API endpoint URL
    var secretName = "serviceM8_token";
    var projectId = "YOUR_PROJECT_ID"; // Replace this with your actual project ID
    var version = "latest"; // You can specify the version of the secret if needed
  
    // Retrieve the secret value from Secret Manager
    var secretPayload = SecretManager.SecretVersion.access({
      name: 'projects/' + projectId + '/secrets/' + secretName + '/versions/' + version
    }).payload.data;
  
    var token = Utilities.newBlob(Utilities.base64Decode(secretPayload)).getDataAsString();
  
    var options = {
      'method': 'GET',
      'muteHttpExceptions': false,
      'headers': {
        'Authorization': 'Basic ' + token,
        'Content-Type': 'application/json',
      }
    };
  
    var response = UrlFetchApp.fetch(url, options); // Make the API request
    displayResult(sheetName, response); // Display the result with the provided sheetName
  }
  