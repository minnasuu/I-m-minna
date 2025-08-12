import React from 'react';

const AIPersonality: React.FC = () => {
  const personalityTraits = [
    'Friendly', 'Helpful', 'Creative', 'Patient', 
    'Knowledgeable', 'Adaptive', 'Curious', 'Empathetic'
  ];

  return (
    <div className="ai-personality">
      <div className="personality-header">
        <h3>🤖 AI Personality</h3>
        <p>Meet your AI companion</p>
      </div>
      
      <div className="personality-traits">
        {personalityTraits.map((trait, index) => (
          <span key={index} className="trait">
            {trait}
          </span>
        ))}
      </div>
      
      <div className="personality-description">
        <p>
          I'm Minna, your personal AI assistant. I'm here to help you with questions, 
          provide information, and engage in meaningful conversations. I'm designed to be 
          friendly, helpful, and always ready to assist you with whatever you need.
        </p>
        <p>
          Whether you want to chat about technology, get help with a problem, or just 
          have a friendly conversation, I'm here for you. Let's start chatting!
        </p>
      </div>
    </div>
  );
};

export default AIPersonality;
