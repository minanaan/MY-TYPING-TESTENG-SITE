const wordsDB = [
    { word: "sensor", chinese: "传感器", phonetic: "/ˈsen.sər/" },
    { word: "firmware", chinese: "固件", phonetic: "/ˈfɜːm.weər/" },
    { word: "test case", chinese: "测试用例", phonetic: "/test keɪs/" },
    // ... 继续添加
];

// DOM 元素
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

let currentIndex = 0;          // 当前第几个单词（0开始）
let correctCount = 0;
let wrongCount = 0;
let isAnswered = false;         // 当前单词是否已经作答过（防止重复计分）

// 初始化显示总词数
totalSpan.textContent = wordsDB.length;

// 加载当前单词到界面
function loadWord() {
    if (currentIndex >= wordsDB.length) {
        // 完成所有单词
        chineseEl.textContent = "🎉 恭喜完成！ 🎉";
        phoneticEl.textContent = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        feedbackEl.innerHTML = `<span style="color:green">太棒了！正确率 ${Math.round(correctCount / wordsDB.length * 100)}%</span>`;
        return;
    }
    const item = wordsDB[currentIndex];
    chineseEl.textContent = item.chinese;
    phoneticEl.textContent = item.phonetic || "";
    answerInput.value = "";
    answerInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    isAnswered = false;
    feedbackEl.innerHTML = "";
    answerInput.focus();
    updateProgress();
}

// 更新进度显示
function updateProgress() {
    progressSpan.textContent = currentIndex;
}

// 更新计分板
function updateStats() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
}

// 检查答案
function checkAnswer() {
    if (isAnswered) {
        feedbackEl.innerHTML = '<span style="color:orange">⚠️ 已经作答过了，进入下一词吧</span>';
        return;
    }
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = wordsDB[currentIndex].word.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // 正确
        correctCount++;
        feedbackEl.innerHTML = '<span style="color:green">✅ 正确！很棒！</span>';
        isAnswered = true;
        nextBtn.disabled = false;
        checkBtn.disabled = true;
        updateStats();
    } else {
        // 错误
        wrongCount++;
        feedbackEl.innerHTML = `<span style="color:#c2410c">❌ 错误，正确答案是 “${wordsDB[currentIndex].word}”</span>`;
        isAnswered = true;
        nextBtn.disabled = false;
        checkBtn.disabled = true;
        updateStats();
    }
}

// 下一词
function nextWord() {
    if (!isAnswered && currentIndex < wordsDB.length) {
        feedbackEl.innerHTML = '<span style="color:red">请先检查答案！</span>';
        return;
    }
    currentIndex++;
    loadWord();
}

// 重置整个练习
function resetGame() {
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    isAnswered = false;
    answerInput.disabled = false;
    checkBtn.disabled = false;
    nextBtn.disabled = true;
    updateStats();
    loadWord();
}

// 绑定事件
checkBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextWord);
resetBtn.addEventListener('click', resetGame);
// 按回车键也能触发检查
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !checkBtn.disabled) {
        checkAnswer();
    }
});

// 启动
loadWord();