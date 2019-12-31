const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get('http://www.apilayer.net/api/live?access_key=e9157c9f1544996658d40f1302696872');

      const rate = response.data.quotes;
      const baseCurrency = response.data.source;
      const usd = 1 / rate[`${baseCurrency}${fromCurrency}`];
      const exchangeRate = usd * rate[`${baseCurrency}${toCurrency}`];
  
      return exchangeRate;
    } catch (error) {
      throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
      const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  
      return response.data.map(country => country.name);
    } catch (error) {
      throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

/*async function step3 (fromCurrency, toCurrency, amount = +document.getElementById('number').value) {

}*/

async function calculate () {
	let fromCurrency = document.getElementById(`from`).value;
	let toCurrency = document.getElementById(`to`).value;
	let amount = +document.getElementById(`number`).value;

	let exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
	let countries = await getCountries(toCurrency);
	let convertedAmount = (amount * exchangeRate).toFixed(2);

	let result = `${amount} ${fromCurrency} is worth ${convertedAmount}  ${toCurrency}. You can spend these in the following countries: ${countries}`;
	document.getElementById('output').innerHTML = result;
}