export function encodeUTF8(str:string) {
    const hex = Buffer.from(str, 'utf8').toString('hex');
    return hex.replace(/[0-9]/g, (digit) => String.fromCharCode(97 + parseInt(digit))); 
}

export function decodeUTF8(hex:string) {
    const originalHex = hex.replace(/[a-j]/g, (char) => (char.charCodeAt(0) - 97).toString());
    return Buffer.from(originalHex, 'hex').toString('utf8');
}