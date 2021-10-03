import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Tabla";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tablaData, setTablaData] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  console.log(tablaData)

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
            image: country.countryInfo.flag,
          }));

          const sortedData = sortData(data);
          setTablaData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variable="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value={"worldwide"}>Paises infectados </MenuItem>
              {countries.map(({ value, name, iso3, image }) => (
                <MenuItem key={name} value={value}>
                  <h3>{name}</h3>
                  <img width="50px" src={image} alt={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Casos de coronavirus"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
          />
          <InfoBox
            title="Recuperado/as"
            cases={countryInfo?.todayRecovered}
            total={countryInfo?.recovered}
          />
          <InfoBox
            title="Fallecido/as"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
          />
        </div>
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Casos vivos por país</h3>
          <Table countries={tablaData} />
          <h3>Casos nuevos en todo el mundo</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
