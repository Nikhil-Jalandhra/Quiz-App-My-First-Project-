import React from 'react';
import { useState } from 'react';
import logo from "../../Images/logo.png"

const Questions = [
    {
        question: "What is the normal boiling point of water ?",
        answers: [
            { text: "90°c", correct: false },
            { text: "100°c", correct: true },
            { text: "125°c", correct: false },
            { text: "150°c", correct: false }
        ]
    },
    {
        question: "What is the chemical formula of water ?",
        answers: [
            { text: "HO₂", correct: false },
            { text: "H₂O₂", correct: false },
            { text: "H₂O", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "Nearest planet to the sun ?",
        answers: [
            { text: "Mercury", correct: true },
            { text: "Venus", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: false },
        ]
    },
    {
        question: "Which is the highest mountain peak in the world ?",
        answers: [
            { text: "Naga Parbat", correct: false },
            { text: "Kanchenjunga", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false }
        ]
    },
    {
        question: " Which is not a big cat ?",
        answers: [
            { text: "Wolf", correct: true },
            { text: "Tiger", correct: false },
            { text: "Lion", correct: false },
            { text: "Leopard", correct: false }
        ]
    },
    {
        question: "Approximately how many minutes does it take sunlight to reach Earth ?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: true }
        ]
    },
];


function Question() {
    
    const [totalScore, setTotalScore] = useState(0);
    const [showResult, setShowResult] = useState("hidden");
    const [buttonFunction, setButtonFunction] = useState("hidden");
    const [scoreJudge, setScoreJudge] = useState("");

    const perSelected = ()=>{
        const selectSound = new Audio("https://github.com/Nikhil-Jalandhra/Quiz-App-My-First-Project-/raw/master/Images/beep.mp3")
        selectSound.play()
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        if (answered == Questions.length) {
            setButtonFunction("")
        }
    }
    
    const handleFormSubmit =(e)=>{

        const submitSound = new Audio("https://github.com/Nikhil-Jalandhra/Quiz-App-My-First-Project-/raw/master/Images/click.mp3")
        submitSound.play()

        e.preventDefault()
        
        const form = new FormData(e.target)
            let totalAnswer = 0

                Questions.forEach((ques)=>{
                const selectedAnswer = form.get(ques.question)
                    if (selectedAnswer === "true") {
                        totalAnswer++
                            }
                })

    
        setShowResult("")
        setTotalScore(totalAnswer)

        if(totalAnswer == Questions.length){
            setScoreJudge("Wonderfull👌🥳")
            const winningSound = new Audio("https://github.com/Nikhil-Jalandhra/Quiz-App-My-First-Project-/raw/master/Images/seven.mp3")
            winningSound.play()
        }
        else if(totalAnswer == 0){
            setScoreJudge("Not Possible😂🤣")
        }
        else if (totalAnswer > Questions.length/2 && totalAnswer <= Questions.length/1.1) {
            setScoreJudge("Nice😁🤗")
        }
        else if(totalAnswer == Questions.length/2){
            setScoreJudge("Not Bad😊👍")
        }
        else if (totalAnswer < Questions.length/2) {
            setScoreJudge("Average 👍")
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    const realAnswer = document.querySelectorAll('div[id=true]')
        realAnswer.forEach((ans)=>{
            ans.classList.add("bg-green-500")
        })

        const wrongChecked = document.querySelectorAll('input[type="radio"]:checked')
        wrongChecked.forEach((wro)=>{
            if(wro.value == "false"){
                wro.parentElement.classList.add("bg-red-500")
            }
        })
           
    }

  return (
    <div className='w-full pb-[100px] flex flex-col items-center bg-[#3d3b3c]'>

        <div className='w-[310px] lg:w-[700px] flex flex-col items-center mt-[30px] rounded-2xl bg-[#c1bdb3]'>
            <img className='w-[200px] lg:w-[250px]' src={logo} alt="" />
            <h1 className={`${showResult} text-[20px] lg:text-[30px]`}>{scoreJudge}</h1>
            <h1 id='score' className={`${showResult} text-[21px] lg:text-[31px] mb-4`}>Your Score is = <span className=' font-extrabold'>{totalScore}</span>/{Questions.length}</h1>
        </div>

        <form id='quiz' onSubmit={handleFormSubmit}>
            {Questions.map((ques, index)=>(
                <div key={index} className='w-[310px] lg:w-[700px] lg:p-8 bg-[#c1bdb3] mt-2 rounded-xl p-4'>
                    <h1 className='mb-4 lg:text-[26px]'>{index+1}. {ques.question}</h1>
                        {ques.answers.map((answer, ansIndex)=>(
                            <label key={ansIndex} htmlFor={answer.text} >
                                <div className='flex mb-2 lg:text-[25px]' id={`${answer.correct}`}>
                                    <input
                                    type="radio"
                                    className=' me-2 w-[20px] lg:w-[25px]'
                                    name={ques.question}
                                    value={answer.correct}
                                    onChange={perSelected}
                                    id={answer.text} />
                                    <h1>{answer.text}</h1>
                                 </div>
                             </label>
                        ))}
            </div>
            ))} 

            <div className={`w-[310px] lg:w-[700px] bg-[#c1bdb3] rounded-xl mt-2 flex ${buttonFunction}  p-5 lg:p-8 justify-center` }>
                <button type='submit' className='bg-white px-3 lg:px-6 text-[20px] lg:text-[30px] font-bold rounded-xl'>Submit
                </button>
            </div>

        </form>

    </div>
  );
}

export default Question;
