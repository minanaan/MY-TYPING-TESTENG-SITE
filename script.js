// ========================= 词库解析与构建 =========================
// 将用户提供的文本直接嵌入（格式：英文：中文｜例句）
const rawBasicText = `
A/B testing：A/B 测试｜We use A/B testing to compare two variants.
acceptance testing：验收测试｜Acceptance testing decides whether to accept the system.
accessibility：易访问性｜Test accessibility for all users.
actual result：实测结果｜Compare actual result with expected result.
ad hoc testing：随机测试｜Ad hoc testing is informal without test design.
adaptability：适应性｜Check adaptability to different environments.
Agile software development：敏捷软件开发｜Adopt agile in iterative development.
alpha testing：Alpha 测试｜Alpha testing is done in dev environment.
analytical test strategy：分析式测试策略｜Use analytical test strategy for coverage.
API testing：API 测试｜API testing submits requests via interface.
application programming interface (API)：应用程序编程接口｜Call API for data exchange.
assertion：断言｜Add assertion to validate correct execution.
beta testing：Beta 测试｜Beta testing is done at external site.
black-box testing：黑盒测试｜Black-box testing bases on specification.
boundary value analysis (BVA)：边界值分析｜BVA tests boundary values.
branch testing：分支测试｜Branch testing covers all control branches.
behavior-driven development (BDD)：行为驱动开发｜BDD focuses on expected behavior.
capacity testing：容量测试｜Capacity testing evaluates system limit.
checklist-based testing：基于检查表的测试｜Test items with a checklist.
combinatorial testing：组合测试｜Combinatorial testing covers value combinations.
component testing：组件测试｜Component testing tests individual units.
compatibility testing：兼容性测试｜Compatibility testing checks cross-system work.
condition testing：条件测试｜Condition testing covers atomic conditions.
confirmation testing：确认测试｜Confirmation testing verifies fixed defects.
continuous testing：持续测试｜Continuous testing runs throughout lifecycle.
contract testing：契约测试｜Contract testing verifies interface contracts.
coverage：覆盖｜Coverage measures test completion.
cross-browser compatibility：跨浏览器兼容性｜Test on multiple browsers.
crowd testing：众测｜Crowd testing uses many external testers.
data-driven testing (DDT)：数据驱动测试｜DDT separates data and scripts.
decision table testing：判定表测试｜Design cases by decision table.
domain testing：域测试｜Domain testing covers equivalence boundaries.
dynamic testing：动态测试｜Dynamic testing runs the test object.
end-to-end (E2E) testing：端到端测试｜E2E testing tests full business flow.
equivalence partitioning (EP)：等价类划分｜EP divides input into groups.
error guessing：错误猜测｜Error guessing uses tester experience.
exploratory testing：探索性测试｜Exploratory testing designs dynamically.
functional testing：功能测试｜Functional testing checks functional suitability.
grey-box testing：灰盒测试｜Grey-box combines black and white box.
GUI testing：GUI 测试｜GUI testing interacts with visual interface.
hardware-in-the-loop (HiL)：硬件在环｜HiL tests real hardware in simulation.
high-level test case：概要测试用例｜Write abstract high-level test cases.
integration testing：集成测试｜Integration testing tests component interactions.
interface testing：接口测试｜Interface testing verifies data passing.
keyword-driven testing (KDT)：关键字驱动测试｜KDT uses reusable keywords.
load testing：负载测试｜Load testing tests under varying loads.
low-level test case：详细测试用例｜Low-level test cases have concrete values.
model-based testing (MBT)：基于模型的测试｜MBT derives tests from models.
negative testing：逆向测试｜Negative testing uses invalid inputs.
non-functional testing：非功能测试｜Non-functional testing tests quality attributes.
pairwise testing：成对测试｜Pairwise testing covers parameter pairs.
performance testing：性能测试｜Performance testing checks response time.
portability testing：可移植性测试｜Portability testing checks environment migration.
regression testing：回归测试｜Regression testing finds unintended defects.
requirements-based testing：基于需求的测试｜Design cases from requirements.
risk-based testing：基于风险的测试｜Prioritize tests by risk level.
scenario-based testing：基于场景的测试｜Test real user scenarios.
security testing：安全性测试｜Security testing defends against attacks.
smoke test：冒烟测试｜Smoke test checks core functions.
state transition testing：状态转移测试｜Test state changes in the system.
static testing：静态测试｜Static testing does not execute code.
stress testing：压力测试｜Stress testing tests beyond workload limits.
system testing：系统测试｜System testing verifies the whole system.
test：测试｜Execute test to verify quality.
test approach：测试方法｜Define test approach for the project.
test automation：测试自动化｜Automate repetitive test execution.
test basis：测试依据｜Use requirements as test basis.
test case：测试用例｜Test case includes input and expected result.
test condition：测试条件｜Extract test conditions from test basis.
test design：测试设计｜Test design derives test cases.
test environment：测试环境｜Set up stable test environment.
test execution：测试执行｜Run test cases in test execution.
test level：测试级别｜Test levels include component and system.
test object：测试对象｜The system is the main test object.
test plan：测试计划｜Write test plan before testing.
test strategy：测试策略｜Test strategy guides overall testing.
test suite：测试套件｜Organize test cases into test suite.
test technique：测试技术｜Use black-box and white-box techniques.
test type：测试类型｜Functional and performance are test types.
testability：易测试性｜Improve testability of components.
testing：测试｜Testing evaluates product quality.
unit testing：单元测试｜Unit testing tests smallest components.
usability testing：易用性测试｜Usability testing checks user experience.
user acceptance testing (UAT)：用户验收测试｜UAT is done by end users.
V-model：V - 模型｜V-model matches dev phases to test levels.
white-box testing：白盒测试｜White-box testing checks internal code.
`;

const rawDefectText = `
abnormal end：异常终止｜Program causes abnormal end.
anomaly：异常｜Record every anomaly in test.
attack vector：攻击向量｜Block attack vectors to prevent intrusion.
attacker：攻击者｜Prevent attackers from unauthorized access.
bug hunting：缺陷采集｜Bug hunting motivates finding defects.
code injection：代码注入｜Prevent code injection attacks.
defect：缺陷｜Log every defect found in testing.
defect density：缺陷密度｜Calculate defects per unit size.
defect detection percentage (DDP)：缺陷检测率｜DDP measures test effectiveness.
defect management：缺陷管理｜Manage defects from find to fix.
defect report：缺陷报告｜Write clear defect report for developers.
defect prevention：缺陷预防｜Defect prevention reduces recurrence.
denial of service (DoS)：拒绝服务｜Defend against DoS attacks.
error：错误｜Human error leads to defects.
escaped defect：遗漏缺陷｜Escaped defects reach end users.
failure：失效｜Failure is non-compliance with requirements.
failure mode：失效模式｜Analyze failure modes of the system.
failure mode and effect analysis (FMEA)：失效模式和影响分析｜FMEA identifies risks.
fault injection：故障注入｜Fault injection tests robustness.
fault tolerance：容错性｜Fault tolerance resists defects.
false-negative result：假阴性结果｜False-negative misses real defects.
false-positive result：假阳性结果｜False-positive reports non-existing defects.
hacker：黑客｜Hackers attempt malicious attacks.
insider threat：内部威胁｜Prevent threats from internal users.
malware：恶意软件｜Malware harms system components.
memory leak：内存泄漏｜Memory leak fails to release resources.
root cause：根本原因｜Find root cause to avoid repeats.
root cause analysis (RCA)：根本原因分析｜RCA finds defect source.
vulnerability：漏洞｜Vulnerability allows successful attacks.
weakness：弱点｜Weakness may cause security issues.
wild pointer：野指针｜Wild pointer accesses invalid memory.
`;

const rawOperationText = `
build verification test (BVT)：构建验证测试｜BVT validates new build integrity.
capture/playback：捕获 / 回放｜Capture/playback generates test scripts.
checklist-based reviewing：基于检查表的评审｜Review using standard checklist.
computer forensics：电子取证｜Forensics analyzes attack details.
control flow analysis：控制流分析｜Analyze code execution paths.
data flow analysis：数据流分析｜Data flow analysis checks variable lifecycle.
debugging：调试｜Debugging removes failure causes.
dynamic analysis：动态分析｜Dynamic analysis analyzes runtime behavior.
formal review：正式评审｜Formal review follows defined process.
inspection：审查｜Inspection is a strict formal review.
load generator：负载发生器｜Load generator simulates user traffic.
maintenance testing：维护测试｜Maintenance testing checks system changes.
monitoring tool：监测工具｜Tool monitors system under test.
peer review：同行评审｜Peer review checks work products.
penetration testing：渗透测试｜Penetration testing simulates attacks.
review：评审｜Review finds defects early.
static analysis：静态分析｜Static analysis checks code without run.
test automation framework：测试自动化框架｜Framework supports test scripts.
test data：测试数据｜Prepare valid and invalid test data.
test data management：测试数据管理｜Manage test data compliantly.
test driver：测试驱动｜Driver calls the tested component.
test estimation：测试估算｜Estimate time and effort for testing.
test fixture：测试夹具｜Fixture ensures repeatable test setup.
test harness：测试用具｜Harness contains drivers and stubs.
test log：测试日志｜Record steps in test log.
test management：测试管理｜Manage test progress and resources.
test monitoring：测试监测｜Monitor test progress against plan.
test report：测试报告｜Test report summarizes results.
test script：测试脚本｜Script automates test execution.
test stub：测试桩｜Stub simulates lower components.
test double：测试替身｜Double replaces dependent components.
testing in production：生产中的测试｜Test safely in live environment.
walkthrough：走查｜Author leads walkthrough of documents.
`;

// 原有词库（保留）
const oldBasicWords = [
    { word: "test", chinese: "测试", phonetic: "/test/", example: "Run the test to verify the function." },
    { word: "test case", chinese: "测试用例", phonetic: "/test keɪs/", example: "Write test cases for each scenario." },
    { word: "test report", chinese: "测试报告", phonetic: "/test rɪˈpɔːt/", example: "The test report summarizes all results." },
    { word: "test result", chinese: "测试结果", phonetic: "/test rɪˈzʌlt/", example: "Compare actual with expected test result." },
    { word: "test process", chinese: "测试流程", phonetic: "/test ˈprəʊses/", example: "Define a clear test process." },
    { word: "test step", chinese: "测试步骤", phonetic: "/test step/", example: "Follow each test step carefully." },
    { word: "test plan", chinese: "测试计划", phonetic: "/test plæn/", example: "The test plan outlines the scope." },
    { word: "test environment", chinese: "测试环境", phonetic: "/test ɪnˈvaɪrənmənt/", example: "Set up a stable test environment." },
    { word: "test data", chinese: "测试数据", phonetic: "/test ˈdeɪtə/", example: "Prepare valid and invalid test data." },
    { word: "test tool", chinese: "测试工具", phonetic: "/test tuːl/", example: "Use automated test tools." },
    { word: "device", chinese: "设备", phonetic: "/dɪˈvaɪs/", example: "Connect the device to the computer." },
    { word: "sensor", chinese: "传感器", phonetic: "/ˈsen.sər/", example: "The sensor detects temperature changes." },
    { word: "firmware", chinese: "固件", phonetic: "/ˈfɜːm.weər/", example: "Update the firmware to fix bugs." },
    { word: "signal", chinese: "信号", phonetic: "/ˈsɪɡ.nəl/", example: "Check the signal strength." },
    { word: "data", chinese: "数据", phonetic: "/ˈdeɪtə/", example: "Store data securely." },
    { word: "connection", chinese: "连接", phonetic: "/kəˈnek.ʃən/", example: "The connection was lost." },
    { word: "transmission", chinese: "传输", phonetic: "/trænzˈmɪʃ.ən/", example: "Data transmission is fast." },
    { word: "power", chinese: "电源", phonetic: "/ˈpaʊər/", example: "Turn on the power." },
    { word: "run", chinese: "运行", phonetic: "/rʌn/", example: "Run the script." },
    { word: "start", chinese: "启动", phonetic: "/stɑːt/", example: "Start the service." },
    { word: "stop", chinese: "停止", phonetic: "/stɒp/", example: "Stop the process." },
    { word: "reset", chinese: "重置", phonetic: "/ˌriːˈset/", example: "Reset the device to default." }
];

const oldDefectWords = [
    { word: "defect", chinese: "缺陷", phonetic: "/ˈdiː.fekt/", example: "Log the defect in the tracking system." },
    { word: "bug", chinese: "漏洞", phonetic: "/bʌɡ/", example: "The bug causes crash." },
    { word: "error", chinese: "错误", phonetic: "/ˈer.ər/", example: "Handle the error gracefully." },
    { word: "fault", chinese: "故障", phonetic: "/fɔːlt/", example: "A fault occurred in the module." },
    { word: "problem", chinese: "问题", phonetic: "/ˈprɒb.ləm/", example: "Identify the root problem." },
    { word: "abnormal", chinese: "异常", phonetic: "/æbˈnɔː.məl/", example: "Abnormal termination detected." },
    { word: "failure", chinese: "失败", phonetic: "/ˈfeɪ.ljər/", example: "The test ended in failure." },
    { word: "crash", chinese: "崩溃", phonetic: "/kræʃ/", example: "The system may crash under load." },
    { word: "warning", chinese: "警告", phonetic: "/ˈwɔː.nɪŋ/", example: "Warning: low disk space." },
    { word: "error code", chinese: "错误代码", phonetic: "/ˈer.ər koʊd/", example: "Error code 404 means not found." }
];

const oldOperationWords = [
    { word: "run test", chinese: "执行测试", phonetic: "/rʌn test/", example: "Run the test suite daily." },
    { word: "check", chinese: "检查", phonetic: "/tʃek/", example: "Check the output for correctness." },
    { word: "verify", chinese: "验证", phonetic: "/ˈver.ɪ.faɪ/", example: "Verify that the fix works." },
    { word: "confirm", chinese: "确认", phonetic: "/kənˈfɜːm/", example: "Confirm the deletion." },
    { word: "record", chinese: "记录", phonetic: "/rɪˈkɔːd/", example: "Record the test results." },
    { word: "report", chinese: "报告", phonetic: "/rɪˈpɔːt/", example: "Report the issue to the team." },
    { word: "debug", chinese: "调试", phonetic: "/ˌdiːˈbʌɡ/", example: "Debug the code step by step." },
    { word: "simulate", chinese: "模拟", phonetic: "/ˈsɪm.jə.leɪt/", example: "Simulate high traffic load." },
    { word: "monitor", chinese: "监控", phonetic: "/ˈmɒn.ɪ.tər/", example: "Monitor system performance." },
    { word: "analyze", chinese: "分析", phonetic: "/ˈæn.əl.aɪz/", example: "Analyze the root cause." }
];

// 解析文本函数
function parseWordList(rawText) {
    const lines = rawText.trim().split('\n');
    const result = [];
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        // 格式："英文：中文｜例句"
        let parts = line.split('｜');
        let left = parts[0];
        let example = parts[1] ? parts[1].trim() : '';
        let colonIndex = left.indexOf('：');
        if (colonIndex === -1) colonIndex = left.indexOf(':');
        if (colonIndex === -1) continue;
        let word = left.substring(0, colonIndex).trim();
        let chinese = left.substring(colonIndex + 1).trim();
        // 自动生成音标（粗略）
        let phonetic = '/' + word.replace(/[^a-z]/gi, '').toLowerCase() + '/';
        result.push({ word, chinese, phonetic, example });
    }
    return result;
}

// 构建新词库
const newBasicWords = parseWordList(rawBasicText);
const newDefectWords = parseWordList(rawDefectText);
const newOperationWords = parseWordList(rawOperationText);

// 合并新旧词库（去重：按 word 小写）
function mergeUnique(oldArr, newArr) {
    const map = new Map();
    [...oldArr, ...newArr].forEach(item => {
        const key = item.word.toLowerCase();
        if (!map.has(key)) {
            map.set(key, item);
        }
    });
    return Array.from(map.values());
}

const basicWords = mergeUnique(oldBasicWords, newBasicWords);
const defectWords = mergeUnique(oldDefectWords, newDefectWords);
const operationWords = mergeUnique(oldOperationWords, newOperationWords);

// 总词库（词汇汇总）
const allWords = [...basicWords, ...defectWords, ...operationWords];

// 定义可用的词库映射
const topicMap = {
    all: allWords,
    basic: basicWords,
    defect: defectWords,
    operation: operationWords
};

// ========================= 动态单元词汇生成 =========================
// 根据总词库随机排序后切分为每10个一单元
function generateUnitsFromWordList(wordList, wordsPerUnit = 10) {
    // 打乱数组顺序（Fisher-Yates）
    const shuffled = [...wordList];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const units = {};
    const totalUnits = Math.ceil(shuffled.length / wordsPerUnit);
    for (let u = 1; u <= totalUnits; u++) {
        const start = (u - 1) * wordsPerUnit;
        const end = start + wordsPerUnit;
        units[`unit${u}`] = shuffled.slice(start, end);
    }
    return units;
}

// 生成单元词汇（每次页面加载时重新生成，保证随机性；但也可以固定，此处选择固定以保持一致性）
// 为了用户不会每次刷新都改变单元内容，可以在页面加载时生成一次并存储，这样可以。
let unitWords = generateUnitsFromWordList(allWords, 10);
// 将生成的单元添加到 topicMap
for (let key in unitWords) {
    topicMap[key] = unitWords[key];
}

// ========================= DOM 元素 =========================
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

// ========================= 全局状态 =========================
let currentTopic = "all";
let currentMode = "recite";
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

// ========================= 辅助函数 =========================
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
    } else {
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
        questionTextEl.innerHTML = "🎉 恭喜完成！ 🎉";
        extraInfoEl.innerHTML = "";
        answerInput.disabled = true;
        checkBtn.disabled = true;
        nextBtn.disabled = true;
        updateStats();
        return;
    }
    
    if (currentMode === "recite") {
        // 背诵练习：显示中文、英文、音标（带喇叭）、例句
        questionTextEl.innerHTML = `<div>${currentWordObj.chinese}</div><div style="font-size:1.8rem; margin-top:8px;">${currentWordObj.word}</div>`;
        let phoneticHtml = currentWordObj.phonetic ? `<span style="cursor:pointer;" class="speakable">🔊 ${currentWordObj.phonetic}</span>` : '';
        let exampleHtml = currentWordObj.example ? `<div style="font-size:0.8rem; margin-top:8px; color:#555;">📖 ${currentWordObj.example}</div>` : '';
        extraInfoEl.innerHTML = phoneticHtml + exampleHtml;
        // 绑定音标区域发音事件
        const speakSpan = extraInfoEl.querySelector('.speakable');
        if (speakSpan) {
            speakSpan.onclick = (e) => {
                e.stopPropagation();
                speakWord(currentWordObj.word);
            };
        }
    } else if (currentMode === "en2zh") {
        questionTextEl.textContent = currentWordObj.word;
        extraInfoEl.innerHTML = currentWordObj.phonetic || "";
    } else {
        questionTextEl.textContent = currentWordObj.chinese;
        extraInfoEl.innerHTML = currentWordObj.phonetic || "";
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
        questionTextEl.innerHTML = "📭 暂无错词";
        extraInfoEl.innerHTML = "";
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
    if (topic.startsWith('unit')) {
        unitSelect.value = topic;
    } else {
        unitSelect.value = 'unit1';
    }
}

function bindUnitSelect() {
    // 动态生成下拉选项
    const totalUnits = Object.keys(unitWords).length;
    unitSelect.innerHTML = '';
    for (let i = 1; i <= totalUnits; i++) {
        const option = document.createElement('option');
        option.value = `unit${i}`;
        option.textContent = `单元词汇 Unit ${i}`;
        unitSelect.appendChild(option);
    }
    unitSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
        setTopic(selected);
    });
}

// ========================= 事件绑定 =========================
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
    
    bindUnitSelect();
    
    // 全局音标区域点击发音（非背诵模式下的额外支持）
    extraInfoEl.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('speakable')) return;
        if (currentWordObj) {
            speakWord(currentWordObj.word);
        }
    });
    
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

function init() {
    bindEvents();
    // 默认高亮
    document.querySelector('.mode-btn[data-mode="recite"]').classList.add('active');
    document.querySelector('.topic-btn[data-topic="all"]').classList.add('active');
    currentMode = "recite";
    currentTopic = "all";
    currentWordList = [...topicMap.all];
    resetGame();
}

window.addEventListener('DOMContentLoaded', init);