import React, { useState, useEffect, useCallback } from 'react';

const TOTAL_ROUNDS = 10;
const LETTERS_PER_ROUND = 1; // ให้มีตัวอักษร 1 ตัวต่อรอบเพื่อให้ง่ายต่อการจัดการเกม

const GamePage = ({ onGameOver }) => {
  const [currentLetter, setCurrentLetter] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const generateNewLetter = useCallback(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newLetter = {
      id: Math.random().toString(36).substring(7),
      char: alphabet[Math.floor(Math.random() * alphabet.length)],
      y: 0,
      x: Math.random() * (window.innerWidth - 50),
    };
    setCurrentLetter(newLetter);
  }, []);

  useEffect(() => {
    // ถ้าเล่นครบ 10 รอบแล้ว ให้เกมจบ
    if (round > TOTAL_ROUNDS) {
      onGameOver(score);
      return;
    }

    // สร้างตัวอักษรใหม่สำหรับรอบปัจจุบัน
    if (!currentLetter) {
      generateNewLetter();
    }

    // กำหนดให้ตัวอักษรตกลงมา
    const moveInterval = setInterval(() => {
      setCurrentLetter(prevLetter => {
        if (!prevLetter) return null;
        // ถ้าตัวอักษรตกถึงด้านล่างหน้าจอ ให้เกมจบ
        if (prevLetter.y > window.innerHeight) {
          onGameOver(score);
          clearInterval(moveInterval);
          return null;
        }
        return { ...prevLetter, y: prevLetter.y + 5 };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [round, score, onGameOver, currentLetter, generateNewLetter]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toUpperCase();
    if (!currentLetter) return;

    // ถ้าพิมพ์ถูก
    if (currentLetter.char === key) {
      setScore(prevScore => prevScore + 10);
      setCurrentLetter(null); // ตัวอักษรหายไป
      setRound(prevRound => prevRound + 1); // ไปรอบต่อไป
    } else {
      // ถ้าพิมพ์ผิด เกมจบทันที
      onGameOver(score);
    }
  }, [currentLetter, onGameOver, score]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="game-container">
      <div className="stats">
        <p>Round: {round} / {TOTAL_ROUNDS}</p>
        <p>Score: {score}</p>
      </div>
      {currentLetter && (
        <div
          className="falling-letter"
          style={{ top: currentLetter.y, left: currentLetter.x }}
        >
          {currentLetter.char}
        </div>
      )}
    </div>
  );
};

export default GamePage;
