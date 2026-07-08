document.addEventListener('DOMContentLoaded', () => {
  // --- THEME TOGGLE ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark'); // Default to dark for tech site
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- MOBILE NAV ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen 
        ? `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  }

  // --- SEARCH MODAL ---
  const searchToggleBtn = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  let searchIndex = null;
  
  const openSearch = async () => {
    if (searchModal) {
      searchModal.classList.add('open');
      searchInput.focus();
      
      // Lazy load index.json
      if (!searchIndex) {
        try {
          searchResults.innerHTML = '<div class="search-no-results">Carregando índice de busca...</div>';
          const response = await fetch(window.siteBaseUrl + 'index.json');
          searchIndex = await response.json();
          searchResults.innerHTML = '<div class="search-no-results">Digite algo para buscar...</div>';
        } catch (err) {
          console.error('Failed to load search index:', err);
          searchResults.innerHTML = '<div class="search-no-results">Erro ao carregar o índice de busca.</div>';
        }
      }
    }
  };
  
  const closeSearch = () => {
    if (searchModal) {
      searchModal.classList.remove('open');
      searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  };
  
  if (searchToggleBtn) searchToggleBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  
  // Close search on background click
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }
  
  // ESC key to close search
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (!searchIndex) return;
      if (query.length < 2) {
        searchResults.innerHTML = '<div class="search-no-results">Digite pelo menos 2 caracteres...</div>';
        return;
      }
      
      const results = searchIndex.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.summary.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
      );
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado.</div>';
        return;
      }
      
      searchResults.innerHTML = results.map(post => `
        <a href="${post.permalink}" class="search-result-item">
          <div class="search-result-title">${post.title}</div>
          <div class="search-result-desc">${post.summary}</div>
        </a>
      `).join('');
    });
  }

  // --- SCROLL EFFECTS ---
  const scrollBtn = document.getElementById('scroll-top-btn');
  const readingProgress = document.getElementById('reading-progress');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Reading Progress
    if (readingProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      readingProgress.style.width = scrollPercent + '%';
    }
    
    // Scroll To Top Button
    if (scrollBtn) {
      if (scrollTop > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  });
  
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- TOC SCROLL SPY ---
  const tocLinks = document.querySelectorAll('.toc-container a');
  const headings = Array.from(document.querySelectorAll('.post-content h2, .post-content h3'));
  
  if (tocLinks.length > 0 && headings.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60% 0px', // Trigger when section occupies the top half
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active-toc-link');
            } else {
              link.classList.remove('active-toc-link');
            }
          });
        }
      });
    }, observerOptions);
    
    headings.forEach(heading => observer.observe(heading));
  }
});
