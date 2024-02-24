# Google Apps Script for MYOB Integration

This repository contains Google Apps Script files for integrating with MYOB (Mind Your Own Business) accounting software. The scripts automate tasks such as refreshing access tokens, fetching data from MYOB's API, and parsing JSON responses into Google Sheets.

## Contents

- [Scripts](#scripts)
- [Usage](#usage)
- [Setup](#setup)
- [Contributing](#contributing)
- [License](#license)

## Scripts

1. **refreshTokens.js**: This script refreshes access tokens for accessing secure MYOB endpoints. It retrieves sensitive data such as the client ID, client secret, and refresh token from the Google Secret Manager and updates the access token accordingly.

2. **fetchPayrollAdvice.js**: This script fetches payroll advice data from the MYOB API and parses it into a Google Sheet. You can customize the URL of the API endpoint to fetch different types of data.

3. **fetchDataFromAPI.js**: A generic script to fetch data from various API endpoints and parse it into Google Sheets. This script can be modified with different endpoint URLs and data parsing logic as needed.

4. **parse_JSON_Data_to_GoogleSheets.js**: This script provides functions to parse JSON data and insert it into a Google Sheet. It's used by the `fetchPayrollAdvice.js` and `fetchDataFromAPI.js` scripts to parse API responses.

5. **myob_SetPropertyValues.js**: A script to set initial property values in the Google Apps Script project. It's typically used to store client IDs, client secrets, and other configuration data.

6. **myob_RefreshTokens.js**: This script is used to refresh access tokens for MYOB API integration. It's a standalone version of `refreshTokens.js` and can be run manually or via triggers.

## Usage

To use these scripts:

1. Copy the contents of each script into your Google Apps Script project.
2. Set up your Google Secret Manager to store sensitive data like client IDs, client secrets, and refresh tokens.
3. Configure the scripts with your MYOB API credentials, endpoint URLs, and any specific data parsing logic.
4. Set up triggers to automatically run the `refreshToken()` function at regular intervals.
5. Use the provided functions to fetch data from the MYOB API and parse it into Google Sheets.

## Setup

1. **Google Apps Script Project**:
   - Create a new Google Apps Script project in your Google Drive.
   - Copy the contents of each script into separate files in your project.

2. **Google Secret Manager**:
   - Set up Google Secret Manager in your Google Cloud Platform (GCP) project.
   - Store sensitive data like client IDs, client secrets, and refresh tokens securely in the Secret Manager.

3. **Configuration**:
   - Update the scripts with your MYOB API credentials, endpoint URLs, and any specific data parsing logic required for your use case.
   - Ensure that the Google Apps Script project has the necessary permissions to access the Secret Manager.

4. **Triggers**:
   - Set up triggers in Google Apps Script to automatically run the `refreshToken()` function at regular intervals (e.g., every hour).

## Contributing

Contributions to improve or extend these scripts are welcome! Please feel free to submit pull requests with enhancements, bug fixes, or additional features.

## License

This project is licensed under the [MIT License](LICENSE).
