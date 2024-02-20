import React from "react";

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    let sum = parts.reduce((acc, part) => acc + part.exercises,
        0)
    return <p><b>total of {sum} exercises</b></p>
}


const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>

const Course = ({ course }) =>
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>

export default Course