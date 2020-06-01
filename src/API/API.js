import { NovelCovid } from "novelcovid";

const track = new NovelCovid();
const WORLD_POPULATION = 7_784_000_000; //Approximately the world population now. Should be constant for the sake of this program.

export async function getCountryData(country) {
    try {
        const response = await track.countries(country); //unfortunately, has to fetch all countries even if one is needed to find the ranking
        if (
            response.message === "Country not found or doesn't have any cases"
        ) {
            throw response.message;
        }
        let res = {
            //TEMP
            cases: response.cases,
            recovered: response.recovered,
            deaths: response.deaths,
            casesPerOneMillion: response.casesPerOneMillion,
            testsPerOneMillion: response.testsPerOneMillion,
            tests: response.tests,
            todayCases: response.todayCases,
            todayDeaths: response.todayDeaths,
        };
        let restructuredResponse = {
            //TEMP, until rankings are added and the fetch request rewritten.
            covidinfo: {
                cases: {
                    title: "Total Cases",
                    number: res.cases,
                    ranking: null,
                    daily: (res.todayCases > 0 && "+") + res.todayCases,
                },
                recovered: {
                    title: "Recovered",
                    number: res.recovered,
                    ranking: null,
                    daily: null,
                },
                deaths: {
                    title: "Died",
                    number: res.deaths,
                    ranking: null,
                    daily: (res.todayDeaths > 0 && "+") + res.todayDeaths,
                },
                casesPerOneMillion: {
                    title: "Cases per million",
                    number: res.casesPerOneMillion,
                    ranking: null,
                    daily: null,
                },
                recoverate: {
                    title: "Recovery rate",
                    number:
                        res.cases > 0
                            ? ((100 * res.recovered) / res.cases).toFixed(2) +
                              "%"
                            : null,
                },
                mortality: {
                    title: "Mortality",
                    number:
                        res.cases > 0
                            ? ((100 * res.deaths) / res.cases).toFixed(2) + "%"
                            : "N/A",
                    ranking: null,
                    daily: null,
                },
                tests: {
                    title: "Tests",
                    number: res.tests,
                    ranking: null,
                    daily: null,
                },
                testsPerOneMillion: {
                    title: "Tests per million",
                    number: res.testsPerOneMillion,
                    ranking: null,
                    daily: null,
                },
                testrate: {
                    title: "Positive Tests",
                    number:
                        res.cases > 0
                            ? ((100 * res.cases) / res.tests).toFixed(2) + "%"
                            : "N/A",
                    ranking: null,
                    daily: null,
                },
            },
            country: response.country,
            countryIcon: response.countryInfo.flag,
        };
        return restructuredResponse;
    } catch (reason) {
        console.log(`The reason is: ${reason}`);
        return null;
    }
}

export async function getEachCountryData(country) {
    try {
        const response = await track.countries();
        let result = [];
        for (let entry of response) {
            if (entry.country.toLowerCase().startsWith(country.toLowerCase())) {
                result.push({
                    covidinfo: {
                        cases: {
                            title: "Total Cases",
                            number: entry.cases,
                            ranking: null,
                            daily: null,
                        },
                        recovered: {
                            title: "Recovered",
                            number: entry.recovered,
                            ranking: null,
                            daily: null,
                        },
                        deaths: {
                            title: "Died",
                            number: entry.deaths,
                            ranking: null,
                            daily: null,
                        },
                        casesPerOneMillion: {
                            title: "Cases per million",
                            number: entry.casesPerOneMillion,
                            ranking: null,
                            daily: null,
                        },
                        recoverate: {
                            title: "Recovery rate",
                            number:
                                entry.cases > 0
                                    ? (
                                          (100 * entry.recovered) /
                                          entry.cases
                                      ).toFixed(2) + "%"
                                    : null,
                        },
                        mortality: {
                            title: "Mortality",
                            number:
                                entry.cases > 0
                                    ? (
                                          (100 * entry.deaths) /
                                          entry.cases
                                      ).toFixed(2) + "%"
                                    : "N/A",
                            ranking: null,
                            daily: null,
                        },
                        tests: {
                            title: "Tests",
                            number: entry.tests,
                            ranking: null,
                            daily: null,
                        },
                        testsPerOneMillion: {
                            title: "Tests per million",
                            number: entry.testsPerOneMillion,
                            ranking: null,
                            daily: null,
                        },
                        testrate: {
                            title: "Positive Tests",
                            number:
                                entry.cases > 0
                                    ? (
                                          (100 * entry.cases) /
                                          entry.tests
                                      ).toFixed(2) + "%"
                                    : "N/A",
                            ranking: null,
                            daily: null,
                        },
                    },
                    country: entry.country,
                    iso2: entry.countryInfo.iso2 || "",
                    iso3: entry.countryInfo.iso3 || "",
                    countryIcon: entry.countryInfo.flag,
                });
            }
        }
        if (result.length === 0) {
            throw new Error("No match");
        }
        return result;
    } catch (reason) {
        console.log(`The reason is: ${reason}`);
        return null;
    }
}

export async function getGlobalData() {
    try {
        const response = await track.countries();
        let res = response.reduce((x, y) => ({
            cases: x.cases + y.cases,
            recovered: x.recovered + y.recovered,
            deaths: x.deaths + y.deaths,
            casesPerOneMillion: x.casesPerOneMillion + y.casesPerOneMillion,
            testsPerOneMillion: x.testsPerOneMillion + y.testsPerOneMillion,
            tests: x.tests + y.tests,
            todayCases: x.todayCases + y.todayCases,
            todayDeaths: x.todayDeaths + y.todayDeaths,
        }));
        let restructuredResponse = {
            covidinfo: {
                cases: {
                    title: "Total Cases",
                    number: res.cases,
                    ranking: null,
                    daily: (res.todayCases > 0 && "+") + res.todayCases,
                },
                recovered: {
                    title: "Recovered",
                    number: res.recovered,
                    ranking: null,
                    daily: null,
                },
                deaths: {
                    title: "Died",
                    number: res.deaths,
                    ranking: null,
                    daily: (res.todayDeaths > 0 && "+") + res.todayDeaths,
                },
                casesPerOneMillion: {
                    title: "Cases per million",
                    number: (
                        (100_000_0 * res.cases) /
                        WORLD_POPULATION
                    ).toFixed(0),
                    ranking: null,
                    daily: null,
                },
                recoverate: {
                    title: "Recovery rate",
                    number:
                        res.cases > 0
                            ? ((100 * res.recovered) / res.cases).toFixed(2) +
                              "%"
                            : null,
                },
                mortality: {
                    title: "Mortality",
                    number:
                        res.cases > 0
                            ? ((100 * res.deaths) / res.cases).toFixed(2) + "%"
                            : "N/A",
                    ranking: null,
                    daily: null,
                },
                tests: {
                    title: "Tests",
                    number: res.tests,
                    ranking: null,
                    daily: null,
                },
                testsPerOneMillion: {
                    title: "Tests per million",
                    number: (
                        (100_000_0 * res.tests) /
                        WORLD_POPULATION
                    ).toFixed(0),
                    ranking: null,
                    daily: null,
                },
                testrate: {
                    title: "Positive Tests",
                    number:
                        res.cases > 0
                            ? ((100 * res.cases) / res.tests).toFixed(2) + "%"
                            : "N/A",
                    ranking: null,
                    daily: null,
                },
            },
        };
        return restructuredResponse;
    } catch (reason) {
        console.log(`The reason is: ${reason}`);
        return null;
    }
}

export async function getEachCountryAndGlobal(country) {
    return {
        countries: await getEachCountryData(country),
        global: await getGlobalData(),
    };
}
