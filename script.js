// ========== 1. 词库定义 ==========
// 原有的四个题库
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

// 单元词汇（10个单元，每个单元10个单词，内容为测试相关，可自行修改）
const unitWords = {
    unit1: [
        { word: "compile", chinese: "编译", phonetic: "/kəmˈpaɪl/" },
        { word: "execute", chinese: "执行", phonetic: "/ˈeksɪkjuːt/" },
        { word: "debug", chinese: "调试", phonetic: "/ˌdiːˈbʌɡ/" },
        { word: "syntax", chinese: "语法", phonetic: "/ˈsɪntæks/" },
        { word: "variable", chinese: "变量", phonetic: "/ˈveəriəbl/" },
        { word: "function", chinese: "函数", phonetic: "/ˈfʌŋkʃən/" },
        { word: "loop", chinese: "循环", phonetic: "/luːp/" },
        { word: "array", chinese: "数组", phonetic: "/əˈreɪ/" },
        { word: "object", chinese: "对象", phonetic: "/ˈɒbdʒɪkt/" },
        { word: "class", chinese: "类", phonetic: "/klɑːs/" }
    ],
    unit2: [
        { word: "interface", chinese: "接口", phonetic: "/ˈɪntəfeɪs/" },
        { word: "inheritance", chinese: "继承", phonetic: "/ɪnˈherɪtəns/" },
        { word: "polymorphism", chinese: "多态", phonetic: "/ˌpɒliˈmɔːfɪzəm/" },
        { word: "encapsulation", chinese: "封装", phonetic: "/ɪnˌkæpsjuˈleɪʃən/" },
        { word: "abstraction", chinese: "抽象", phonetic: "/æbˈstrækʃən/" },
        { word: "algorithm", chinese: "算法", phonetic: "/ˈælɡərɪðəm/" },
        { word: "recursion", chinese: "递归", phonetic: "/rɪˈkɜːʃən/" },
        { word: "pointer", chinese: "指针", phonetic: "/ˈpɔɪntər/" },
        { word: "reference", chinese: "引用", phonetic: "/ˈrefrəns/" },
        { word: "exception", chinese: "异常", phonetic: "/ɪkˈsepʃən/" }
    ],
    unit3: [
        { word: "thread", chinese: "线程", phonetic: "/θred/" },
        { word: "process", chinese: "进程", phonetic: "/ˈprəʊses/" },
        { word: "synchronize", chinese: "同步", phonetic: "/ˈsɪŋkrənaɪz/" },
        { word: "deadlock", chinese: "死锁", phonetic: "/ˈdedlɒk/" },
        { word: "semaphore", chinese: "信号量", phonetic: "/ˈseməfɔːr/" },
        { word: "mutex", chinese: "互斥锁", phonetic: "/ˈmjuːteks/" },
        { word: "heap", chinese: "堆", phonetic: "/hiːp/" },
        { word: "stack", chinese: "栈", phonetic: "/stæk/" },
        { word: "queue", chinese: "队列", phonetic: "/kjuː/" },
        { word: "buffer", chinese: "缓冲区", phonetic: "/ˈbʌfər/" }
    ],
    unit4: [
        { word: "database", chinese: "数据库", phonetic: "/ˈdeɪtəbeɪs/" },
        { word: "query", chinese: "查询", phonetic: "/ˈkwɪəri/" },
        { word: "index", chinese: "索引", phonetic: "/ˈɪndeks/" },
        { word: "transaction", chinese: "事务", phonetic: "/trænˈzækʃən/" },
        { word: "commit", chinese: "提交", phonetic: "/kəˈmɪt/" },
        { word: "rollback", chinese: "回滚", phonetic: "/ˈrəʊlbæk/" },
        { word: "primary key", chinese: "主键", phonetic: "/ˈpraɪməri kiː/" },
        { word: "foreign key", chinese: "外键", phonetic: "/ˈfɒrɪn kiː/" },
        { word: "join", chinese: "连接", phonetic: "/dʒɔɪn/" },
        { word: "normalize", chinese: "规范化", phonetic: "/ˈnɔːməlaɪz/" }
    ],
    unit5: [
        { word: "network", chinese: "网络", phonetic: "/ˈnetwɜːk/" },
        { word: "protocol", chinese: "协议", phonetic: "/ˈprəʊtəkɒl/" },
        { word: "packet", chinese: "数据包", phonetic: "/ˈpækɪt/" },
        { word: "router", chinese: "路由器", phonetic: "/ˈruːtər/" },
        { word: "switch", chinese: "交换机", phonetic: "/swɪtʃ/" },
        { word: "firewall", chinese: "防火墙", phonetic: "/ˈfaɪəwɔːl/" },
        { word: "latency", chinese: "延迟", phonetic: "/ˈleɪtənsi/" },
        { word: "bandwidth", chinese: "带宽", phonetic: "/ˈbændwɪdθ/" },
        { word: "IP address", chinese: "IP地址", phonetic: "/aɪ piː əˈdres/" },
        { word: "domain", chinese: "域名", phonetic: "/dəˈmeɪn/" }
    ],
    unit6: [
        { word: "API", chinese: "应用程序接口", phonetic: "/ˌeɪ piː ˈaɪ/" },
        { word: "endpoint", chinese: "端点", phonetic: "/ˈendpɔɪnt/" },
        { word: "request", chinese: "请求", phonetic: "/rɪˈkwest/" },
        { word: "response", chinese: "响应", phonetic: "/rɪˈspɒns/" },
        { word: "JSON", chinese: "JSON格式", phonetic: "/ˈdʒeɪsən/" },
        { word: "XML", chinese: "可扩展标记语言", phonetic: "/ˌeks em ˈel/" },
        { word: "authentication", chinese: "认证", phonetic: "/ɔːˌθentɪˈkeɪʃən/" },
        { word: "authorization", chinese: "授权", phonetic: "/ˌɔːθəraɪˈzeɪʃən/" },
        { word: "token", chinese: "令牌", phonetic: "/ˈtəʊkən/" },
        { word: "session", chinese: "会话", phonetic: "/ˈseʃən/" }
    ],
    unit7: [
        { word: "frontend", chinese: "前端", phonetic: "/ˈfrʌntend/" },
        { word: "backend", chinese: "后端", phonetic: "/ˈbækend/" },
        { word: "framework", chinese: "框架", phonetic: "/ˈfreɪmwɜːk/" },
        { word: "library", chinese: "库", phonetic: "/ˈlaɪbrəri/" },
        { word: "component", chinese: "组件", phonetic: "/kəmˈpəʊnənt/" },
        { word: "state", chinese: "状态", phonetic: "/steɪt/" },
        { word: "props", chinese: "属性", phonetic: "/prɒps/" },
        { word: "hook", chinese: "钩子", phonetic: "/hʊk/" },
        { word: "router", chinese: "路由", phonetic: "/ˈruːtər/" },
        { word: "build", chinese: "构建", phonetic: "/bɪld/" }
    ],
    unit8: [
        { word: "version control", chinese: "版本控制", phonetic: "/ˈvɜːʃən kənˈtrəʊl/" },
        { word: "repository", chinese: "仓库", phonetic: "/rɪˈpɒzɪtəri/" },
        { word: "commit", chinese: "提交", phonetic: "/kəˈmɪt/" },
        { word: "branch", chinese: "分支", phonetic: "/brɑːntʃ/" },
        { word: "merge", chinese: "合并", phonetic: "/mɜːdʒ/" },
        { word: "pull request", chinese: "拉取请求", phonetic: "/pʊl rɪˈkwest/" },
        { word: "clone", chinese: "克隆", phonetic: "/kləʊn/" },
        { word: "fork", chinese: "复刻", phonetic: "/fɔːk/" },
        { word: "remote", chinese: "远程", phonetic: "/rɪˈməʊt/" },
        { word: "conflict", chinese: "冲突", phonetic: "/ˈkɒnflɪkt/" }
    ],
    unit9: [
        { word: "cloud computing", chinese: "云计算", phonetic: "/klaʊd kəmˈpjuːtɪŋ/" },
        { word: "virtualization", chinese: "虚拟化", phonetic: "/ˌvɜːtʃuəlaɪˈzeɪʃən/" },
        { word: "container", chinese: "容器", phonetic: "/kənˈteɪnər/" },
        { word: "orchestration", chinese: "编排", phonetic: "/ˌɔːkɪˈstreɪʃən/" },
        { word: "microservice", chinese: "微服务", phonetic: "/ˈmaɪkrəʊˌsɜːvɪs/" },
        { word: "serverless", chinese: "无服务器", phonetic: "/ˈsɜːvələs/" },
        { word: "scalability", chinese: "可扩展性", phonetic: "/ˌskeɪləˈbɪlɪti/" },
        { word: "high availability", chinese: "高可用性", phonetic: "/haɪ əˌveɪləˈbɪlɪti/" },
        { word: "load balancer", chinese: "负载均衡器", phonetic: "/ləʊd ˈbælənsər/" },
        { word: "disaster recovery", chinese: "灾难恢复", phonetic: "/dɪˈzɑːstər rɪˈkʌvəri/" }
    ],
    unit10: [
        { word: "machine learning", chinese: "机器学习", phonetic: "/məˈʃiːn ˈlɜːnɪŋ/" },
        { word: "neural network", chinese: "神经网络", phonetic: "/ˈnjʊərəl ˈnetwɜːk/" },
        { word: "training", chinese: "训练", phonetic: "/ˈtreɪnɪŋ/" },
        { word: "inference", chinese: "推理", phonetic: "/ˈɪnfərəns/" },
        { word: "feature", chinese: "特征", phonetic: "/ˈfiːtʃər/" },
        { word: "label", chinese: "标签", phonetic: "/ˈleɪbəl/" },
        { word: "overfitting", chinese: "过拟合", phonetic: "/ˌəʊvəˈfɪtɪŋ/" },
        { word: "underfitting", chinese: "欠拟合", phonetic: "/ˌʌndəˈfɪtɪŋ/" },
        { word: "accuracy", chinese: "准确率", phonetic: "/ˈækjərəsi/" },
        { word: "dataset", chinese: "数据集", phonetic: "/ˈdeɪtəset/" }
    ]
};

// 合并所有单元词汇为一个对象，同时保留原始题库
const allWords = [...basicWords, ...defectWords, ...operationWords];
const topicMap = {
    all: allWords,
    basic: basicWords,
    defect: defectWords,
    operation: operationWords
};

// 动态将 unitWords 添加到 topicMap
for (let i = 1; i <= 10; i++) {
    const key = `unit${i}`;
    topicMap[key] = unitWords[key];
}

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
const unitSelect = document.getElementById('unitSelect');

// ========== 3. 全局变量 ==========
let currentTopic = "all";          // 当前词库标识
let currentMode = "recite";        // 练习模式
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
    } else { // recite, random, en2zh 随机抽取
        if (currentWordList.length === 0) return null;
        const rand = Math.floor(Math.random() * currentWordList.length);
        return currentWordList[rand];
    }
}

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
    if (currentMode === "recite") {
        // 背诵练习：同时显示中文、音标和英文单词本身
        questionTextEl.innerHTML = `${currentWordObj.chinese}<br><span style="font-size:1.8rem;">${currentWordObj.word}</span>`;
        extraInfoEl.textContent = currentWordObj.phonetic || "";
    } else if (currentMode === "en2zh") {
        // 英中练习：显示英文，输入中文
        questionTextEl.textContent = currentWordObj.word;
        extraInfoEl.textContent = currentWordObj.phonetic || "";
    } else {
        // random, sequential, wrong 均显示中文（中译英）
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
        // recite, random, sequential, wrong 都是中译英（或背诵模式要求输入英文）
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
    // 同步下拉框选择
    if (topic.startsWith('unit')) {
        unitSelect.value = topic;
    } else {
        unitSelect.value = 'unit1'; // 默认值，不影响展示
    }
}

// 监听下拉框变化
function bindUnitSelect() {
    unitSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        // 清除其他词库按钮的高亮
        document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
        setTopic(selected);
    });
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
    
    // 词库按钮（四个固定词库）
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setTopic(btn.dataset.topic);
        };
    });
    
    bindUnitSelect();
    
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
    // 默认高亮背诵练习和词汇汇总
    document.querySelector('.mode-btn[data-mode="recite"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "recite";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();
}

window.addEventListener('DOMContentLoaded', init);