import React, { useState } from "react"
import data from "../data/data.json"
import "./card.css"

export const FlashcardList = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const currentCard = data[currentIndex]

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setIsFading(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
        setIsFading(false)
      }, 200)
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFading(true)
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setIsFlipped(false)
        setIsFading(false)
      }, 200)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-3xl w-[100%]">
        <h1 className="text-3xl">Flashcard App</h1>

        <div className="w-full border-2 border-gray-400 h-10 flex items-center p-1 mt-2 mb-2 rounded-[10px] relative">
          <p className="absolute right-2 top-2">
            {currentIndex + 1} / {data.length}
          </p>
          <div
            className="h-7 bg-blue-300 transition-all duration-300 rounded-[6px] relative"
            style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
          >
            <p className="absolute right-2 top-[5px] text-white text-sm font-semibold">
              {Math.round(((currentIndex + 1) / data.length) * 100)}%
            </p>
          </div>
        </div>

        <div className="border border-gray-400 rounded-[10px] p-[5px] ">
          <div className="p-2 rounded-[5px] flex border-gray-100 h-48 items-center justify-center text-center text-2xl mb-2 bg-gray-200/25">
            <div
              className={`transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
            >
              <p>
                {isFlipped ? (
                  <div>{currentCard.answer}</div>
                ) : (
                  <div>
                    <strong>{currentCard.question}</strong>
                  </div>
                )}
              </p>
            </div>
          </div>

          <div className="btn flex justify-between border-1 border-gray-100 p-2 rounded-[5px] bg-gray-200/25">
            <button onClick={handlePrev} className="text-gray-500 btn">
              Previous
            </button>

            <button
              onClick={handleFlip}
              className={`flashcard ${isFlipped ? "flipped" : ""} btn`}
            >
              Show Answer
            </button>

            <button onClick={handleNext} className="text-gray-500 btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
