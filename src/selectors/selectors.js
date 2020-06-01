import { createSelector } from 'reselect';

//SELECT country, countryIcon, covidinfo FROM countries WHERE country ILIKE '%countryName%; -- SQL analogy.
export function selectCountriesLike(countryName, countries) {
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
    
    if (    //two additional checks redundant, but for the sake of brewity/compatibility, they're kept
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

export const singleCountrySelector = createSelector(
    (state, props) => ("country" in props.match.params && ["world", "global"].indexOf(props.match.params.country) <= -1) ? props.match.params.country : "global",
    (state) => state.data,
    (country, data) => selectClosestMatch(country, data)
)

export const similarCountriesSelector = createSelector(
    (state, props) => ("country" in props.match.params && ["world", "global"].indexOf(props.match.params.country) <= -1) ? props.match.params.country : "global",
    (state) => state.data.countries,
    (country, data) => selectCountriesLike(country, data)
)
