// Simple, bulletproof JavaScript
let messages = [];

const responses = [
    "That sounds wonderful! Can you tell me more about that experience?",
    "What a beautiful memory! How did that make you feel?",
    "I'd love to hear more details about that special time.",
    "That's fascinating! What would you want your family to know about that?",
    "How did that experience shape who you are today?",
    "What other memories from that time stand out to you?"
];

function sendMessage() {
    console.log('Sending message...');
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messages.push({type: 'user', content: message});
    
    input.value = '';
    
    // Hide prompts
    document.getElementById('prompts').style.display = 'none';
    
    // Add AI response
    setTimeout(() => {
        const response = responses[Math.floor(Math.random() * responses.length)];
        addMessage(response, 'ai');
        messages.push({type: 'ai', content: response});
    }, 1000);
}

function addMessage(content, type) {
    const chatArea = document.getElementById('chatArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + type + '-message';
    
    if (type === 'ai') {
        messageDiv.innerHTML = '<strong>Memory Keeper:</strong> ' + content;
    } else {
        messageDiv.textContent = content;
    }
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function usePrompt(prompt) {
    document.getElementById('messageInput').value = prompt;
    sendMessage();
}

// ENHANCED STORY GENERATION - Replace generateStory function
function generateStory() {
    const userMessages = messages.filter(m => m.type === 'user');
    
    if (userMessages.length < 2) {
        alert('Please share more memories before creating a story!');
        return;
    }
    
    // Generate story title based on content
    const firstMessage = userMessages[0].content.toLowerCase();
    let storyTitle = 'A Precious Family Memory';
    
    if (firstMessage.includes('child') || firstMessage.includes('young')) {
        storyTitle = 'Childhood Memories to Treasure';
    } else if (firstMessage.includes('job') || firstMessage.includes('work')) {
        storyTitle = 'Stories from My Working Years';
    } else if (firstMessage.includes('family') || firstMessage.includes('parent')) {
        storyTitle = 'Family Stories & Traditions';
    }
    
    const story = userMessages.map((msg, index) => {
        if (index === 0) {
            return `It all began when ${msg.content.toLowerCase()}`;
        }
        return msg.content;
    }).join('\n\n');
    
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head>
            <title>${storyTitle}</title>
            <style>
                body { 
                    font-family: 'Georgia', serif; 
                    max-width: 700px; 
                    margin: 50px auto; 
                    padding: 40px; 
                    line-height: 1.8; 
                    background: #f9fafb;
                    color: #374151;
                }
                .story-container {
                    background: white;
                    padding: 50px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                h1 { 
                    color: #4f46e5; 
                    text-align: center; 
                    margin-bottom: 15px; 
                    font-size: 2.5rem;
                    font-weight: normal;
                }
                .date {
                    text-align: center;
                    color: #6b7280;
                    font-style: italic;
                    margin-bottom: 40px;
                    font-size: 1.1rem;
                }
                p { 
                    margin-bottom: 25px; 
                    font-size: 1.2rem;
                    text-indent: 2rem;
                }
                .signature {
                    border-top: 2px solid #e5e7eb;
                    margin-top: 50px;
                    padding-top: 25px;
                    text-align: center;
                    font-style: italic;
                    color: #6b7280;
                }
                .memory-count {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    margin: 30px 0;
                    color: #92400e;
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>${storyTitle}</h1>
                <div class="date">Captured on ${new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</div>
                
                ${story.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                
                <div class="memory-count">
                    📚 This story contains ${userMessages.length} precious memories
                </div>
                
                <div class="signature">
                    — A treasured family story, lovingly preserved through Memory Keeper ❤️
                </div>
            </div>
        </body>
        </html>
    `);
}


// ENHANCED STATS - Replace showStats function in script.js
// ENHANCED AI INSIGHTS - Replace showStats function
// FIXED showStats function - Replace your existing showStats
function showStats() {
    // Close any existing modals first
    closeAnyModal();
    
    const userMessages = messages.filter(m => m.type === 'user');
    const totalWords = userMessages.reduce((count, msg) => count + msg.content.split(' ').length, 0);
    
    // Advanced emotional analysis
    const positiveWords = ['happy', 'joy', 'love', 'wonderful', 'beautiful', 'amazing', 'proud', 'excited', 'blessed', 'grateful', 'fun', 'laugh'];
    const nostalgicWords = ['remember', 'miss', 'used to', 'back then', 'those days', 'childhood', 'young'];
    const familyWords = ['family', 'mother', 'father', 'parent', 'grandma', 'grandpa', 'brother', 'sister', 'children'];
    
    const emotionalScore = userMessages.reduce((score, msg) => {
        const lowerMsg = msg.content.toLowerCase();
        return score + positiveWords.filter(word => lowerMsg.includes(word)).length;
    }, 0);
    
    const nostalgicScore = userMessages.reduce((score, msg) => {
        const lowerMsg = msg.content.toLowerCase();
        return score + nostalgicWords.filter(word => lowerMsg.includes(word)).length;
    }, 0);
    
    const familyScore = userMessages.reduce((score, msg) => {
        const lowerMsg = msg.content.toLowerCase();
        return score + familyWords.filter(word => lowerMsg.includes(word)).length;
    }, 0);
    
    // AI Insights generation
    const insights = generateAIInsights(emotionalScore, nostalgicScore, familyScore, userMessages.length);
    
    const emotionalTone = emotionalScore > 3 ? 'Joyful ✨' : emotionalScore > 1 ? 'Warm ❤️' : 'Reflective 💭';
    const completionPercentage = Math.min(100, Math.round((userMessages.length / 10) * 100));
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 650px;">
            <h2>📊 Your Memory Analytics</h2>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">${userMessages.length}</div>
                    <div class="stat-label">Memories Shared</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${totalWords}</div>
                    <div class="stat-label">Words of Wisdom</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${emotionalTone}</div>
                    <div class="stat-label">Memory Tone</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${Math.round(totalWords/Math.max(userMessages.length, 1))}</div>
                    <div class="stat-label">Avg Words/Memory</div>
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <strong>Story Completion: ${completionPercentage}%</strong>
                    <div style="background: #e5e7eb; height: 8px; border-radius: 4px; margin: 8px 0;">
                        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); height: 100%; width: ${completionPercentage}%; border-radius: 4px; transition: width 2s ease;"></div>
                    </div>
                </div>
            </div>
            
            <div class="ai-insights">
                <h3>🤖 AI Memory Insights</h3>
                <div class="insight-item">
                    <strong>Memory Pattern:</strong> ${insights.pattern}
                </div>
                <div class="insight-item">
                    <strong>Emotional Journey:</strong> ${insights.emotional}
                </div>
                <div class="insight-item">
                    <strong>Family Focus:</strong> ${insights.family}
                </div>
                <div class="insight-item">
                    <strong>Next Suggestion:</strong> ${insights.suggestion}
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <button onclick="showMemoryJourney()" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                    🗺️ View Journey
                </button>
                <button class="close-btn" onclick="closeAnyModal()">Close Stats</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function generateAIInsights(emotional, nostalgic, family, messageCount) {
    const patterns = {
        pattern: messageCount > 5 ? "Rich storyteller with detailed memories" : messageCount > 3 ? "Thoughtful reflection in progress" : "Just beginning your memory journey",
        emotional: emotional > nostalgic ? "Your memories sparkle with joy and positivity" : nostalgic > emotional ? "Deep nostalgia flows through your stories" : "A beautiful balance of joy and reflection",
        family: family > 2 ? "Strong family connections shine through your stories" : family > 0 ? "Family plays an important role in your memories" : "Personal experiences and individual growth featured",
        suggestion: messageCount < 5 ? "Try sharing a childhood adventure!" : messageCount < 8 ? "Tell us about a family tradition" : "Consider sharing wisdom you'd pass on"
    };
    
    return patterns;
}


function newChat() {
    messages = [];
    document.getElementById('chatArea').innerHTML = `
        <div class="message ai-message">
            <strong>Memory Keeper:</strong> Hello! I'm here to help you capture beautiful family memories. Tell me about a favorite childhood memory to get started! ✨
        </div>
    `;
    document.getElementById('prompts').style.display = 'block';
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    console.log('Memory Keeper loaded!');
    
    const input = document.getElementById('messageInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initialize voice recording
    initializeVoiceRecording();
});

// SMART PROMPTS SYSTEM - Add to end of script.js
const advancedPrompts = {
    childhood: [
        "What's your earliest happy memory?",
        "Tell me about your favorite childhood toy",
        "Describe your childhood bedroom",
        "What did you love most about summer vacations?"
    ],
    family: [
        "What's a funny story about your parents?",
        "Tell me about a family tradition you loved",
        "What's the best advice a family member gave you?",
        "Describe a perfect family dinner"
    ],
    milestones: [
        "Tell me about your first day at a new job",
        "What was your proudest achievement?",
        "Describe a moment that changed your life",
        "What's a challenge you overcame?"
    ]
};

function showMorePrompts() {
    const promptsDiv = document.getElementById('prompts');
    const categories = Object.keys(advancedPrompts);
    
    promptsDiv.innerHTML = `
        <p><strong>💡 Choose a memory category:</strong></p>
        ${categories.map(category => `
            <button onclick="showCategoryPrompts('${category}')" style="margin: 5px; padding: 10px 20px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border: none; border-radius: 25px; cursor: pointer;">
                ${category.charAt(0).toUpperCase() + category.slice(1)} Memories
            </button>
        `).join('')}
        <br><br>
        <button onclick="resetPrompts()" style="background: transparent; color: #6b7280; border: 2px solid #e5e7eb; padding: 8px 15px; border-radius: 20px; cursor: pointer;">
            ← Back to Basic Prompts
        </button>
    `;
}

function showCategoryPrompts(category) {
    const promptsDiv = document.getElementById('prompts');
    const categoryPrompts = advancedPrompts[category];
    
    promptsDiv.innerHTML = `
        <p><strong>💭 ${category.charAt(0).toUpperCase() + category.slice(1)} Memory Starters:</strong></p>
        ${categoryPrompts.map(prompt => `
            <button onclick="usePrompt('${prompt}')" style="margin: 5px; padding: 8px 15px; background: white; border: 2px solid #10b981; color: #10b981; border-radius: 20px; cursor: pointer; font-size: 14px;">
                ${prompt}
            </button>
        `).join('')}
        <br><br>
        <button onclick="showMorePrompts()" style="background: transparent; color: #6b7280; border: 2px solid #e5e7eb; padding: 8px 15px; border-radius: 20px; cursor: pointer;">
            ← Back to Categories
        </button>
    `;
}

function resetPrompts() {
    document.getElementById('prompts').innerHTML = `
        <p><strong>💡 Need ideas? Click any prompt:</strong></p>
        <button onclick="usePrompt('Tell me about your first job')">Tell me about your first job</button>
        <button onclick="usePrompt('What was your wedding day like?')">What was your wedding day like?</button>
        <button onclick="usePrompt('Describe your childhood home')">Describe your childhood home</button>
        <button onclick="showMorePrompts()" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border: none;">
            More Ideas ✨
        </button>
    `;
}
// VOICE RECORDING SYSTEM - Add to end of script.js
let isVoiceRecording = false;
let voiceRecognition = null;
let voiceSupported = false;

// Initialize voice recording when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Memory Keeper loaded!');
    
    const input = document.getElementById('messageInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initialize voice recording
    initializeVoiceRecording();
});

function initializeVoiceRecording() {
    const voiceButton = document.getElementById('voiceButton');
    if (!voiceButton) {
        console.log('Voice button not found');
        return;
    }
    
    // Check browser support
    voiceSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    if (!voiceSupported) {
        voiceButton.classList.add('not-supported');
        voiceButton.title = 'Voice recording requires Chrome, Edge, or Safari';
        voiceButton.onclick = showVoiceNotSupported;
        console.log('Voice not supported in this browser');
        return;
    }
    
    voiceButton.onclick = toggleVoiceRecording;
    console.log('Voice recording initialized successfully');
}

function showVoiceNotSupported() {
    showVoiceStatus('🚫 Voice recording works best in Chrome, Edge, or Safari browsers. You can still type your memories!', 'error');
}

function toggleVoiceRecording() {
    if (isVoiceRecording) {
        stopVoiceRecording();
    } else {
        startVoiceRecording();
    }
}

function startVoiceRecording() {
    console.log('Starting voice recording...');
    
    if (!voiceSupported) {
        showVoiceNotSupported();
        return;
    }
    
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voiceRecognition = new SpeechRecognition();
        
        // Configure recognition
        voiceRecognition.continuous = true;
        voiceRecognition.interimResults = true;
        voiceRecognition.lang = 'en-US';
        voiceRecognition.maxAlternatives = 1;
        
        // Event handlers
        voiceRecognition.onstart = function() {
            console.log('Voice recording started');
            isVoiceRecording = true;
            updateVoiceUI(true);
            showVoiceStatus('🎤 Listening... speak your memory clearly', 'listening');
        };
        
        voiceRecognition.onresult = function(event) {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            // Update input field with transcript
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.value = finalTranscript + interimTranscript;
                
                // Auto-scroll to see text
                messageInput.scrollLeft = messageInput.scrollWidth;
            }
            
            console.log('Transcript:', finalTranscript + interimTranscript);
        };
        
        voiceRecognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            handleVoiceError(event.error);
        };
        
        voiceRecognition.onend = function() {
            console.log('Voice recording ended');
            stopVoiceRecording();
            
            // Auto-send if we have content
            const messageInput = document.getElementById('messageInput');
            if (messageInput && messageInput.value.trim()) {
                setTimeout(() => {
                    const message = messageInput.value.trim();
                    if (confirm(`Send this memory?\n\n"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"`)) {
                        sendMessage();
                    }
                }, 800);
            }
        };
        
        // Start recording
        voiceRecognition.start();
        
    } catch (error) {
        console.error('Failed to start voice recognition:', error);
        handleVoiceError('start_failed');
    }
}

function stopVoiceRecording() {
    console.log('Stopping voice recording...');
    
    isVoiceRecording = false;
    updateVoiceUI(false);
    hideVoiceStatus();
    
    if (voiceRecognition) {
        try {
            voiceRecognition.stop();
        } catch (error) {
            console.log('Error stopping recognition:', error);
        }
        voiceRecognition = null;
    }
}

function updateVoiceUI(recording) {
    const voiceButton = document.getElementById('voiceButton');
    if (!voiceButton) return;
    
    if (recording) {
        voiceButton.classList.add('recording');
        voiceButton.textContent = '⏹️';
        voiceButton.title = 'Click to stop recording';
    } else {
        voiceButton.classList.remove('recording');
        voiceButton.textContent = '🎤';
        voiceButton.title = 'Click to record your memory';
    }
}

function showVoiceStatus(message, type = 'listening') {
    const voiceStatus = document.getElementById('voiceStatus');
    if (!voiceStatus) return;
    
    voiceStatus.style.display = 'block';
    voiceStatus.className = `voice-status ${type === 'error' ? 'voice-error' : ''}`;
    
    if (type === 'listening') {
        voiceStatus.innerHTML = `
            <div class="listening-animation">
                <div class="pulse-dot"></div>
                <span>${message}</span>
            </div>
        `;
    } else {
        voiceStatus.innerHTML = `<div style="text-align: center; font-weight: 600;">${message}</div>`;
    }
}

function hideVoiceStatus() {
    const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) {
        voiceStatus.style.display = 'none';
    }
}

function handleVoiceError(error) {
    stopVoiceRecording();
    
    const errorMessages = {
        'network': '🌐 Network error. Please check your internet connection.',
        'not-allowed': '🚫 Microphone access denied. Please allow microphone access in your browser settings.',
        'no-speech': '🔇 No speech detected. Please try speaking more clearly.',
        'audio-capture': '🎤 Microphone not found. Please check your microphone connection.',
        'start_failed': '⚠️ Could not start voice recording. Please try again.',
        'aborted': '⏹️ Recording was stopped.',
        'service-not-allowed': '🚫 Speech service not allowed. Please try again.'
    };
    
    const message = errorMessages[error] || `⚠️ Voice recording error: ${error}. Please try typing instead.`;
    
    showVoiceStatus(message, 'error');
    
    // Hide error after 5 seconds
    setTimeout(() => {
        hideVoiceStatus();
    }, 5000);
}

// Update newChat function to reset voice status
const originalNewChat = newChat;
newChat = function() {
    stopVoiceRecording(); // Stop any ongoing recording
    hideVoiceStatus(); // Hide voice status
    originalNewChat(); // Call original function
};
// MEMORY JOURNEY TIMELINE - Add to script.js
// FIXED showMemoryJourney - Replace your existing function
function showMemoryJourney() {
    closeAnyModal();
    
    const userMessages = messages.filter(m => m.type === 'user');
    if (userMessages.length < 2) {
        alert('Share more memories to see your journey!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    modal.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 600px;">
            <h2>🗺️ Your Memory Journey</h2>
            <div style="max-height: 300px; overflow-y: auto; padding: 20px; background: #f8fafc; border-radius: 15px; margin: 20px 0;">
                ${userMessages.map((msg, index) => {
                    const memoryType = getMemoryIcon(msg.content);
                    return `
                        <div style="display: flex; align-items: center; margin: 15px 0; padding: 15px; background: white; border-radius: 10px; border-left: 4px solid #4f46e5;">
                            <div style="font-size: 24px; margin-right: 15px;">${memoryType.icon}</div>
                            <div>
                                <div style="font-weight: 600; color: #4f46e5; margin-bottom: 5px;">${memoryType.title}</div>
                                <div style="color: #374151; font-size: 14px;">${msg.content.substring(0, 80)}${msg.content.length > 80 ? '...' : ''}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 15px; color: #92400e; font-weight: 600;">
                🌟 ${userMessages.length} precious memories captured on your family journey!
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="close-btn" onclick="closeAnyModal()">Close Journey</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// MODAL CLOSING SYSTEM - Add after newChat function
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (modalElement && modalElement.parentNode) {
                modalElement.parentNode.removeChild(modalElement);
            }
        }, 300);
    }
}

function closeAnyModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        closeModal(modal);
    });
}

// Add keyboard support for closing modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAnyModal();
    }
});

function getMemoryIcon(content) {
    const lower = content.toLowerCase();
    if (lower.includes('child') || lower.includes('young') || lower.includes('kid')) {
        return {icon: '🧸', title: 'Childhood Memory'};
    } else if (lower.includes('work') || lower.includes('job') || lower.includes('career')) {
        return {icon: '💼', title: 'Career Memory'};
    } else if (lower.includes('family') || lower.includes('parent') || lower.includes('wedding')) {
        return {icon: '👨‍👩‍👧‍👦', title: 'Family Memory'};
    } else if (lower.includes('travel') || lower.includes('trip') || lower.includes('vacation')) {
        return {icon: '✈️', title: 'Travel Memory'};
    } else if (lower.includes('school') || lower.includes('learn') || lower.includes('study')) {
        return {icon: '📚', title: 'Education Memory'};
    } else {
        return {icon: '💝', title: 'Precious Memory'};
    }
}
// MEMORY SHARING SYSTEM - Add to script.js
function shareMemoryStory() {
    const userMessages = messages.filter(m => m.type === 'user');
    
    if (userMessages.length < 2) {
        alert('Please share more memories before creating a shareable story!');
        return;
    }
    
    const story = userMessages.map(m => m.content).join('\n\n');
    const title = "Precious Family Memories";
    const shareText = `${title}\n\nCaptured on ${new Date().toLocaleDateString()}\n\n${story}\n\n--- Preserved with Memory Keeper 💝`;
    
    // Try native sharing first
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText
        }).catch(err => console.log('Sharing cancelled'));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showShareSuccess('Story copied to clipboard! You can now paste it in email or messages.');
        }).catch(() => {
            // Final fallback: Show text to copy
            showShareModal(shareText);
        });
    }
}

function showShareSuccess(message) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <h2>📤 Story Ready to Share!</h2>
            <p style="color: #10b981; font-weight: 600;">${message}</p>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">Perfect!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showShareModal(shareText) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <h2>📤 Share Your Family Story</h2>
            <textarea readonly style="width: 100%; height: 200px; padding: 15px; border: 2px solid #e5e7eb; border-radius: 10px; font-family: inherit; resize: none;">${shareText}</textarea>
            <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">Select all text above and copy (Ctrl+C) to share with family!</p>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

