* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(145deg, #eef2f7 0%, #d4dfe9 100%);
    font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.app-container {
    width: 100%;
    max-width: 700px;
}

/* 控制栏 */
.control-bar {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(8px);
    border-radius: 60px;
    padding: 12px 20px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.mode-group, .topic-group {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.control-label {
    font-weight: 600;
    color: #1f3a4b;
    font-size: 0.85rem;
}

.mode-btn, .topic-btn {
    background: #f0f4fa;
    border: none;
    padding: 6px 16px;
    border-radius: 40px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    color: #2c3e4e;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.mode-btn.active, .topic-btn.active {
    background: #2c6e9e;
    color: white;
    box-shadow: 0 2px 6px rgba(44,110,158,0.3);
}

.mode-btn:hover, .topic-btn:hover {
    background: #d4e0e8;
}

/* 主卡片 */
.card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(2px);
    border-radius: 48px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.15);
    padding: 30px 28px 40px;
}

.stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    padding: 12px 20px;
    border-radius: 60px;
    margin-bottom: 40px;
    font-weight: 600;
    color: #1e2f3e;
    font-size: 0.9rem;
    flex-wrap: wrap;
    gap: 12px;
}

.small-btn {
    background: #fee2e2;
    border: none;
    padding: 6px 12px;
    border-radius: 40px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    color: #b91c1c;
    transition: 0.1s;
}

.small-btn:hover {
    background: #fecaca;
}

.question-area {
    text-align: center;
}

.chinese-word {
    font-size: 3.5rem;
    font-weight: 800;
    color: #0a2b3e;
    letter-spacing: 2px;
    margin-bottom: 16px;
}

.phonetic {
    font-size: 1rem;
    color: #2c6e9e;
    background: #eef3fc;
    display: inline-block;
    padding: 6px 20px;
    border-radius: 40px;
    margin-bottom: 32px;
    font-family: monospace;
}

#answerInput {
    width: 100%;
    padding: 16px 24px;
    font-size: 1.2rem;
    text-align: center;
    border: 2px solid #cbdde9;
    border-radius: 60px;
    background: white;
    outline: none;
    transition: 0.2s;
    font-weight: 500;
    margin-bottom: 20px;
}

#answerInput:focus {
    border-color: #2c6e9e;
    box-shadow: 0 0 0 3px rgba(44,110,158,0.2);
}

.feedback {
    min-height: 60px;
    font-size: 1rem;
    font-weight: 500;
    margin: 8px 0 20px;
}

.buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

button {
    background: white;
    border: none;
    padding: 12px 28px;
    border-radius: 60px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.1s linear;
    border: 1px solid #ccdbe5;
}

#checkBtn {
    background: #2563eb;
    color: white;
    border: none;
    box-shadow: 0 4px 8px #1e3a8a30;
}

#nextBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

button:active:not(:disabled) {
    transform: scale(0.97);
}

@media (max-width: 550px) {
    .card { padding: 20px; }
    .chinese-word { font-size: 2.5rem; }
    .control-bar { flex-direction: column; align-items: stretch; }
    .mode-group, .topic-group { justify-content: center; }
}