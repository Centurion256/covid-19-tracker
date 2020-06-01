//SELECT country, countryIcon, covidinfo FROM countries WHERE country ILIKE '%countryName%; -- SQL analogy.
export function selectCountriesLike(countryName, { countries }) {
    countryName = countryName.toLowerCase();
    if (
        countryName === "" ||
        countryName === "global" ||
        countryName === "world"
    ) {
        return countries;
    }
    return countries.filter(
        (entry) =>
            entry.country.toLowerCase().startsWith(countryName) ||
            entry.iso2.toLowerCase().startsWith(countryName) ||
            entry.iso3.toLowerCase().startsWith(countryName)
    );
}

export function selectClosestMatch(countryName, { countries, global }) {
    
    if (
        countryName === "" ||
        countryName === "global" ||
        countryName === "world"
    ) {
        return global;
    }
    let match;
    for (let entry of countries) {
        if (
            entry.country.toLowerCase() === countryName ||
            entry.iso2.toLowerCase() === countryName ||
            entry.iso3.toLowerCase() === countryName
        ) {
            return entry;
        } else if (
            entry.country.toLowerCase().startsWith(countryName) ||
            entry.iso2.toLowerCase().startsWith(countryName) ||
            entry.iso3.toLowerCase().startsWith(countryName)
        ) {
            match = entry;
        }
    }
    return match;
}
