export default function ThrowError(response = '') {
    console.log('response', response)
    throw new Error(response);
}
