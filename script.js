// ========== 1. 词库定义（按你提供的四个题库） ==========
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

// 词汇汇总 = 基础+缺陷+操作
const allWords = [...basicWords, ...defectWords, ...operationWords];

// 题库映射（方便切换）
const topicMap = {
    all: allWords,
    basic: basicWords,
    defect: defectWords,
    operation: operationWords
};

// ========== 2. 页面元素绑定 ==========
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
let currentTopic = "all";       // 当前题库
let currentMode = "random";     // 练习模式: random, sequential, wrong
let currentWordList = [];       // 当前题库的所有单词
let currentIndex = 0;           // 顺序模式下的索引
let correctCount = 0;
let wrongCount = 0;
let isAnswered = false;          // 当前题目是否已作答
let wrongWords = [];             // 错词本（存单词对象）

// ========== 4. 辅助函数 ==========
// 更新统计数字
function updateStats() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
}

// 更新进度显示
function updateProgress() {
    if (currentMode === "sequential") {
        progressSpan.textContent = currentIndex + 1;
        totalSpan.textContent = currentWordList.length;
    } else if (currentMode === "wrong") {
        progressSpan.textContent = wrongWords.length;
        totalSpan.textContent = wrongWords.length;
    } else {
        // 随机模式显示总词库数量
        progressSpan.textContent = currentWordList.length;
        totalSpan.textContent = currentWordList.length;
    }
}

// 获取当前应该显示的单词对象
function getCurrentWord() {
    if (currentMode === "sequential") {
        if (currentIndex >= 0 && currentIndex < currentWordList.length) {
            return currentWordList[currentIndex];
        }
        return null;
    } else if (currentMode === "wrong") {
        if (wrongWords.length === 0) return null;
        let randomIndex = Math.floor(Math.random() * wrongWords.length);
        return wrongWords[randomIndex];
    } else { // random
        if (currentWordList.length === 0) return null;
        let randomIndex = Math.floor(Math.random() * currentWordList.length);
        return currentWordList[randomIndex];
    }
}

// 显示单词到页面上
function displayWord() {
    let wordObj = getCurrentWord();
    if (!wordObj) {
        // 没有单词可显示（例如错词本为空或顺序练习完成）
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
    // 更新页面内容
    chineseEl.textContent = wordObj.chinese;
    phoneticEl.textContent = wordObj.phonetic || "";
    answerInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    isAnswered = false;
    feedbackEl.innerHTML = "";
    answerInput.value = "";
    answerInput.focus();
    updateProgress();

    // 设置发音按钮
    speakBtn.onclick = () => {
        let utterance = new SpeechSynthesisUtterance(wordObj.word);
        utterance.lang = 'en-US';
        speechSynthesis.cancel(); // 避免重叠
        speechSynthesis.speak(utterance);
    };
}

// 重置整个练习（保持当前模式和题库）
function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    isAnswered = false;
    if (currentMode === "sequential") currentIndex = 0;
    updateStats();
    currentWordList = [...topicMap[currentTopic]];  // 重新复制题库
    
    // 如果是错词模式且错词本为空，显示提示
    if (currentMode === "wrong" && wrongWords.length === 0) {
        chineseEl.textContent = "📭 暂无错词";
        phoneticEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        feedbackEl.innerHTML = `<span style="color:orange">请先在其他模式中积累错词。</span>`;
        return;
    }
    displayWord();
}

// 检查答案
function checkAnswer() {
    if (isAnswered) {
        feedbackEl.innerHTML = '<span style="color:orange">⚠️ 已经作答过了，进入下一词吧</span>';
        return;
    }
    let wordObj = getCurrentWord();
    if (!wordObj) {
        resetGame();
        return;
    }
    let userAnswer = answerInput.value.trim().toLowerCase();
    let correctAnswer = wordObj.word.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        correctCount++;
        feedbackEl.innerHTML = '<span style="color:green">✅ 正确！很棒！</span>';
    } else {
        wrongCount++;
        feedbackEl.innerHTML = `<span style="color:#c2410c">❌ 错误，正确答案是 “${wordObj.word}”</span>`;
        // 记录到错词本（不重复）
        let exists = wrongWords.some(w => w.word === wordObj.word);
        if (!exists) {
            wrongWords.push({ ...wordObj });
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
            displayWord();  // 显示完成界面
            return;
        }
    }
    displayWord();  // 随机/错词/顺序未完成时，刷新单词
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

// 切换练习模式
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

// ========== 5. 绑定按钮事件和初始化 ==========
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
    
    // 回车键检查
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !checkBtn.disabled) {
            checkAnswer();
        }
    });
}

// 启动应用
function init() {
    bindEvents();
    // 设置默认高亮
    document.querySelector('.mode-btn[data-mode="random"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "random";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();  // 这里会调用 displayWord 显示第一个单词
}

// 确保 DOM 完全加载后再执行
window.addEventListener('DOMContentLoaded', init);