<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Intelligence Analyzer</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; background: #fdfdfd; color: #1e293b; }
        .wrapper { max-width: 800px; margin: 0 auto; }
        textarea { width: 100%; height: 160px; padding: 12px; box-sizing: border-box; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 15px; resize: vertical; }
        textarea:focus { border-color: #3b82f6; outline: none; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
        .metric-card { background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; border: 1px solid #e2e8f0; }
        .metric-card div:first-child { font-size: 24px; font-weight: bold; color: #2563eb; }
        .metric-card div:last-child { font-size: 12px; text-transform: uppercase; color: #64748b; margin-top: 4px; }
        .output-box { background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        h3 { margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
        .tag { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 4px; font-size: 13px; margin: 4px; border: 1px solid #bfdbfe; }
        .tag.invalid { background: #fef2f2; color: #991b1b; border-color: #fca5a5; }
    </style>
</head>
<body>

<div class="wrapper">
    <h2>Text Intelligence Analyzer</h2>
    <p>Paste paragraphs containing emails, phone numbers, or metadata below to parse metrics instantly.</p>
    
    <textarea id="textInput" placeholder="Type or paste text here... (e.g., Contact team@domain.com or admin@site.org. Call +91 98765-43210. Check out #javascript #regex!)"></textarea>

    <!-- Core Structural Metrics -->
    <div class="metrics-grid">
        <div class="metric-card"><div id="charCount">0</div><div>Characters</div></div>
        <div class="metric-card"><div id="wordCount">0</div><div>Words</div></div>
        <div class="metric-card"><div id="sentenceCount">0</div><div>Sentences</div></div>
        <div class="metric-card"><div id="phoneCount">0</div><div>Phones Found</div></div>
    </div>

    <!-- Extracted Meta-Data Lists -->
    <div class="output-box">
        <h3>Validated Email Addresses</h3>
        <div id="emailContainer"><p style="color:#94a3b8; font-style:italic; margin:0;">No emails extracted yet.</p></div>
    </div>

    <div class="output-box">
        <h3>Extracted Hashtags (#)</h3>
        <div id="hashtagContainer"><p style="color:#94a3b8; font-style:italic; margin:0;">No tags found.</p></div>
    </div>
</div>

<script>
// ==========================================
// 1. REGEX REGISTRY AND PATTERN DEFINITIONS
// ==========================================
// Strict email format validation regex
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Generic Global Phone pattern matching (+91..., 123-456-7890, etc.)
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

// Hashtag extraction rule tracking
const HASHTAG_REGEX = /#\w+/g;

// ==========================================
// 2. DATA PROCESSING & ANALYSIS ENGINE
// ==========================================
const analyzeTextData = (rawText) => {
    // --- String Functions & Diagnostics ---
    const totalChars = rawText.length;
    
    // Clean string normalization using .trim() and split handling
    const cleanText = rawText.trim();
    const wordsArray = cleanText === "" ? [] : cleanText.split(/\s+/);
    const totalWords = wordsArray.length;

    // Use string matching regex to break sentences by punctuation delimiters
    const sentencesArray = cleanText === "" ? [] : cleanText.split(/[.!?]+(?=\s|$)/);
    const totalSentences = sentencesArray.filter(s => s.trim().length > 0).length;

    // --- Regex Data Extraction ---
    const extractedEmails = rawText.match(EMAIL_REGEX) || [];
    const extractedPhones = rawText.match(PHONE_REGEX) || [];
    const extractedHashtags = rawText.match(HASHTAG_REGEX) || [];

    return {
        totalChars,
        totalWords,
        totalSentences,
        phonesCount: extractedPhones.length,
        emails: [...new Set(extractedEmails)], // Distinct lookup arrays using Set structures
        hashtags: [...new Set(extractedHashtags)]
    };
};

// ==========================================
// 3. UI MUTATION INTERACTION LAYER
// ==========================================
document.getElementById('textInput').addEventListener('input', (e) => {
    const text = e.target.value;
    const report = analyzeTextData(text);

    // Update basic string structural nodes
    document.getElementById('charCount').textContent = report.totalChars;
    document.getElementById('wordCount').textContent = report.totalWords;
    document.getElementById('sentenceCount').textContent = report.totalSentences;
    document.getElementById('phoneCount').textContent = report.phonesCount;

    // Render Emails with an additional step: secondary verification test
    const emailBox = document.getElementById('emailContainer');
    if (report.emails.length === 0) {
        emailBox.innerHTML = `<p style="color:#94a3b8; font-style:italic; margin:0;">No emails extracted yet.</p>`;
    } else {
        emailBox.innerHTML = report.emails.map(email => {
            // Secondary runtime test confirmation on specific strings
            const isValid = EMAIL_REGEX.test(email);
            // Reset state machine indexes because of /g global tracking flag quirks
            EMAIL_REGEX.lastIndex = 0; 
            
            return `<span class="tag ${isValid ? '' : 'invalid'}">${email}</span>`;
        }).join('');
    }

    // Render Hashtags using string manipulation functions (.replace to scrub raw characters)
    const hashBox = document.getElementById('hashtagContainer');
    if (report.hashtags.length === 0) {
        hashBox.innerHTML = `<p style="color:#94a3b8; font-style:italic; margin:0;">No tags found.</p>`;
    } else {
        hashBox.innerHTML = report.hashtags.map(tag => 
            `<span class="tag">${tag.toLowerCase().replace('#', '@')}</span>`
        ).join('');
    }
});
</script>

</body>
</html>
