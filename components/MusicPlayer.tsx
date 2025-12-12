"use client";

import React, { useState } from 'react';

export const MusicPlayer = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className={`fixed bottom-24 right-6 z-40 transition-all duration-300 font-mono text-[10px] md:text-xs select-none ${isExpanded ? 'w-80' : 'w-auto'}`}
        >
            <div className="bg-black/90 backdrop-blur-sm border border-green-900/50 shadow-[0_0_15px_rgba(0,255,0,0.1)] p-1 rounded-sm">
                {/* Header / Mini Status */}
                <div 
                    className="flex items-center justify-between cursor-pointer bg-green-900/10 p-2 hover:bg-green-900/20 transition-colors border-b border-green-900/30" 
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                        <span className="text-green-500 tracking-widest font-bold text-[10px]">PLAYLIST_ACTIVE</span>
                    </div>
                    <span className="text-green-700 hover:text-green-400 font-bold px-2">[{isExpanded ? '-' : '+'}]</span>
                </div>

                {/* Spotify Iframe */}
                <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                    <iframe 
                        style={{ borderRadius: '4px' }}
                        src="https://open.spotify.com/embed/playlist/1uKwhv7xacVEzMopYBUsjz?utm_source=generator&theme=0" 
                        width="100%" 
                        height="300" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        title="Spotify Player"
                    />
                </div>
            </div>
        </div>
    );
};
