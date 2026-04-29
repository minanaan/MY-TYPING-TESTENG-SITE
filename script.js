// ========== 1. 词库定义 ==========
const basicWords = [
    { word: "test", chinese: "测试", phonetic: "/test/" },
    { word: "test case", chinese: "测试用例", phonetic: "/test keɪs/" },
    { word: "test report", chinese: "测试报告", phonetic: "/test rɪˈpɔːt/" },
    { word: "test result", chinese: "测试结果", phonetic: "/test rɪˈzʌlt/" },
    { word: "test process", chinese: "测试流程", phonetic: "/test ˈprəʊses/" },
    { word: "test step", chinese: "测试步骤", phonetic: "/test step/" },
    { word: "test plan", chinese: "测试计划", phonetic: "/test plæn/" },
    { word: "test environment", chinese: "测试环境", phonetic: "/test ɪnˈvaɪrənmənt/" },
    { word: "test data", chinese: "测试数据", phonetic: "/test ˈdeɪtə/" },
    { word: "test tool", chinese: "测试工具", phonetic: "/test tuːl/" },
    { word: "device", chinese: "设备", phonetic: "/dɪˈvaɪs/" },
    { word: "sensor", chinese: "传感器", phonetic: "/ˈsen.sər/" },
    { word: "firmware", chinese: "固件", phonetic: "/ˈfɜːm.weər/" },
    { word: "signal", chinese: "信号", phonetic: "/ˈsɪɡ.nəl/" },
    { word: "data", chinese: "数据", phonetic: "/ˈdeɪtə/" },
    { word: "connection", chinese: "连接", phonetic: "/kəˈnek.ʃən/" },
    { word: "transmission", chinese: "传输", phonetic: "/trænzˈmɪʃ.ən/" },
    { word: "power", chinese: "电源", phonetic: "/ˈpaʊər/" },
    { word: "run", chinese: "运行", phonetic: "/rʌn/" },
    { word: "start", chinese: "启动", phonetic: "/stɑːt/" },
    { word: "stop", chinese: "停止", phonetic: "/stɒp/" },
    { word: "reset", chinese: "重置", phonetic: "/ˌriːˈset/" }
];

const defectWords = [
    { word: "defect", chinese: "缺陷", phonetic: "/ˈdiː.fekt/" },
    { word: "bug", chinese: "漏洞", phonetic: "/bʌɡ/" },
    { word: "error", chinese: "错误", phonetic: "/ˈer.ər/" },
    { word: "fault", chinese: "故障", phonetic: "/fɔːlt/" },
    { word: "problem", chinese: "问题", phonetic: "/ˈprɒb.ləm/" },
    { word: "abnormal", chinese: "异常", phonetic: "/æbˈnɔː.məl/" },
    { word: "failure", chinese: "失败", phonetic: "/ˈfeɪ.ljər/" },
    { word: "crash", chinese: "崩溃", phonetic: "/kræʃ/" },
    { word: "warning", chinese: "警告", phonetic: "/ˈwɔː.nɪŋ/" },
    { word: "error code", chinese: "错误代码", phonetic: "/ˈer.ər koʊd/" }
];

const operationWords = [
    { word: "run test", chinese: "执行测试", phonetic: "/rʌn test/" },
    { word: "check", chinese: "检查", phonetic: "/tʃek/" },
    { word: "verify", chinese: "验证", phonetic: "/ˈver.ɪ.faɪ/" },
    { word: "confirm", chinese: "确认", phonetic: "/kənˈfɜːm/" },
    { word: "record", chinese: "记录", phonetic: "/rɪˈkɔːd/" },
    { word: "report", chinese: "报告", phonetic: "/rɪˈpɔːt/" },
    { word: "debug", chinese: "调试", phonetic: "/ˌdiːˈbʌɡ/" },
    { word: "simulate", chinese: "模拟", phonetic: "/ˈsɪm.jə.leɪt/" },
    { word: "monitor", chinese: "监控", phonetic: "/ˈmɒn.ɪ.tər/" },
    { word: "analyze", chinese: "分析", phonetic: "/ˈæn.əl.aɪz/" }
];

const allWords = [...basicWords, ...defectWords, ...operationWords];
const topicMap = {
    all: allWords,
    basic: basicWords,
    defect: defectWords,
    operation: operationWords
};

// ========== 2. DOM 元素 ==========
const questionTextEl = document.getElementById('questionText');
const extraInfoEl = document.getElementById('extraInfo');
const answerInput = document.getElementById('answerInput');
const feedbackEl = document.getElementById('feedback');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const correctSpan = document.getElementById('correctCount');
const wrongSpan = document.getElementById('wrongCount');
const accuracySpan = document.getElementById('accuracy');
const avgTimeSpan = document.getElementById('avgTime');
const progressSpan = document.getElementById('progress');
const totalSpan = document.getElementById('totalWords');
const clearWrongBtn = document.getElementById('clearWrongBtn');

// ========== 3. 全局变量 ==========
let currentTopic = "all";
let currentMode = "recite";    // 新增 recite 模式，默认设为背诵练习
let currentWordList = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let isAnswered = false;
let wrongWords = [];

let currentWordObj = null;

let currentStartTime = null;
let timeRecords = [];
let practicedCount = 0;

// ========== 4. 辅助函数 ==========
function updateStats() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
    const total = correctCount + wrongCount;
    const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    accuracySpan.textContent = accuracy;
    
    if (timeRecords.length === 0) {
        avgTimeSpan.textContent = "0.0";
    } else {
        const avg = timeRecords.reduce((a, b) => a + b, 0) / timeRecords.length;
        avgTimeSpan.textContent = avg.toFixed(1);
    }
}

function updateProgress() {
    progressSpan.textContent = practicedCount;
    totalSpan.textContent = currentWordList.length;
}

function fetchNewWordObj() {
    if (currentMode === "sequential") {
        if (currentIndex >= 0 && currentIndex < currentWordList.length) {
            return currentWordList[currentIndex];
        }
        return null;
    } else if (currentMode === "wrong") {
        if (wrongWords.length === 0) return null;
        const rand = Math.floor(Math.random() * wrongWords.length);
        return wrongWords[rand];
    } else { // recite, random, en2zh 都从当前题库随机抽取
        if (currentWordList.length === 0) return null;
        const rand = Math.floor(Math.random() * currentWordList.length);
        return currentWordList[rand];
    }
}

// 发音函数
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function refreshWord() {
    currentWordObj = fetchNewWordObj();
    if (!currentWordObj) {
        questionTextEl.textContent = "🎉 恭喜完成！ 🎉";
        extraInfoEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        updateStats();
        return;
    }
    
    // 根据模式显示题目
    if (currentMode === "en2zh") {
        // 英中练习：显示英文，输入中文
        questionTextEl.textContent = currentWordObj.word;
        extraInfoEl.textContent = currentWordObj.phonetic || "";
    } else {
        // recite, random, sequential, wrong 均显示中文（中译英）
        questionTextEl.textContent = currentWordObj.chinese;
        extraInfoEl.textContent = currentWordObj.phonetic || "";
    }
    
    answerInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    isAnswered = false;
    feedbackEl.innerHTML = "";
    answerInput.value = "";
    answerInput.focus();
    
    currentStartTime = Date.now();
    updateProgress();
    updateStats();
}

function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
    practicedCount = 0;
    isAnswered = false;
    if (currentMode === "sequential") currentIndex = 0;
    updateStats();
    currentWordList = [...topicMap[currentTopic]];
    
    if (currentMode === "wrong" && wrongWords.length === 0) {
        questionTextEl.textContent = "📭 暂无错词";
        extraInfoEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        feedbackEl.innerHTML = `<span style="color:orange">请在其他模式中积累错词。</span>`;
        return;
    }
    refreshWord();
}

function checkAnswer() {
    if (isAnswered) {
        feedbackEl.innerHTML = '<span style="color:orange">⚠️ 已经作答过了，进入下一词吧</span>';
        return;
    }
    if (!currentWordObj) {
        resetGame();
        return;
    }
    
    const elapsed = (Date.now() - currentStartTime) / 1000;
    timeRecords.push(elapsed);
    
    let userAnswer = answerInput.value.trim();
    let isCorrect = false;
    let correctAnswerText = "";
    
    if (currentMode === "en2zh") {
        correctAnswerText = currentWordObj.chinese;
        isCorrect = (userAnswer === correctAnswerText);
    } else {
        // 所有其他模式（recite, random, sequential, wrong）都是中译英
        correctAnswerText = currentWordObj.word.toLowerCase();
        isCorrect = (userAnswer.trim().toLowerCase() === correctAnswerText);
    }
    
    if (isCorrect) {
        correctCount++;
        feedbackEl.innerHTML = '<span style="color:green">✅ 正确！很棒！</span>';
    } else {
        wrongCount++;
        feedbackEl.innerHTML = `<span style="color:#c2410c">❌ 错误，正确答案是 “${correctAnswerText}”</span>`;
        const exists = wrongWords.some(w => w.word === currentWordObj.word && w.chinese === currentWordObj.chinese);
        if (!exists) {
            wrongWords.push({ ...currentWordObj });
        }
    }
    
    practicedCount++;
    updateProgress();
    
    isAnswered = true;
    nextBtn.disabled = false;
    checkBtn.disabled = true;
    updateStats();
    
    feedbackEl.innerHTML += `<span style="font-size:0.8rem; margin-left:10px;"> ⏱️ 本次用时 ${elapsed.toFixed(1)}秒</span>`;
}

function nextWord() {
    if (!isAnswered) {
        feedbackEl.innerHTML = '<span style="color:red">请先检查答案！</span>';
        return;
    }
    if (currentMode === "sequential") {
        currentIndex++;
        if (currentIndex >= currentWordList.length) {
            refreshWord();
            return;
        }
    }
    refreshWord();
}

function clearWrong() {
    wrongWords = [];
    if (currentMode === "wrong") {
        resetGame();
    } else {
        feedbackEl.innerHTML = '<span style="color:green">🗑️ 错词本已清空</span>';
        setTimeout(() => {
            if (feedbackEl.innerHTML === '<span style="color:green">🗑️ 错词本已清空</span>')
                feedbackEl.innerHTML = '';
        }, 1500);
    }
}

function setMode(mode) {
    currentMode = mode;
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
    practicedCount = 0;
    isAnswered = false;
    updateStats();
    currentWordList = [...topicMap[currentTopic]];
    resetGame();
}

function setTopic(topic) {
    currentTopic = topic;
    currentWordList = [...topicMap[topic]];
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
    practicedCount = 0;
    isAnswered = false;
    updateStats();
    resetGame();
}

// ========== 5. 事件绑定 ==========
function bindEvents() {
    checkBtn.onclick = checkAnswer;
    nextBtn.onclick = nextWord;
    resetBtn.onclick = resetGame;
    clearWrongBtn.onclick = clearWrong;
    
    // 模式按钮
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setMode(btn.dataset.mode);
        };
    });
    
    // 题库按钮
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setTopic(btn.dataset.topic);
        };
    });
    
    // 音标区域点击发音
    extraInfoEl.addEventListener('click', () => {
        if (currentWordObj) {
            speakWord(currentWordObj.word);
        }
    });
    
    // 输入框回车智能处理
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!isAnswered && !checkBtn.disabled) {
                checkAnswer();
            } else if (isAnswered && !nextBtn.disabled) {
                nextWord();
            }
        }
    });
}

// 初始化
function init() {
    bindEvents();
    // 默认高亮：背诵练习 和 词汇汇总
    document.querySelector('.mode-btn[data-mode="recite"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "recite";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();
}

window.addEventListener('DOMContentLoaded', init);