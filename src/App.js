import './App.scss';
import jsLogo from "./logos/js.png"
import interviewLogo from './logos/interview.png'
import reactLogo from './logos/react.png'
import mernLogo from './logos/mern1.png'
import tailwindLogo from './logos/tailwind.png'
import typescriptLogo from './logos/typescript.png'
import htmlCssLogo from './logos/html.png'
import revisionLogo from './logos/revision.png'
import brainLogo from './logos/brain.png'
import nodeExpressLogo from './logos/node-express.png'
import codingLogo from './logos/coding.png'
import takingNotesLogo from './logos/notes.png'
import communicationLogo from './logos/communication.png'
import mongoDbLogo from './logos/mongo.png'
import englishLogo from './logos/english.png'
import debugLogo from './logos/debug.png'
import walkLogo from './logos/walk.png'
import eatLogo from './logos/eating.png'
import fastingLogo from './logos/fasting.png'
import nfLogo from './logos/nf.png'
import linuxLogo from './logos/linux.png'
import githubLogo from './logos/github.png'
import developerToolsLogo from './logos/developertools.png'
import vscodeLogo from './logos/vscode.png'

import React, { useState, useEffect, useRef } from 'react';
import Streak from './components/streak';
import MonthTitle from './components/month-text';

function DateRangeIterator({ startDateStr, endDateStr, datesInRange, setDatesInRange }) {

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  useEffect(() => {
    setDatesInRange(getDatesInRange(startDate, endDate));
  }, []);

  return (
    <>

      {datesInRange.map((date) => (
        <th key={date.toISOString()}><div className='table-head-inner-wrapper'><span>{weekDays[Number(date.getDay())]}</span><span className='date'>{date.getDate()}</span></div></th>
      ))}

    </>
  );
}


function App() {
  const [datesInRange, setDatesInRange] = useState([]);
  const streak = useRef([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
  const [markedStreaks, setMarkedStreaks] = useState(JSON.parse(localStorage.getItem('markedStreaks')) || []);

  const skillList = [
    { skillName: "revision", skillLogo: revisionLogo },
    { skillName: "brain stormming", skillLogo: brainLogo },
    { skillName: "interview prep", skillLogo: interviewLogo },
    { skillName: "communication", skillLogo: communicationLogo },
    { skillName: "coding problems", skillLogo: codingLogo },
    { skillName: "Taking notes", skillLogo: takingNotesLogo },
    { skillName: "html & css", skillLogo: htmlCssLogo },
    { skillName: "tailwind", skillLogo: tailwindLogo },
    { skillName: "java script", skillLogo: jsLogo },
    { skillName: "type script", skillLogo: typescriptLogo },
    { skillName: "git & github", skillLogo: githubLogo },
    { skillName: "react.js", skillLogo: reactLogo },
    { skillName: "mongo db", skillLogo: mongoDbLogo },
    { skillName: "Express & Node", skillLogo: nodeExpressLogo },
    { skillName: "Mern project", skillLogo: mernLogo },
    { skillName: "debugging", skillLogo: debugLogo },
    { skillName: "chrome Developer tools", skillLogo: developerToolsLogo },
    { skillName: "linux", skillLogo: linuxLogo },
    { skillName: "vs code", skillLogo: vscodeLogo },
    { skillName: "english", skillLogo: englishLogo },
    { skillName: "walking", skillLogo: walkLogo },
    { skillName: "mindful eating", skillLogo: eatLogo },
    { skillName: "fasting", skillLogo: fastingLogo },
    { skillName: "Health", skillLogo: nfLogo },

  ];


  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



  const success = (e, listNum, index, colorPalet) => {
    const eleId = streak.current[listNum][index].getAttribute('data-id');
    const alreadyExist = markedStreaks.find(element => element.id === eleId);
    streak.current[listNum][index].style.backgroundColor = colorPalet;
    // ['#9be9a8', '#40c463', '#30a14e', '#216e39', 'unset'];
    const markedColorClassName = (colorPalet) => {
      switch (colorPalet) {
        case '#9be9a8': return 'green-1'
        case '#40c463': return 'green-2'
        case '#30a14e': return 'green-3'
        case '#216e39': return 'green-4'
        case 'unset': return 'green-unset'

      }
    }
    console.log(markedColorClassName(colorPalet))
    if (alreadyExist) {
      console.log(alreadyExist)
      const updateIndex = markedStreaks.findIndex(item => item.id === eleId);
      markedStreaks[updateIndex] = { id: eleId, markedColor: markedColorClassName(colorPalet) }
      setMarkedStreaks([...markedStreaks])
      return
    }
    console.log(streak.current[listNum][index].getAttribute('data-id'))
    setMarkedStreaks([...markedStreaks, { id: eleId, markedColor: markedColorClassName(colorPalet) }])

  }


  useEffect(() => {
    localStorage.setItem('markedStreaks', JSON.stringify(markedStreaks))
  }, [markedStreaks])
  return (
    <>
      <div className='month-container'>
        <MonthTitle />
      </div>
      <table>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Badge</th>
            <DateRangeIterator startDateStr="2023-08-03" endDateStr="2023-08-31" setDatesInRange={setDatesInRange} datesInRange={datesInRange} />
          </tr>
        </thead>
        <tbody>
          {skillList.map((skill, listIndex) => {
            return (<tr key={listIndex}>
              <td className='skill-text'>{skill.skillName}</td>
              <td><img src={skill.skillLogo} /></td>
              {datesInRange.map((date, index) => (
                <Streak
                  key={index}
                  success={success}
                  datesInRange={datesInRange}
                  streak={streak}
                  listIndex={listIndex}
                  date={date}
                  index={index}
                  markedStreaks={markedStreaks} />
              ))}
            </tr>)
          })}

        </tbody>
      </table>
    </>
  );
}

export default App;
