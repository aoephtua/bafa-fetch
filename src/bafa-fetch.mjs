// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import states from './bafa-request-states.mjs';

/**
 * String with base URL of BAFA user portal API.
 */
const apiBaseUrl = 'https://fms.portal.bafa.de/BafaUserPortal/portal';

/**
 * Gets authentiation token with Base64-encoded ASCII string by credentials.
 * 
 * @param {object} credentials The object with email and password.
 * @returns String with authentication token.
 */
const getAuth = ({ email, password }) => btoa(email + ':' + password);

/**
 * Gets string with the number of milliseconds for this date since the epoch.
 * 
 * @returns String with the token.
 */
const getToken = () => new Date().getTime() + '';

/**
 * Fetches JSON result by executing POST request.
 * 
 * @param {string} endpoint The endpoint path.
 * @param {object} credentials The object with email and password.
 * @param {object} data The data to be sent as the request body.
 * @returns Object with JSON result.
 */
const fetchJson = async (endpoint, credentials, data) => {
    if (!credentials) {
        return {
            error: {
                message: 'Credentials undefined'
            }
        };
    }

    const auth = getAuth(credentials);
    const token = getToken();

    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            headers: {
                'authorization': `Basic ${auth}`,
                'content-type': 'application/json; charset=UTF-8',
                'x-xsrf-token': token,
                'cookie': `XSRF-TOKEN=${token}`
            },
            body: JSON.stringify(data),
            method: 'POST'
        });
    
        const { status } = response;
    
        return {
            data: await response.json(),
            status
        };
    } catch (error) {
        return { error };
    }
};

/**
 * Gets list with requests by credentials and options.
 * 
 * @param {object} credentials The object with email and password.
 * @param {object} options The optional object with additional options.
 * @returns Object with count and data.
 */
const getRequests = async (credentials, options) => {
    const { filter, paging, sort } = options || {};
    const { pageNumber, pageSize } = paging || {};

    return fetchJson('antraege/search', credentials, {
        'role': 'ANTRAGSTELLER',
        'antragsdatumFrom': null,
        'antragsdatumTo': null,
        'filter': filter || '',
        'sortBy': 'antragsdatum',
        'sortOrder': sort || 'desc',
        'pageNumber': pageNumber || 0,
        'pageSize': pageSize || 10
    });
};

/**
 * Exports object with constants and functions.
 */
export {
    getRequests,
    states
};
