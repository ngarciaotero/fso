import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" ? "%" : null}
      </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : Math.abs(good + bad * -1) / total;
  const positive = total === 0 ? 0 : (good * 100) / total;

  const handleClick = (stateSetter) => {
    stateSetter((prevState) => prevState + 1);
  };

  return (
    <>
      <Header text="give feedback" />
      <Button onClick={() => handleClick(setGood)} text="good" />
      <Button onClick={() => handleClick(setNeutral)} text="neutral" />
      <Button onClick={() => handleClick(setBad)} text="bad" />
      <Header text="statistics" />
      {total > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          total={total}
          positive={positive}
        />
      ) : (
        <div>No feedback given</div>
      )}
    </>
  );
};

export default App;
