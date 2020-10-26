import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return (acc = acc + curr.population);
    }, 0);
    return totalPopulation;
  };

  handleChangeFilter = (newText) => {
    const { allCountries } = this.state;
    const filterLowerCase = newText.toLowerCase();

    this.setState({
      filter: newText,
    });
    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(
      filteredCountries
    );

    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  };

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;
    return (
      <div className="container">
        <h3 style={styles.centeredTitle}>React Countries</h3>
        <Header
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
