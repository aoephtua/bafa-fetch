/**
 * Source: https://fms.portal.bafa.de/main.js
 */

/**
 * German key-value pairs with descriptions of BAFA requests.
 */
const de = {
    '1': 'Eingegangen',
    '2': 'In Bearbeitung',
    '3': 'Genehmigt',
    '4': 'VN eingegangen',
    '5': 'VN in Bearbeitung',
    '6': 'Ausgezahlt',
    'A': 'Abgeschlossen',
    'B': 'Abgelehnt',
    'C': 'ZWB aufgehoben',
    'D': 'Klageverfahren',
    'R': 'Rueckforderung',
    'W': 'Widerspruch',
    'X': 'Widerspruchsbescheid'
};

/**
 * English key-value pairs with descriptions of BAFA requests.
 */
const en = {
    '1': 'Received',
    '2': 'In Progress',
    '3': 'Approved',
    '4': 'Proof of use received',
    '5': 'Proof of use in progress',
    '6': 'Paid off',
    'A': 'Completed',
    'B': 'Rejected',
    'C': 'Grant notice revoked',
    'D': 'Litigation',
    'R': 'Reclaim',
    'W': 'Contradiction',
    'X': 'Notice of objection'
};

/**
 * Exports objects with requests states.
 */
export default { de, en };
