
class Streams {

    static isValidStream = (stream) => {
        if (!stream || !stream.readable) {
            return null;
        } else return true;
    };

    static toArray = (stream) => {
        return new Promise((resolve, reject) => {
            if (!Streams.isValidStream(stream)) {
                reject(new Error('Either Stream Ended or not valid Stream'));
            }
            let array = [];
            stream.on('data', (chunk) => {
                array.push(chunk);
            });
            stream.on('end', () => {
                resolve(array);
            });
            stream.on('error', reject);
            stream.on('close', () => {
                resolve(array);
            });
        });
    };

    static toBuffer(stream) {
        return Streams.toArray(stream)
            .then((array) => {
                return Buffer.concat(array);
            });
    };

}

module.exports.Streams = Streams;
