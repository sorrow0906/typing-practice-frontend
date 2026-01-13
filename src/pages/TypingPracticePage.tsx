import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';
import VirtualKeyboard from '../components/VirtualKeyboard';

interface Word {
    id: number;
    english: string;
    meaning: string;
}

const TypingPracticePage: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const response = await api.get('/words');
            setWords(response.data);
            if (response.data.length > 0) {
                pickRandomWord(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch words', error);
        } finally {
            setLoading(false);
        }
    };

    const pickRandomWord = (wordList: Word[]) => {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        setCurrentWord(wordList[randomIndex]);
        setInputValue('');
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!currentWord) return;

        // Prevent default only for letters to avoid browser shortcuts if needed, 
        // but here we just listen. Input is driven by keydown mostly for control, 
        // but for typing game usually we might want an input field or just global listener.
        // Let's use document listener but handle backspace etc.

        if (e.key === 'Backspace') {
            setInputValue(prev => prev.slice(0, -1));
            return;
        }

        if (e.key.length === 1) {
            // Check if next char matches
            setInputValue(prev => prev + e.key);
        }
    }, [currentWord]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!currentWord) return;

        // Exact match check
        if (inputValue === currentWord.english) {
            setCompletedCount(c => c + 1);
            // Small delay or instant?
            setTimeout(() => {
                pickRandomWord(words);
            }, 200);
        }
    }, [inputValue, currentWord, words]);

    if (loading) return <div>Loading...</div>;
    if (words.length === 0) return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>No words found.</h2>
            <p>Go to 'Manage Words' to add some vocabulary!</p>
        </div>
    );
    if (!currentWord) return <div>Loading word...</div>;

    const nextCharIndex = inputValue.length;
    const targetChar = nextCharIndex < currentWord.english.length ? currentWord.english[nextCharIndex] : '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '1rem' }}>
                Score: {completedCount}
            </div>

            <div className="glass-card" style={{
                padding: '3rem',
                minWidth: '400px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>
                    {currentWord.meaning}
                </div>

                <div style={{ fontSize: '3rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
                    {currentWord.english.split('').map((char, index) => {
                        let color = 'var(--text-color)';
                        if (index < inputValue.length) {
                            if (inputValue[index] === char) {
                                color = 'var(--primary-color)'; // access
                            } else {
                                color = 'red'; // error
                            }
                        } else if (index === inputValue.length) {
                            color = 'var(--accent-color)'; // current cursor
                        } else {
                            color = 'rgba(255,255,255,0.3)'; // future
                        }
                        return (
                            <span key={index} style={{ color, textShadow: index === inputValue.length ? '0 0 10px var(--accent-color)' : 'none' }}>
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>

            <VirtualKeyboard targetChar={targetChar} />

            <p style={{ marginTop: '2rem', opacity: 0.5 }}>Type the word seen above</p>
        </div>
    );
};

export default TypingPracticePage;
