// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import states from './bafa-request-states.mjs';

/**
 * String with base URL of BAFA user portal API.
 */
const apiBaseUrl = 'https://fms.portal.bafa.de/BafaUserPortal/portal';

/**
 * Gets authentication token with Base64-encoded ASCII string by credentials.
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
 * @param {object} credentials The object with email and password or token.
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

    const auth = credentials.token || getAuth(credentials);
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
 * Attaches descriptions of request states by key and language.
 * 
 * @param {object} result The result object with data.
 * @param {string} lang The language of states.
 * @returns The result object.
 */
const attachRequestStatesByKey = (result, lang) => {
    const data = result.data;

    if (data && data.count) {
        const values = states[lang] || states['en'];

        const requests = data.data?.map(request => {
            const { status } = request;

            request.status = {
                key: status,
                description: values[status]
            };

            return request;
        });

        if (requests) {
            result.data.data = requests;
        }
    }

    return result;
};

/**
 * Gets list with requests by credentials and options.
 * 
 * @param {object} credentials The object with email and password or token.
 * @param {object} options The optional object with additional options.
 * @returns Object with count and data.
 */
const getRequests = async (credentials, options) => {
    const { filter, lang, paging, sort } = options || {};
    const { pageNumber, pageSize } = paging || {};

    const result = await fetchJson('antraege/search', credentials, {
        'role': 'ANTRAGSTELLER',
        'antragsdatumFrom': null,
        'antragsdatumTo': null,
        'filter': filter || '',
        'sortBy': 'antragsdatum',
        'sortOrder': sort || 'desc',
        'pageNumber': pageNumber || 0,
        'pageSize': pageSize || 10
    });

    return attachRequestStatesByKey(result, lang);
};

/**
 * Exports object with constants and functions.
 */
export {
    getAuth,
    getRequests,
    states
};
