
import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { getFinancialAdvice } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { useMockData } from '../hooks/useMockData';

// Simple markdown parser for bold and lists
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*|\* .*)/g).filter(part => part);

    const renderPart = (part: string, index: number) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('* ')) {
            return <li key={index} className="ml-5 list-disc">{part.slice(2)}</li>;
        }
        // Handle newlines as paragraphs
        const paragraphs = part.split('\n').map((p, i) => <p key={`${index}-${i}`}>{p}</p>);
        return <div key={index}>{paragraphs}</div>;
    };

    return <>{parts.map(renderPart)}</>;
};

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! I'm FinanSage, your personal AI financial assistant. How can I help you achieve your financial goals today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const financialData = useMockData();
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await getFinancialAdvice(input, financialData);
        const aiMessage: ChatMessage = { role: 'model', text: aiResponseText };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    const suggestionPrompts = [
        "Analyze my spending and suggest a budget.",
        "What are some investment strategies for my risk profile?",
        "How can I reach my savings goals faster?",
        "Explain the difference between a Roth IRA and a 401(k).",
    ];

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">AI Assistant</h2>
            <Card className="flex-grow flex flex-col">
                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
                                    <i className="fas fa-robot"></i>
                                </div>
                            )}
                            <div className={`max-w-lg p-4 rounded-xl ${msg.role === 'model' ? 'bg-slate-100 text-slate-800' : 'bg-sky-500 text-white'}`}>
                                <div className="prose prose-sm max-w-none">
                                   <SimpleMarkdown text={msg.text} />
                                </div>
                            </div>
                             {msg.role === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0">
                                    <i className="fas fa-user"></i>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div className="max-w-lg p-4 rounded-xl bg-slate-100 text-slate-800">
                                <i className="fas fa-spinner fa-spin text-slate-500"></i>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                {messages.length <= 1 && (
                     <div className="p-4 border-t border-slate-200">
                        <p className="text-sm font-semibold text-slate-600 mb-2">Try asking:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {suggestionPrompts.map(prompt => (
                                <button 
                                    key={prompt}
                                    onClick={() => setInput(prompt)}
                                    className="text-left text-sm text-sky-700 bg-sky-100 p-2 rounded-md hover:bg-sky-200 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
               
                <div className="border-t border-slate-200 p-4 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a financial question..."
                        className="flex-grow border border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="ml-4 bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-sky-600 disabled:bg-slate-300 transition-colors"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default AIAssistant;
