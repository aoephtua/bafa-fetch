// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { getRequests } from './bafa-fetch.mjs';

/**
 * Ouputs message to the console.
 */
const log = console.log;

/**
 * Gets requests by credentials.
 */
const { data, status, error } = await getRequests({
    email: 'someone@example.com',
    password: '****'
}, {
    lang: 'de'
});

/**
 * Validates HTTP status, iterates over requests and sets status descriptions.
 * Otherwise outputs error message or HTTP status.
 */
if (status === 200) {
    for (const request of data.data) {
        log(request);
    }
} else {
    log(error?.message || status);
}
