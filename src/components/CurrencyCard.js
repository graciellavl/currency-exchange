import React from "react";

const CurrencyCard = ({ base, currency, value, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        justifyContent: "space-between",
        padding: "10px",
        fontSize: "14px",
      }}
    >
      <section style={{ flexGrow: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          <div>{currency.name}</div>
          <div>{(currency.value / base.value) * value}</div>
        </div>
        <div>
          <div>
            <em>
              {currency.name} - {currency.fullName}
            </em>
          </div>
          <div>
            <em>
              1 {base.name} = {currency.name} {currency.value / base.value}
            </em>
          </div>
        </div>
      </section>
      <section
        style={{ marginLeft: "20px", display: "flex", alignSelf: "center" }}
      >
        <button onClick={() => onClick(currency.name)}> - </button>
      </section>
    </div>
  );
};

export default CurrencyCard;
