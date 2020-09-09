const Translator = class {
    constructor(from, to, key) {
        this.from = from;

        this.to = to;

        this.key = key;
    }

    translate(contents) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${this.key}`;

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                source: this.from || undefined,
                target: this.to,
                q: contents
            })
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(result =>
                result.data.translations.map(
                    translation => translation.translatedText
                )
            );
    }
};

export default Translator;