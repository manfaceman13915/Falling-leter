import React, { useState } from 'react';
// import api from '../api'; // You will need to create this later

const GameOverModal = ({ score, onGoHome }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitScore = async () => {
    // try {
    //   setIsSubmitting(true);
    //   await api.post('/scores', { player_name: playerName, score: score });
    //   setIsSubmitting(false);
    //   alert('Score submitted successfully!');
    //   onGoHome(); // Go back to home after submitting
    // } catch (error) {
    //   console.error('Error submitting score:', error);
    //   setIsSubmitting(false);
    //   alert('Failed to submit score.');
    // }
    alert(`Score submitted: ${playerName} - ${score}`);
    onGoHome();
  };

  return (
    <div className="game-over-modal">
      <h2>Game Over!</h2>
      <p>Your final score is: {score}</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleSubmitScore} disabled={isSubmitting || !playerName}>
        {isSubmitting ? 'Submitting...' : 'Submit Score'}
      </button>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  );
};

export default GameOverModal;
