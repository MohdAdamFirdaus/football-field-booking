import React, { useEffect } from 'react';

const CelebrationEmoji = ({ visible }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        // eslint-disable-next-line
        visible = false;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div className={`celebration-emoji ${visible ? 'show' : ''}`}>🎉</div>
  );
};

export default CelebrationEmoji;
