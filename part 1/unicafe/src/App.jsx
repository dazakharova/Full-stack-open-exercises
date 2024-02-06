import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [showStats, setShowStats] = useState(false);

    const countAverage = () => {
        return (good + neutral + bad) / 3;
    }

    const countPositive = () => {
        if (good > 0) {
            return (good / (good + neutral + bad) * 100).toString() + "%";
        }
        return "0%";
    }


    const stats = [
        {name: "good", value: good},
        {name: "neutral", value: neutral},
        {name: "bad", value: bad},
        {name: "average", value: countAverage()},
        {name: "positive", value: countPositive()}
    ]
    const giveFeedback = (type) => {
        if (type === "good") {
            setGood(good + 1);
        } else if (type === "neutral") {
            setNeutral(neutral + 1);
        } else if (type === "bad") {
            setBad(bad + 1);
        }

        setAll(all + 1);
        setShowStats(true);
    }

    const StatisticLine = (props) => (
        <tr><td>{props.text}</td><td>{props.value}</td></tr>
    )

    const Statistics= (props) => {

        return (
            <>
                <table>
                    <tbody>
                        <StatisticLine text={props.data[0].name} value={props.data[0].value} />
                        <StatisticLine text={props.data[1].name} value={props.data[1].value} />
                        <StatisticLine text={props.data[2].name} value={props.data[2].value} />
                        <StatisticLine text={props.data[3].name} value={props.data[3].value} />
                        <StatisticLine text={props.data[4].name} value={props.data[4].value} />
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => giveFeedback('good')} text="good" />
            <Button handleClick={() => giveFeedback('neutral')} text="neutral" />
            <Button handleClick={() => giveFeedback('bad')} text="bad" />
            <h1>statistics</h1>
            {showStats ? <Statistics data={stats} /> : <p>No feedback given</p>}
        </div>
    )
}

export default App





// <p>good {good}</p>
// <p>neutral {neutral}</p>
// <p>bad {bad}</p>

// <Display text="good" value={good} />
// <Display text="neutral" value={neutral} />
// <Display text="bad" value={bad} />
// <Display text="all" value={all} />
// <Display text="average" value={countAverage()} />
// <Display text="positive" value={countPositive().toString() + "%"} />