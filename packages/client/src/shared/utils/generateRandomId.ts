export function generateRandomId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);

    const randomId = `${timestamp}-${random}`;
    return randomId;
}