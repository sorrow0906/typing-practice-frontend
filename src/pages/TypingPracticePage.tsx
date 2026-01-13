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
            console.error('단어 목록을 불러오지 못했습니다.', error);
        } finally {
            setLoading(false);
        }
    };

    const pickRandomWord = (wordList: Word[]) => {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const originalWord = wordList[randomIndex];
        // 첫 글자를 대문자로 변환하여 표시
        const capitalizedWord = {
            ...originalWord,
            english: originalWord.english.charAt(0).toUpperCase() + originalWord.english.slice(1)
        };
        setCurrentWord(capitalizedWord);
        setInputValue('');
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!currentWord) return;

        // 브라우저 단축키 방지 등은 필요 시 추가. 
        // 여기서는 키 입력만 감지합니다.

        if (e.key === 'Backspace') {
            setInputValue(prev => prev.slice(0, -1));
            return;
        }

        if (e.key.length === 1) {
            setInputValue(prev => {
                const nextIndex = prev.length;
                if (nextIndex < currentWord.english.length) {
                    const targetChar = currentWord.english[nextIndex];
                    // 대소문자 무시하고 알파벳이 맞으면, 원래 단어의 대소문자로 입력 처리 (정답 처리)
                    if (e.key.toLowerCase() === targetChar.toLowerCase()) {
                        return prev + targetChar;
                    }
                }
                // 틀린 경우 혹은 범위 밖인 경우 입력한 키 그대로 추가 (오답 처리됨)
                return prev + e.key;
            });
        }
    }, [currentWord]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!currentWord) return;

        // 대소문자 구분 없이 일치 여부 확인
        if (inputValue.toLowerCase() === currentWord.english.toLowerCase()) {
            setCompletedCount(c => c + 1);
            // 정답 시 약간의 지연 후 다음 단어
            setTimeout(() => {
                pickRandomWord(words);
            }, 200);
        }
    }, [inputValue, currentWord, words]);

    if (loading) return <div>로딩 중...</div>;
    if (words.length === 0) return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>등록된 단어가 없습니다.</h2>
            <p>'단어 관리' 메뉴에서 단어를 먼저 추가해주세요!</p>
        </div>
    );
    if (!currentWord) return <div>단어를 불러오는 중...</div>;

    const nextCharIndex = inputValue.length;
    const targetChar = nextCharIndex < currentWord.english.length ? currentWord.english[nextCharIndex] : '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '1rem' }}>
                점수: {completedCount}
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
                            // 대소문자 구분 없이 색상 처리
                            if (inputValue[index].toLowerCase() === char.toLowerCase()) {
                                color = 'var(--primary-color)'; // 정답
                            } else {
                                color = 'red'; // 오답
                            }
                        } else if (index === inputValue.length) {
                            color = 'var(--accent-color)'; // 현재 커서
                        } else {
                            color = 'rgba(255,255,255,0.3)'; // 미래 문자
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

            <p style={{ marginTop: '2rem', opacity: 0.5 }}>화면에 보이는 단어를 입력하세요</p>
        </div>
    );
};

export default TypingPracticePage;
