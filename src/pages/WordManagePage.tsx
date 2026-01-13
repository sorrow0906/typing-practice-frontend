import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

interface Word {
    id: number;
    english: string;
    meaning: string;
}

const WordManagePage: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [english, setEnglish] = useState('');
    const [meaning, setMeaning] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const response = await api.get('/words');
            setWords(response.data);
        } catch (error) {
            console.error('Failed to fetch words', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddWord = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/words', { english, meaning });
            setWords([...words, response.data]);
            setEnglish('');
            setMeaning('');
        } catch (error) {
            console.error('Failed to add word', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/words/${id}`);
            setWords(words.filter(w => w.id !== id));
        } catch (error) {
            console.error('Failed to delete word', error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>나의 단어장</h1>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleAddWord} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="영어 단어"
                        value={english}
                        onChange={(e) => setEnglish(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                    <input
                        type="text"
                        placeholder="뜻 (한글)"
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        required
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn-primary">단어 추가</button>
                </form>
            </div>

            {loading ? <p>로딩 중...</p> : (
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                    {words.map((word) => (
                        <div key={word.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{word.english}</h3>
                            <p style={{ margin: 0, color: 'var(--text-color)' }}>{word.meaning}</p>
                            <button
                                onClick={() => handleDelete(word.id)}
                                style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    background: 'transparent',
                                    color: 'var(--secondary-color)',
                                    padding: '0.2rem 0.5rem',
                                    fontSize: '0.8rem'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WordManagePage;
