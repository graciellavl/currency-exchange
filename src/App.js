import "./App.css";
import { useState, useEffect } from "react";
import CurrencyCard from "./components/CurrencyCard";

function App() {
  // API Attributes
  const url = "http://api.exchangeratesapi.io/latest?access_key=";
  const symbolUrl = "http://api.exchangeratesapi.io/v1/symbols?access_key=";
  const access_key = "eeaf9380391e16e07f977896c4862ac9";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // Variable lists
  const [base, setBase] = useState({});
  const [value, setValue] = useState(10.0);
  const [show, setShow] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [symbol, setSymbol] = useState([]);
  const [result, setResult] = useState();

  const [defaultCurrency] = useState([
    "CAD",
    "IDR",
    "GBP",
    "CHF",
    "SGD",
    "INR",
    "MYR",
    "JPY",
    "KRW",
  ]);

  // Initial fetch
  useEffect(() => {
    getData();
    getValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial load
  useEffect(() => {
    if (result) convertData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  // Restructurize the data
  const convertData = (allData) => {
    const array = [];
    const display = [];
    for (const obj in allData) {
      let newData = { name: obj, value: allData[obj], fullName: symbol[obj] };
      if (defaultCurrency.includes(obj)) {
        display.push(newData);
      }
      if (obj === "USD") {
        setBase(newData);
      }
      array.push(newData);
    }
    setData(array);
    setCurrency(display);
  };

  // Fetch all currency full name
  const getData = () => {
    fetch(symbolUrl + access_key, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSymbol(result.symbols);
      })
      .catch((error) => console.log("error", error));
  };

  // Fetch all currency value
  const getValue = () => {
    fetch(url + access_key, requestOptions)
      .then((response) => response.json())
      .then((result) => setResult(result.rates))
      .catch((error) => console.log("error", error));
  };

  // Handle input value onchange
  const handleChange = () => {
    const newValue = document.getElementById("value").value;
    setValue(newValue);
  };

  // Get currency information
  const currencyData = (name) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) return data[i];
    }
    return null;
  };

  // Add new currency to list
  const addCurrency = () => {
    const cur = document.getElementById("selectedCurrency").value;
    setShowAddButton(true);
    setShow(false);
    setCurrency([...currency, currencyData(cur)]);
  };

  // Remove currency from list
  const removeCurrency = (cur) => {
    setCurrency(currency.filter((c) => c.name !== cur));
    alert(`${cur} is removed from the list`);
  };

  return (
    <div className="App">
      {/* Header */}
      <section style={{ border: "1px solid black", padding: "10px" }}>
        <em style={{ fontWeight: 600 }}>
          {base.name} - {base.fullName}
        </em>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div> {base.name} </div>
          <input
            onChange={() => handleChange()}
            placeholder={value}
            type="number"
            min={0}
            id="value"
            style={{ border: "none", textAlign: "right", fontSize: "20px" }}
          />
        </div>
      </section>

      {/* Currency List */}
      <section
        style={{
          border: "1px solid black",
          padding: "0 10px",
          overflow: "auto",
          height: "calc(100vh - 250px)",
        }}
      >
        {currency &&
          currency.map((currency) => {
            return (
              <div key={currency.name} style={{ margin: "10px 0" }}>
                <CurrencyCard
                  base={base}
                  currency={currency}
                  value={value}
                  onClick={(currency) => removeCurrency(currency)}
                />
              </div>
            );
          })}
      </section>

      {/* Adding currency list section */}
      <section
        style={{
          border: "1px solid black",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {showAddButton && (
          <button
            style={{ width: "100%" }}
            onClick={() => {
              setShow(true);
              setShowAddButton(false);
            }}
          >
            Add more currencies
          </button>
        )}
        {show && (
          <div style={{ width: "100%" }}>
            <select
              style={{ width: "calc(100% - 70px)" }}
              id="selectedCurrency"
            >
              <option value="Select currency" disabled>
                Select Currency
              </option>
              {data &&
                data
                  .filter((item) => !currency.includes(item))
                  .map((item) => {
                    return (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
            </select>
            <button style={{ width: "70px" }} onClick={() => addCurrency()}>
              Submit
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
