/**
 * Function: parse_JSON_Data_to_GoogleSheets
 * Description: Parses JSON data and inserts it into a Google Sheet.
 * Parameters:
 *   - object: JSON object to parse.
 *   - query: Optional query to filter data.
 *   - options: Optional options for data parsing.
 * Returns:
 *   - Two-dimensional array containing the parsed data.
 */
function parse_JSON_Data_to_GoogleSheets(object, query, options) {
    var headers = [];
    var data = [];
    
    if (query && !Array.isArray(query) && query.toString().includes(",")) {
        query = query.toString().split(",");
    }

    if (options) {
        options = options.toString().split(",");
    }

    parseData(headers, data, "", { rowIndex: 1 }, object, query, options);
    parseHeaders(headers, data);
    transformData(data, options);

    return hasOption(options, "noHeaders") ? (data.length > 1 ? data.slice(1) : []) : data;
}

/** 
 * Parses the data contained within the given value and inserts it into the data two-dimensional array starting at the rowIndex. 
 */
function parseData(headers, data, path, state, value, query, options) {
    if (Array.isArray(value)) {
        value.forEach(function (item) {
            parseData(headers, data, path, state, item, query, options);
        });
    } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(function ([key, val]) {
            parseData(headers, data, path + "/" + key, state, val, query, options);
        });
    } else if (!query || includeXPath(query, path, options)) {
        if (!data[state.rowIndex]) {
            data[state.rowIndex] = [];
        }

        if (!headers[path] && headers[path] !== 0) {
            headers[path] = Object.keys(headers).length;
        }

        data[state.rowIndex][headers[path]] = value;
        state.rowIndex++;
    }
}

/** 
 * Parses the headers array and inserts it into the first row of the data array.
 */
function parseHeaders(headers, data) {
    data[0] = Object.keys(headers);
}

/** 
 * Applies the transform function for each element in the data array, going through each column of each row.
 */
function transformData(data, options) {
    data.forEach(function (row, rowIndex) {
        row.forEach(function (cell, colIndex) {
            row[colIndex] = defaultTransform(cell, rowIndex, colIndex, options);
        });
    });
}

/** 
 * Default transformation function to apply to each cell of the data array.
 */
function defaultTransform(cell, rowIndex, colIndex, options) {
    if (cell === null || rowIndex < 2 || hasOption(options, "noInherit")) {
        return "";
    }

    if (rowIndex === 0 && !hasOption(options, "rawHeaders")) {
        return toTitleCase(cell.toString().replace(/[\/\_]/g, " "));
    }

    if (!hasOption(options, "noTruncate")) {
        cell = cell.toString().substr(0, 256);
    }

    return cell;
}

/** 
 * Returns true if the given query applies to the given path. 
 */
function includeXPath(query, path, options) {
    if (!query) {
        return true;
    } else if (Array.isArray(query)) {
        return query.some(function (rule) {
            return applyXPathRule(rule, path, options);
        });
    } else {
        return applyXPathRule(query, path, options);
    }
}

/** 
 * Returns true if the rule applies to the given path. 
 */
function applyXPathRule(rule, path, options) {
    return path.indexOf(rule) === 0;
}

/** 
 * Converts the text to title case.
 */
function toTitleCase(text) {
    if (text === null) {
        return null;
    }

    return text.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
}

/** 
 * Returns true if the given set of options contains the given option.
 */
function hasOption(options, option) {
    return options && options.indexOf(option) >= 0;
}
