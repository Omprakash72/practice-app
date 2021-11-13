import React, { useState } from "react";
import useLocalStorage from 'use-local-storage'
// main component======================+++++++++++++++++++++==================
function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setbad] = useState(0);
  const [count, setAll] = useState([]);
// CSS dark mode using css variables===========using npm i use-local-storage command=======================================
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  //button components================================================
  const handleGood = () => {
    setAll(count.concat("G"));
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setAll(count.concat("N"));
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAll(count.concat("B"));
    setbad(bad + 1);
  };
  const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
  };
// Statistics======================================================
  const Statistics = (props) => {
    const total = props.count.length
    const sum = (good*1)+(neutral*0)+(bad*(-1))
    return (
      <div>
        <h1>Statistics</h1>
        <p>Good : {good}</p>
        <p>Neutral : {neutral}</p>
        <p>Bad : {bad}</p>
        <p>Total feedback : {total}</p>
        <p>Average : {sum/total}</p>
        <p>Positive Feedbacks : {good*100/total} <b>%</b></p>
        <p>History:{props.count.join(" ")}</p>
      </div>
    );
  };
// Conditional rendering===========================================
  const Clicked = () => {
    const clicks = count.length
    if(clicks === 0) {
      return <p>You can see all feedbacks after giving yours</p>
    } else {
      return<Statistics count= {count} />
    }
  }
// main function(Feedback) return===========================================
  return (
    <div className= 'Feedback'  data-theme={theme}>
      <header>
        <button className='mode' onClick={switchTheme}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>
        <h1>Give your feedback</h1>
      </header>
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
        <Clicked />
    </div>
  );
}
export default Feedback;
