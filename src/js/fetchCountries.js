


const BASE_URL = `https://restcountries.com/v3.1/name/`

export function fetchCountries(countryName) {

    const url = `${BASE_URL}${countryName}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            // console.log(response);
        });
    // .catch(error => Notify.failure(error));
  // console.log(url);
}
