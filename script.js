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
let currentMode = "random";      // 'random', 'sequential', 'wrong', 'en2zh'
let currentWordList = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let isAnswered = false;
let wrongWords = [];             // 错词本，存完整单词对象

// 当前正在练习的单词对象
let currentWordObj = null;

// 计时相关
let currentStartTime = null;     // 当前单词开始时间 (毫秒)
let timeRecords = [];            // 存储每次答题的用时（秒）

// ========== 4. 辅助函数 ==========
// 更新统计（正确/错误/准确率/平均用时）
function updateStats() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
    const total = correctCount + wrongCount;
    const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    accuracySpan.textContent = accuracy;
    
    // 平均用时
    if (timeRecords.length === 0) {
        avgTimeSpan.textContent = "0.0";
    } else {
        const avg = timeRecords.reduce((a, b) => a + b, 0) / timeRecords.length;
        avgTimeSpan.textContent = avg.toFixed(1);
    }
}

function updateProgress() {
    if (currentMode === "sequential") {
        progressSpan.textContent = currentIndex + 1;
        totalSpan.textContent = currentWordList.length;
    } else if (currentMode === "wrong") {
        progressSpan.textContent = wrongWords.length;
        totalSpan.textContent = wrongWords.length;
    } else {
        // random 或 en2zh 显示总词库数量（不按顺序）
        progressSpan.textContent = currentWordList.length;
        totalSpan.textContent = currentWordList.length;
    }
}

// 根据当前模式和题库获取一个新的单词对象（不改变状态）
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
    } else { // random 或 en2zh (随机抽取)
        if (currentWordList.length === 0) return null;
        const rand = Math.floor(Math.random() * currentWordList.length);
        return currentWordList[rand];
    }
}

// 刷新界面：获取新单词并计时
function refreshWord() {
    // 记录上一个单词的用时（如果有 currentStartTime 且已经作答过）
    // 注意：计时在提交答案时已记录，这里不需要处理
    
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
    
    // 根据模式显示不同的题目
    if (currentMode === "en2zh") {
        // 英中练习：显示英文，要求输入中文
        questionTextEl.textContent = currentWordObj.word;
        extraInfoEl.textContent = currentWordObj.phonetic || "";
    } else {
        // 中译英（拼写）：显示中文，可附带音标辅助
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
    
    // 开始计时
    currentStartTime = Date.now();
    
    updateProgress();
    updateStats();  // 刷新平均用时
}

// 重置游戏状态（不清空错词本，但重置正确/错误计数和计时记录）
function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
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

// 检查答案（支持中译英和英中模式）
function checkAnswer() {
    if (isAnswered) {
        feedbackEl.innerHTML = '<span style="color:orange">⚠️ 已经作答过了，进入下一词吧</span>';
        return;
    }
    if (!currentWordObj) {
        resetGame();
        return;
    }
    
    // 计算用时（秒）
    const elapsed = (Date.now() - currentStartTime) / 1000;
    timeRecords.push(elapsed);
    
    let userAnswer = answerInput.value.trim();
    let isCorrect = false;
    let correctAnswerText = "";
    
    if (currentMode === "en2zh") {
        // 英中练习：比较中文（忽略大小写、前后空格，中文完全匹配即可）
        const expectedChinese = currentWordObj.chinese;
        correctAnswerText = expectedChinese;
        isCorrect = (userAnswer === expectedChinese);
    } else {
        // 中译英拼写：比较英文（忽略大小写和前后空格）
        const expectedWord = currentWordObj.word.toLowerCase();
        correctAnswerText = expectedWord;
        isCorrect = (userAnswer.trim().toLowerCase() === expectedWord);
    }
    
    if (isCorrect) {
        correctCount++;
        feedbackEl.innerHTML = '<span style="color:green">✅ 正确！很棒！</span>';
    } else {
        wrongCount++;
        feedbackEl.innerHTML = `<span style="color:#c2410c">❌ 错误，正确答案是 “${correctAnswerText}”</span>`;
        // 加入错词本（去重，基于 word 和 chinese 联合唯一）
        const exists = wrongWords.some(w => w.word === currentWordObj.word && w.chinese === currentWordObj.chinese);
        if (!exists) {
            wrongWords.push({ ...currentWordObj });
        }
    }
    
    isAnswered = true;
    nextBtn.disabled = false;
    checkBtn.disabled = true;
    updateStats();
    
    // 可选：显示本次用时
    feedbackEl.innerHTML += `<span style="font-size:0.8rem; margin-left:10px;"> ⏱️ 本次用时 ${elapsed.toFixed(1)}秒</span>`;
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
    refreshWord();
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
    // 重置顺序索引
    currentIndex = 0;
    // 重置计时记录（但不清空正确率？通常模式切换应该重置会话，避免混合统计）
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
    isAnswered = false;
    updateStats();
    currentWordList = [...topicMap[currentTopic]];
    resetGame();  // 刷新界面
}

// 切换题库
function setTopic(topic) {
    currentTopic = topic;
    currentWordList = [...topicMap[topic]];
    if (currentMode === "sequential") currentIndex = 0;
    // 切换题库时重置统计
    correctCount = 0;
    wrongCount = 0;
    timeRecords = [];
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
    // 默认高亮
    document.querySelector('.mode-btn[data-mode="random"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "random";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();
}

window.addEventListener('DOMContentLoaded', init);