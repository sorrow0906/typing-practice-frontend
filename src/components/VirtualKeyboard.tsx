import React from 'react';

interface VirtualKeyboardProps {
    targetChar?: string;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ targetChar }) => {
    const rows = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
    ];

    const getButtonStyle = (key: string) => {
        const isTarget = targetChar && key.toLowerCase() === targetChar.toLowerCase();

        return {
            width: '40px',
            height: '40px',
            margin: '4px',
            borderRadius: '8px',
            border: 'none',
            background: isTarget ? 'var(--accent-color)' : 'var(--glass-bg)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: isTarget ? '0 0 15px var(--accent-color)' : 'none',
            transition: 'all 0.1s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        };
    };

    return (
        <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {rows.map((row, i) => (
                <div key={i} style={{ display: 'flex' }}>
                    {row.map((key) => (
                        <div key={key} style={getButtonStyle(key)}>
                            {key}
                        </div>
                    ))}
                </div>
            ))}
            {/* 스페이스 바 */}
            <div style={{ display: 'flex', marginTop: '4px' }}>
                <div style={{
                    width: '300px',
                    height: '40px',
                    borderRadius: '8px',
                    background: targetChar === ' ' ? 'var(--accent-color)' : 'var(--glass-bg)',
                    boxShadow: targetChar === ' ' ? '0 0 15px var(--accent-color)' : 'none',
                    transition: 'all 0.1s ease',
                    backdropFilter: 'blur(5px)'
                }}></div>
            </div>
        </div>
    );
};

export default VirtualKeyboard;
