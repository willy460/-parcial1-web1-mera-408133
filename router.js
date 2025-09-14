// SPA Navigation Logic
const tabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.content-section');

// Function to switch between sections
function switchSection(targetSection) {
    // Remove active class from all tabs and sections
    tabs.forEach(tab => tab.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
    document.getElementById(targetSection).classList.add('active');
}

// Add event listeners to navigation tabs
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = tab.dataset.section;
        switchSection(targetSection);
    });
});

// Post composer functionality
const shareBtn = document.querySelector('.share-btn');
const postInput = document.querySelector('.post-input');
const muroSection = document.getElementById('muro');

// Function to create new post
function createPost(content) {
    const postHTML = `
        <article class="post">
            <div class="post-header">
                <div class="post-author-pic">👤</div>
                <div>
                    <div style="font-weight: bold;">Nombre</div>
                    <div style="font-size: 12px; color: #65676b;">Ahora</div>
                </div>
            </div>
            <p>${content}</p>
            <div class="post-actions-bar">
                <a href="#" class="post-action">👍 Me gusta</a>
                <a href="#" class="post-action">💬 Compartir</a>
            </div>
        </article>
    `;
    
    // Insert new post after the composer
    const composer = document.querySelector('.post-composer');
    composer.insertAdjacentHTML('afterend', postHTML);
}

// Share button functionality
shareBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        createPost(content);
        postInput.value = '';
        alert('¡Post compartido exitosamente!');
    } else {
        alert('Por favor escribe algo antes de compartir');
    }
});

// Enter key functionality for post input
postInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        shareBtn.click();
    }
});

// Like button functionality for existing and new posts
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post-action') && e.target.textContent.includes('Me gusta')) {
        e.preventDefault();
        const isLiked = e.target.textContent.includes('👍');
        e.target.textContent = isLiked ? '🤍 Me gusta' : '👍 Me gusta';
        e.target.style.color = isLiked ? '#65676b' : '#1877f2';
    }
});

// Search functionality
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchBar.value.trim();
        if (searchTerm) {
            alert(`Buscando: "${searchTerm}"`);
            searchBar.value = '';
        }
    }
});

// Sidebar menu interactions
const sidebarItems = document.querySelectorAll('.sidebar-menu li');
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        // Switch to info section when sidebar items are clicked
        switchSection('info');
        
        // Highlight the clicked item temporarily
        item.style.background = '#e3f2fd';
        setTimeout(() => {
            item.style.background = 'transparent';
        }, 300);
    });
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Facebook SPA loaded successfully');
    
    // Set default active section
    switchSection('muro');
});