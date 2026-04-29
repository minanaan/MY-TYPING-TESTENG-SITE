// ========== 1. 词库定义 ==========
// 基础测试（22个）
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

// 缺陷问题（10个）
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

// 测试操作（10个）
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
const chineseEl = document.getElementById('chineseWord');
const phoneticEl = document.getElementById('phonetic');
const answerInput = document.getElementById('answerInput');
const feedbackEl = document.getElementById('feedback');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const correctSpan = document.getElementById('correctCount');
const wrongSpan = document.getElementById('wrongCount');
const progressSpan = document.getElementById('progress');
const totalSpan = document.getElementById('totalWords');
const clearWrongBtn = document.getElementById('clearWrongBtn');
const speakBtn = document.getElementById('speakBtn');

// ========== 3. 全局变量 ==========
let currentTopic = "all";
let currentMode = "random";
let currentWordList = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let isAnswered = false;
let wrongWords = [];

// **关键修复：存储当前正在练习的单词对象**
let currentWordObj = null;

// ========== 4. 辅助函数 ==========
function updateStats() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
}

function updateProgress() {
    if (currentMode === "sequential") {
        progressSpan.textContent = currentIndex + 1;
        totalSpan.textContent = currentWordList.length;
    } else if (currentMode === "wrong") {
        progressSpan.textContent = wrongWords.length;
        totalSpan.textContent = wrongWords.length;
    } else {
        progressSpan.textContent = currentWordList.length;
        totalSpan.textContent = currentWordList.length;
    }
}

// 根据当前模式和题库，随机/顺序获取一个单词对象（不保存）
function fetchNewWordObj() {
    if (currentMode === "sequential") {
        if (currentIndex >= 0 && currentIndex < currentWordList.length) {
            return currentWordList[currentIndex];
        }
        return null;
    } else if (currentMode === "wrong") {
        if (wrongWords.length === 0) return null;
        let rand = Math.floor(Math.random() * wrongWords.length);
        return wrongWords[rand];
    } else { // random
        if (currentWordList.length === 0) return null;
        let rand = Math.floor(Math.random() * currentWordList.length);
        return currentWordList[rand];
    }
}

// 刷新界面：获取新单词并保存到 currentWordObj
function refreshWord() {
    currentWordObj = fetchNewWordObj();
    if (!currentWordObj) {
        chineseEl.textContent = "🎉 恭喜完成！ 🎉";
        phoneticEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        let total = correctCount + wrongCount;
        let percent = total === 0 ? 0 : Math.round(correctCount / total * 100);
        feedbackEl.innerHTML = `<span style="color:green">练习完成！正确率 ${percent}%</span>`;
        return;
    }
    // 显示单词、音标
    chineseEl.textContent = currentWordObj.chinese;
    phoneticEl.textContent = currentWordObj.phonetic || "";
    answerInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    isAnswered = false;
    feedbackEl.innerHTML = "";
    answerInput.value = "";
    answerInput.focus();
    updateProgress();

    // 发音按钮
    speakBtn.onclick = () => {
        let utterance = new SpeechSynthesisUtterance(currentWordObj.word);
        utterance.lang = 'en-US';
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };
}

// 重置全部状态
function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    isAnswered = false;
    if (currentMode === "sequential") currentIndex = 0;
    updateStats();
    currentWordList = [...topicMap[currentTopic]];
    
    if (currentMode === "wrong" && wrongWords.length === 0) {
        chineseEl.textContent = "📭 暂无错词";
        phoneticEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        feedbackEl.innerHTML = `<span style="color:orange">请在其他模式中积累错词。</span>`;
        return;
    }
    refreshWord();
}

// 检查答案（使用缓存的 currentWordObj）
function checkAnswer() {
    if (isAnswered) {
        feedbackEl.innerHTML = '<span style="color:orange">⚠️ 已经作答过了，进入下一词吧</span>';
        return;
    }
    if (!currentWordObj) {
        resetGame();
        return;
    }
    let userAnswer = answerInput.value.trim().toLowerCase();
    let correctAnswer = currentWordObj.word.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        correctCount++;
        feedbackEl.innerHTML = '<span style="color:green">✅ 正确！很棒！</span>';
    } else {
        wrongCount++;
        feedbackEl.innerHTML = `<span style="color:#c2410c">❌ 错误，正确答案是 “${currentWordObj.word}”</span>`;
        // 加入错词本（去重）
        let exists = wrongWords.some(w => w.word === currentWordObj.word);
        if (!exists) {
            wrongWords.push({ ...currentWordObj });
        }
    }
    isAnswered = true;
    nextBtn.disabled = false;
    checkBtn.disabled = true;
    updateStats();
}

// 下一词
function nextWord() {
    if (!isAnswered) {
        feedbackEl.innerHTML = '<span style="color:red">请先检查答案！</span>';
        return;
    }
    if (currentMode === "sequential") {
        currentIndex++;
        if (currentIndex >= currentWordList.length) {
            refreshWord();   // 显示完成界面
            return;
        }
    }
    refreshWord();  // 获取下一个单词
}

// 清空错词本
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

// 切换模式
function setMode(mode) {
    currentMode = mode;
    resetGame();
}

// 切换题库
function setTopic(topic) {
    currentTopic = topic;
    currentWordList = [...topicMap[topic]];
    if (currentMode === "sequential") currentIndex = 0;
    resetGame();
}

// ========== 5. 事件绑定 ==========
function bindEvents() {
    checkBtn.onclick = checkAnswer;
    nextBtn.onclick = nextWord;
    resetBtn.onclick = resetGame;
    clearWrongBtn.onclick = clearWrong;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setMode(btn.dataset.mode);
        };
    });
    
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setTopic(btn.dataset.topic);
        };
    });
    
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !checkBtn.disabled) {
            checkAnswer();
        }
    });
}

// 初始化
function init() {
    bindEvents();
    document.querySelector('.mode-btn[data-mode="random"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "random";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();
}

window.addEventListener('DOMContentLoaded', init);