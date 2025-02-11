export function isValidEmail(email: string): boolean {
    if (!email  || email.trim() === "") {
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isValidURL = (input: string) => {
    if(!input || input.trim()==="") return false

    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + 
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" + 
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + 
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + 
        "(\\#[-a-zA-Z\\d_]*)?$", 
        "i"
    );
    return urlPattern.test(input);
};