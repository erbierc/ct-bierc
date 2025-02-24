// Pobieranie cytatów z API. Żeby uniknąć ciągłego pobierania cytatów, jeden zawsze będzie w localStorage.
// W prawdziwej aplikacji dodałabym jeszcze limit czasowy, żeby nie był to tylko jeden cytat.
export async function fetchQuote() {
    const storage = localStorage.getItem('quote');
    if (storage) return JSON.parse(storage)
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": import.meta.env.VITE_API_KEY }
    });

    const data = await response.json();
    localStorage.setItem('quote', JSON.stringify(data[0]))
    return data[0];
}
