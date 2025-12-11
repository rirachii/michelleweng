"use client";

import React, { useState, useEffect } from 'react';
// import './Transcript.css'; // Moved to globals.css

interface TranscriptHistoryItem {
  title: string;
  url: string;
  snippet: string;
  full_text: string;
  date: string;
}

export default function TranscriptPage() {
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ title: string; transcript: string } | null>(null);
  const [history, setHistory] = useState<TranscriptHistoryItem[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('transcript_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = (newItem: TranscriptHistoryItem) => {
    const updatedHistory = [newItem, ...history].slice(0, 50); // Limit to 50 items
    setHistory(updatedHistory);
    localStorage.setItem('transcript_history', JSON.stringify(updatedHistory));
  };

  const handleTranscribe = async () => {
    if (!url.trim()) {
      setError("INPUT_REQUIRED: PLEASE ENTER A VALID URL.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['X-API-KEY'] = apiKey;
      }

      // Note: This expects the backend to be running on localhost:8080 or proxied via Vite config.
      // Since we are in dev mode, we might need to point to the absolute URL if proxy isn't set up.
      // For now, assuming the user might run the backend locally on port 8080.
      const backendUrl = 'http://localhost:8080/transcribe'; 

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        let msg = data.error || "UNKNOWN_ERROR";
        if (response.status === 401) msg = "ACCESS_DENIED: INVALID API KEY";
        throw new Error(msg);
      }

      setResult({
        title: data.title,
        transcript: data.transcript
      });

      saveHistory({
        title: data.title,
        url: url,
        snippet: data.transcript.substring(0, 60) + "...",
        full_text: data.transcript,
        date: new Date().toISOString()
      });

    } catch (err: any) {
      setError("SYSTEM_FAILURE: " + err.message?.toUpperCase());
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.transcript).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const loadHistoryItem = (item: TranscriptHistoryItem) => {
    setUrl(item.url);
    setResult({
      title: item.title,
      transcript: item.full_text
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('transcript_history');
  };

  const wordCount = result ? result.transcript.split(/\s+/).length : 0;

  return (
    <div className="transcript-page flex flex-col">
       <div className="bg-grid"></div>
       <div className="scanlines"></div>

       <div className="container mx-auto px-4 py-6 md:py-12 max-w-3xl relative z-10 flex-grow">
          {/* Header */}
          <header className="mb-8 md:mb-12 text-center">
            <div className="glitch-wrapper mb-2">
                <h1 className="text-3xl md:text-6xl glitch" data-text="SHORTS_TRANSCRIBER">SHORTS_TRANSCRIBER</h1>
            </div>
            <p className="text-[10px] md:text-sm tracking-widest uppercase opacity-60 font-mono-code text-gray-400">
                <span style={{ color: '#ff0055' }}>&gt;</span> Connect to the Wired // Extract Audio Data
            </p>
          </header>

          <main className="space-y-6 md:space-y-8">
             {/* Controls Area */}
            <div className="bg-black bg-opacity-80 p-4 md:p-6 border border-gray-800 backdrop-blur-sm">
                
                {/* API Key Input */}
                <div className="mb-6">
                    <label htmlFor="api-key" className="block text-xs uppercase tracking-wider mb-2 text-gray-500">Access Key (API)</label>
                    <input
                        type="password"
                        id="api-key"
                        className="cyber-input w-full p-3 rounded-none text-base"
                        placeholder="ENTER_API_KEY_OR_LEAVE_BLANK_FOR_DEMO"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>

                {/* URL Input */}
                <div className="mb-8">
                    <label htmlFor="video-url" className="block text-xs uppercase tracking-wider mb-2 text-gray-500">Target Source (URL)</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="url"
                            id="video-url"
                            className="cyber-input w-full p-3 rounded-none text-base flex-grow"
                            placeholder="https://youtube.com/shorts/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button 
                            onClick={handleTranscribe} 
                            disabled={isLoading}
                            className="cyber-btn px-8 py-3 w-full md:w-auto text-sm tracking-widest"
                        >
                            <span className="btn-text">{isLoading ? "PROCESSING..." : "EXECUTE"}</span>
                        </button>
                    </div>
                </div>

                {/* Loader */}
                {isLoading && (
                    <div className="mb-4">
                        <p className="font-mono-code text-xs text-[#ff0055] mb-1 animate-pulse">ESTABLISHING CONNECTION...</p>
                        <div className="loader-bar"></div>
                    </div>
                )}

                {/* Error Msg */}
                {error && (
                    <div className="p-3 border border-red-500 bg-red-900 bg-opacity-10 text-red-400 text-xs font-mono-code mb-4">
                        {error}
                    </div>
                )}
            </div>

            {/* Result Area */}
            {result && (
                <div id="result-area">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Data Stream Output</h3>
                        <div className="flex gap-2 items-center">
                            <span className="text-xs font-mono-code text-gray-600">{wordCount} WORDS</span>
                            <button 
                                onClick={copyToClipboard}
                                className={`text-xs uppercase transition-colors font-bold ${isCopied ? 'text-[#ff0055]' : 'hover:text-[#ff0055]'}`}
                            >
                                {isCopied ? "COPIED" : "[COPY]"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="terminal-box p-4 md:p-6 min-h-[150px]">
                        <h4 className="font-bold mb-4 text-white border-b border-gray-800 pb-2 text-base md:text-lg">
                            {result.title}
                        </h4>
                        <p className="font-mono-code text-base md:text-lg leading-loose tracking-wide text-gray-100 typewriter-cursor break-words whitespace-pre-wrap">
                            {result.transcript}
                        </p>
                    </div>
                </div>
            )}

            {/* History Section */}
            <div className="mt-12 md:mt-16">
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                    <h3 className="text-lg font-bold">LOGS / HISTORY</h3>
                    {history.length > 0 && (
                        <button onClick={clearHistory} className="text-xs text-gray-600 hover:text-red-500 transition-colors uppercase">Clear Logs</button>
                    )}
                </div>
                
                <div className="space-y-3">
                    {history.length === 0 ? (
                        <p className="text-xs text-gray-700 font-mono-code py-4 text-center">NO DATA LOGGED.</p>
                    ) : (
                        history.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadHistoryItem(item)}
                                className="history-item p-3 bg-black border border-gray-800 cursor-pointer group"
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="text-[#ff0055] text-xs font-bold font-mono-code">{item.title}</span>
                                    <span className="text-[10px] text-gray-600 font-mono-code">{new Date(item.date).toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-gray-400 font-mono-code truncate group-hover:text-gray-200 transition-colors">{item.snippet}</p>
                                <p className="text-[10px] text-gray-700 mt-1 truncate">{item.url}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

          </main>
       </div>

       <footer className="text-center py-6 text-xs text-gray-800 font-mono-code relative z-10 mt-auto">
            PROTOCOL VER 2.0 // LAIN
       </footer>
    </div>
  );
}
