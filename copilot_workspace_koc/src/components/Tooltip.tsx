import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    children: React.ReactNode;
    position: { x: number; y: number };
    visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ children, position, visible }) => {
    const [container] = React.useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, [container]);

    if (!visible) return null;

    return createPortal(
        <div
            style={{
                position: 'fixed',
                left: position.x + 10,
                top: position.y + 10,
                background: 'rgba(0,0,0,0.85)',
                color: '#fff',
                padding: '8px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                whiteSpace: 'pre-wrap',
                maxWidth: '300px',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 9999,
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
        >
            {children}
        </div>,
        container
    );
};

export default Tooltip;
