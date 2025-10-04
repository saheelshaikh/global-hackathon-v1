// SIMPLE WORKING VERSION - Replace your entire script.js with this:

let messages = [];
let messageCount = 0;

// AI Response templates
const responses = [
    "That sounds like a wonderful memory! Can you tell me more about how that made you feel?",
    "What a beautiful story! Who else was there with you during that time?", 
    "I can picture that so clearly. What did that experience teach you?",
    "That's fascinating! What would you want your family to know about that moment?",
    "How did that experience shape who you became?",
    "What details from that time do you think are important to remember?",
    "Tell me more about the people who were important during that period.",
    "What wisdom from that experience would you share with younger generations?"
];

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Memory Keeper starting...');
    
    // Get elements
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const generateBlog = document.getElementById('generateBlog');
    const newConversation = document.getElementById('newConversation');
    
    // Check if elements exist
    if (!sendButton || !messageInput) {
        console.error('Missing HTML elements!');
        return;
    }
    
    console.log('Elements found, adding event listeners...');
    
    // Add click handlers
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    if (generateBlog) {
        generateBlog.addEventListener('click', createBlogPost);
    }
    
    if (newConversation) {
        newConversation.addEventListener('click', startNew);
    }
    
    console.log('Memory Keeper ready!');
});

function sendMessage() {
    console.log('Send message clicked');
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) {
        console.log('Empty message, returning');
        return;
    }
    
    console.log('Sending message:', message);
    
    // Add user message
    addMessage(message, 'user');
    messages.push({type: 'user', content: message});
    messageInput.value = '';
    
    // Add AI response after delay
    setTimeout(function() {
        const aiResponse = getAIResponse();
        addMessage(aiResponse, 'ai');
        messages.push({type: 'ai', content: aiResponse});
    }, 1000);
}

function addMessage(content, sender) {
    console.log('Adding message:', sender, content);
    
    const messagesArea = document.getElementById('messagesArea');
    if (!messagesArea) {
        console.error('Messages area not found!');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender + '-message';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    messageDiv.appendChild(bubble);
    messagesArea.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function getAIResponse() {
    messageCount++;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function createBlogPost() {
    console.log('Creating blog post');
    
    if (messages.length < 4) {
        alert('Please have a longer conversation before generating a story!');
        return;
    }
    
    const userMessages = messages.filter(m => m.type === 'user');
    const story = userMessages.map(m => m.content).join('\n\n');
    
    const blogWindow = window.open('', '_blank');
    blogWindow.document.write(`
        <html>
        <head>
            <title>Family Memory</title>
            <style>
                body { 
                    font-family: Georgia, serif; 
                    max-width: 800px; 
                    margin: 50px auto; 
                    padding: 20px;
                    line-height: 1.8;
                    background: #f9fafb;
                }
                .story {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                h1 { 
                    color: #4f46e5; 
                    text-align: center;
                    margin-bottom: 30px;
                }
                p { margin-bottom: 20px; font-size: 18px; }
            </style>
        </head>
        <body>
            <div class="story">
                <h1>A Precious Family Memory</h1>
                <p><em>Captured on ${new Date().toLocaleDateString()}</em></p>
                ${story.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                <hr style="margin: 40px 0;">
                <p><em>Preserved with love through Memory Keeper ❤️</em></p>
            </div>
        </body>
        </html>
    `);
}

function startNew() {
    console.log('Starting new conversation');
    messages = [];
    messageCount = 0;
    
    // Remove existing prompts before adding new ones
    const existingPrompts = document.getElementById('memoryPrompts');
    if (existingPrompts) {
        existingPrompts.remove();
    }
    
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.innerHTML = `
        <div class="ai-message">
            <div class="message-bubble">
                Hello! I'm here to help capture your beautiful memories. Let's start with something simple - tell me about a favorite childhood memory?
            </div>
        </div>
    `;
    
    // Re-add prompts after clearing
    setTimeout(addMemoryPrompts, 100);
}

// Memory Prompts Feature - Add to end of script.js
const memoryPrompts = [
    "Tell me about your first job",
    "What was your wedding day like?", 
    "Describe your childhood home",
    "What was your favorite family tradition?",
    "Tell me about a time you were really proud",
    "What advice would you give your younger self?"
];

function addMemoryPrompts() {
    console.log('Adding memory prompts...');
    
    // Remove any existing prompts first
    const existingPrompts = document.getElementById('memoryPrompts');
    if (existingPrompts) {
        existingPrompts.remove();
    }
    
    const chatContainer = document.querySelector('.chat-container');
    const inputArea = document.querySelector('.input-area');
    
    if (!chatContainer || !inputArea) {
        console.log('Chat container or input area not found');
        return;
    }
    
    const promptsHTML = `
        <div class="memory-prompts" id="memoryPrompts">
            <div class="prompts-header">💡 Need inspiration? Try these memory starters:</div>
            <div class="prompts-buttons">
                ${memoryPrompts.slice(0, 3).map(prompt => 
                    `<button class="prompt-btn" onclick="usePrompt('${prompt}')">${prompt}</button>`
                ).join('')}
            </div>
            <button class="more-prompts" onclick="showMorePrompts()">More ideas ✨</button>
        </div>
    `;
    
    inputArea.insertAdjacentHTML('beforebegin', promptsHTML);
}

function usePrompt(prompt) {
    console.log('Using prompt:', prompt);
    document.getElementById('messageInput').value = prompt;
    
    // Hide the prompts section instead of removing
    const promptsSection = document.getElementById('memoryPrompts');
    if (promptsSection) {
        promptsSection.style.display = 'none';
    }
    
    sendMessage();
}


function showMorePrompts() {
    const container = document.querySelector('.prompts-buttons');
    container.innerHTML = memoryPrompts.map(prompt => 
        `<button class="prompt-btn" onclick="usePrompt('${prompt}')">${prompt}</button>`
    ).join('');
}

// Update the DOMContentLoaded section - replace the end with:
document.addEventListener('DOMContentLoaded', function() {
    console.log('Memory Keeper starting...');
    
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const generateBlog = document.getElementById('generateBlog');
    const newConversation = document.getElementById('newConversation');
    
    if (!sendButton || !messageInput) {
        console.error('Missing HTML elements!');
        return;
    }
    
    console.log('Elements found, adding event listeners...');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    if (generateBlog) {
        generateBlog.addEventListener('click', createBlogPost);
    }
    
    if (newConversation) {
        newConversation.addEventListener('click', startNew);
    }
    
    // Add memory prompts after everything loads
    setTimeout(addMemoryPrompts, 500);
    
    console.log('Memory Keeper ready!');
});
// Memory Statistics - Add to end of script.js
function generateMemoryStats() {
    console.log('Generating memory stats...');
    
    const userMessages = messages.filter(m => m.type === 'user');
    const totalWords = userMessages.reduce((count, msg) => count + msg.content.split(' ').length, 0);
    const averageLength = Math.round(totalWords / Math.max(userMessages.length, 1));
    
    // Analyze emotional tone
    const positiveWords = ['happy', 'joy', 'love', 'wonderful', 'beautiful', 'amazing', 'proud', 'excited', 'blessed', 'grateful'];
    const emotionalScore = userMessages.reduce((score, msg) => {
        const lowerMsg = msg.content.toLowerCase();
        return score + positiveWords.filter(word => lowerMsg.includes(word)).length;
    }, 0);
    
    const emotionalTone = emotionalScore > 3 ? 'Joyful ✨' : emotionalScore > 1 ? 'Warm ❤️' : 'Reflective 💭';
    const completionPercentage = Math.min(100, Math.round((userMessages.length / 10) * 100));
    
    showStatsModal({
        totalMemories: userMessages.length,
        totalWords: totalWords,
        averageLength: averageLength,
        emotionalTone: emotionalTone,
        completionPercentage: completionPercentage
    });
}

// IMPROVED Modal with proper closing - Replace showStatsModal function
f// UPDATED Modal for New Design - Replace showStatsModal function
function showStatsModal(stats) {
    console.log('Showing stats modal with:', stats);
    
    // Remove any existing modal first
    const existingModal = document.querySelector('.stats-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.onclick = closeStatsModal; // Click outside to close
    
    modal.innerHTML = `
        <div class="stats-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h2>📊 Your Memory Journey</h2>
                <button class="close-x" onclick="closeStatsModal()">✕</button>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${stats.totalMemories}</div>
                    <div class="stat-label">Memories Shared</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.totalWords}</div>
                    <div class="stat-label">Words of Wisdom</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.emotionalTone}</div>
                    <div class="stat-label">Memory Tone</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.completionPercentage}%</div>
                    <div class="stat-label">Story Progress</div>
                </div>
            </div>
            <div class="progress-section">
                <div class="progress-label">Memory Collection Progress</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%; transition: width 2s ease-out;"></div>
                </div>
                <div class="progress-text">${stats.completionPercentage}% Complete</div>
            </div>
            <div class="stats-message">
                <p>🌟 You're creating something beautiful for your family!</p>
                <p>Keep sharing memories to build your complete family story.</p>
            </div>
            <button class="close-stats" onclick="closeStatsModal()">Continue Sharing ❤️</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('Modal added to body');
    
    // Animate progress bar after modal appears
    setTimeout(() => {
        const progressFill = modal.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = stats.completionPercentage + '%';
            console.log('Progress bar animated to:', stats.completionPercentage + '%');
        }
    }, 200);
}


// Add this new function for closing the modal
function closeStatsModal() {
    const modal = document.querySelector('.stats-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}


// Add stats button to actions panel
function addStatsButton() {
    const actionsPanel = document.querySelector('.actions-panel');
    if (actionsPanel) {
        const statsBtn = document.createElement('button');
        statsBtn.className = 'secondary-btn stats-btn';
        statsBtn.innerHTML = '📊 View Progress';
        statsBtn.onclick = generateMemoryStats;
        actionsPanel.appendChild(statsBtn);
    }
}

// Update the DOMContentLoaded function - add this line after the other setTimeout:
document.addEventListener('DOMContentLoaded', function() {
    console.log('Memory Keeper starting...');
    
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const generateBlog = document.getElementById('generateBlog');
    const newConversation = document.getElementById('newConversation');
    
    if (!sendButton || !messageInput) {
        console.error('Missing HTML elements!');
        return;
    }
    
    console.log('Elements found, adding event listeners...');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    if (generateBlog) {
        generateBlog.addEventListener('click', createBlogPost);
    }
    
    if (newConversation) {
        newConversation.addEventListener('click', startNew);
    }
    
    // Add features after loading
    setTimeout(addMemoryPrompts, 500);
    setTimeout(addStatsButton, 600); // Add this line
    
    console.log('Memory Keeper ready!');
});
// Welcome Screen Function - Add to end of script.js
function startMemoryKeeping() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const appContainer = document.getElementById('appContainer');
    
    // Fade out welcome screen
    welcomeScreen.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        appContainer.style.display = 'flex';
        appContainer.style.animation = 'fadeIn 0.5s ease-out';
        
        // Initialize features after app shows
        setTimeout(() => {
            addMemoryPrompts();
            addStatsButton();
            updateHeaderStats();
        }, 500);
    }, 500);
}

// Update header statistics
function updateHeaderStats() {
    const userMessages = messages.filter(m => m.type === 'user');
    document.getElementById('memoryCount').textContent = `${userMessages.length} memories shared`;
}

// Update the sendMessage function to include header updates
const originalSendMessage = sendMessage;
sendMessage = function() {
    originalSendMessage();
    setTimeout(updateHeaderStats, 100);
};
