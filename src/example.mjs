// Copyright (c) 2023, Thorsten A. Weintz. All rights reserved.
// Licensed under the MIT license. See LICENSE in the project root for license information.

import { getRequests, states } from './bafa-fetch.mjs';

/**
 * Ouputs message to the web console.
 */
const log = console.log;

/**
 * Gets requests by credentials.
 */
const { data, status, error } = await getRequests({
    email: 'someone@example.com',
    password: '****'
});

/**
 * Validates HTTP status, iterates over requests and sets status descriptions.
 * Otherwise outputs error message.
 */
if (status === 200) {
    for (const request of data.data) {
        const { status } = request;

        request.status = {
            key: status,
            description: states.de[status]
        };

        log(request);
    }
} else {
    log(error?.message || status);
}
