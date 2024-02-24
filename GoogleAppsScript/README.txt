# Google Apps Script for MYOB Refresh Tokens and Property Management

## Introduction

This repository contains Google Apps Script code for securely managing MYOB refresh tokens and other sensitive properties within a Google Apps Script project. The scripts utilize Google Secret Manager for secure storage and retrieval of sensitive data.

## Scripts

### Script 1: `myob_RefreshTokens.gs`

This script initializes and saves the initial values of MYOB refresh tokens in the Google Secret Manager. It provides functions to securely manage MYOB refresh tokens and other sensitive properties.

#### Usage:
1. Set up a Google Apps Script project.
2. Run the `saveInitialPropertyValues()` function from the `myob_RefreshTokens.gs` script to save the initial values of MYOB refresh tokens in the Google Secret Manager.
3. Retrieve the Google Cloud Project ID from the Google Cloud Console and replace `'your-project-id'` in the script with the actual Project ID.
4. Add your MYOB refresh token directly in the script.
5. After running the script and saving the initial values, consider deleting this script to prevent exposing sensitive data.

### Script 2: `myob_SetPropertyValues.js`

This script refreshes access tokens for accessing MYOB secure endpoints. It retrieves MYOB client ID, client secret, and refresh token from the Google Secret Manager. The script then uses this data to obtain a new access token by making a POST request to a secure endpoint. The new access token is then stored in the Google Secret Manager for future use.

#### Usage:
1. Set up a Google Apps Script project.
2. Run the `refreshToken()` function from the `myob_SetPropertyValues.js` script at regular intervals (e.g., every hour) using Google Apps Script triggers. This ensures that access tokens are automatically refreshed when needed.
3. Make sure to retrieve the Google Cloud Project ID from the Google Cloud Console and replace `'your-project-id'` in the script with the actual Project ID.

## Security Considerations

- Ensure that only authorized individuals have access to the Google Cloud Project and Secret Manager.
- Regularly review and update the access controls and permissions for the Secret Manager.
- Follow secure development practices to minimize the exposure of sensitive data.

## License

This project is licensed under the [MIT License](LICENSE).

