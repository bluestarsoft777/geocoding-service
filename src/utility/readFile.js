export function readJSON(jsonFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = event => {
            try {
                const jsonContent = JSON.parse(reader.result);
                resolve(jsonContent);
            } catch (err) {
                reject('JSON file seems malformed.');
            }
        };

        reader.onerror = error => {
            console.error(error);
            reject("File couldn't be read");
        };

        reader.readAsText(jsonFile);
    });
}
