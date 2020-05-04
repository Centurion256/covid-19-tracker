import {NovelCovid} from 'novelcovid';

const track = new NovelCovid();

export async function getCountryData(country) {
    
    try {

        const response = await track.countries(country);
        console.log(response)
        if (response.message === "Country not found or doesn't have any cases")
        {
            throw response.message;
        }
        let res = { //TEMP
            cases: response.cases,
            recovered: response.recovered,
            deaths: response.deaths,
            tests: response.tests,
            todayCases: response.todayCases,
            todayDeaths: response.todayDeaths
        }; 
        let restructuredResponse = { //TEMP, until rankings are added and the fetch request rewritten.
            covidinfo: {
                cases: {title: "Total Cases", number: res.cases, ranking: null, daily: res.todayCases},
                recovered: {title: "Recovered", number: res.recovered, ranking: null, daily: null},
                deaths: {title: "Died", number: res.deaths, ranking: null, daily: res.todayDeaths},
                tests: {title: "Tests", number: res.tests, ranking: null, daily: null},
                mortality: {title: "Mortality", number: res.cases > 0 ? (100*res.deaths/res.cases).toFixed(2)+'%': "N/A", ranking: null, daily: (res.todayCases > 0 && res.cases > 0) ? `${(100*(res.todayDeaths/res.todayCases)- 100*(res.deaths/res.cases)).toFixed(2)}%` : null},
                testrate: {title: "Positive Tests", number: res.cases > 0 ? (100*res.cases/res.tests).toFixed(2)+'%' : "N/A", ranking: null, daily: null}
            },
            country: response.country,
            countryIcon: response.countryInfo.flag 
        };
        return restructuredResponse;

    } catch (reason) {
        
        console.log(`The reason is: ${reason}`);
        return null;
    }

    
};

export async function getGlobalData() {
    
    try {

        const response = await track.countries();
        console.log(response);
        let res = response.reduce((x, y) => {return {cases: x.cases + y.cases, 
                                                     recovered: x.recovered + y.recovered, 
                                                     deaths: x.deaths + y.deaths, 
                                                     tests: x.tests + y.tests,
                                                     todayCases: x.todayCases + y.todayCases,
                                                     todayRecovered: x.todayRecovered + y.todayRecovered,
                                                     todayDeaths: x.todayDeaths + y.todayDeaths}})
        console.log(res);
        let restructuredResponse = {
            covidinfo: {
                cases: {title: "Total Cases", number: res.cases, ranking: null, daily: res.todayCases},
                recovered: {title: "Recovered", number: res.recovered, ranking: null, daily: null},
                deaths: {title: "Died", number: res.deaths, ranking: null, daily: res.todayDeaths},
                tests: {title: "Tests", number: res.tests, ranking: null, daily: null},
                mortality: {title: "Mortality", number: res.cases > 0 ? (100*res.deaths/res.cases).toFixed(2)+'%': "N/A", ranking: null, daily: (res.todayCases > 0 && res.cases > 0) ? `${(100*(res.todayDeaths/res.todayCases)- 100*(res.deaths/res.cases)).toFixed(2)}%` : null},
                testrate: {title: "Positive Tests", number: res.cases > 0 ? (100*res.cases/res.tests).toFixed(2)+'%' : "N/A", ranking: null, daily: null}
            }
        };
        return restructuredResponse;

    } catch (reason) {
        
        console.log(`The reason is: ${reason}`);
        return null;
    }

    
};