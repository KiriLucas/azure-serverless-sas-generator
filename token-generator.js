const crypto = require('crypto');

const sbOccurence = 'sb://'
const netOccurence = '.net'
const sharedAccessKeyOccurence = ';SharedAccessKey='

function createSASToken(saName, saKey, uri) {
    let encoded = encodeURIComponent(uri);
    let ttl = 9999999999
    let signature = encoded + '\n' + ttl;
    let signatureUTF8 = Buffer.from(signature, 'utf-8').toString();
    let hash = crypto.createHmac('sha256', saKey).update(signatureUTF8).digest('base64');
    return 'SharedAccessSignature sr=' + encoded + '&sig=' +
        encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + saName;
}

module.exports = async function (context, req) {

    const connectionString = req.body.connectionString
    const saName = req.body.saName

    const uri = connectionString.slice(connectionString.indexOf(sbOccurence) + sbOccurence.length, connectionString.indexOf(netOccurence) + netOccurence.length)
    const saKey = connectionString.slice(connectionString.lastIndexOf(';SharedAccessKey=') + sharedAccessKeyOccurence.length)

    context.res = {
        body: createSASToken(saName, saKey, uri)
    };
}