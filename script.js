document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.floating-nav .nav-link');
    const anirudhNavLink = document.querySelector('.scrolling-header .anirudh-nav-link');
    const pages = document.querySelectorAll('.page');
    const projectGrid = document.getElementById('project-grid');
    const projectThumbnails = document.querySelectorAll('.project-thumbnail');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.back-btn-modal');
    const projectBody = projectModal.querySelector('.project-body');
    const body = document.body;

    // --- Placeholder Project Data ---
    const projectData = {
        1: {
            title: "Creative Agency Website",
            behanceLink: "https://www.behance.net/rudhsy",
            content: `
                <h2>Creative Agency Website</h2>
                <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" alt="Project Image">
                <h3>About This Project</h3>
                <p>Detailed description for Project One. Explain the challenge, your process, the solution, and the final outcome. Use paragraphs to structure your case study.</p>
                <h3>My Role</h3>
                <p>UX Design, Prototyping, User Research.</p>
            `
        },
        2: {
            title: "Mobile Banking App",
            behanceLink: "https://www.behance.net/rudhsy",
            content: `
                <h2>Mobile Banking App</h2>
                <img src="https://images.unsplash.com/photo-1526657782461-9fe135fed28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80" alt="Project Image">
                <h3>About This Project</h3>
                <p>Detailed description for Project Two. Explain the challenge, your process, the solution, and the final outcome. Use paragraphs to structure your case study.</p>
                <h3>My Role</h3>
                <p>Product Design, Interaction Design.</p>
            `
        },
        3: { title: "SaaS Platform Dashboard", behanceLink: "https://www.behance.net/rudhsy", content: "<h2>SaaS Platform Dashboard</h2><p>Content for project 3 coming soon.</p>" },
        4: { title: "E-commerce Redesign", behanceLink: "https://www.behance.net/rudhsy", content: "<h2>E-commerce Redesign</h2><p>Content for project 4 coming soon.</p>" },
    };

    // --- Navigation Logic ---
    function showPage(pageId, shouldScrollToGrid) {
        body.classList.toggle('is-static-page', pageId === 'about' || pageId === 'resume');

        pages.forEach(page => page.classList.remove('active'));
        const pageToShow = document.getElementById(pageId.replace('works', 'work'));
        if (pageToShow) pageToShow.classList.add('active');

        if (shouldScrollToGrid) {
            projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    function updateActiveLink(activePageId) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.floating-nav .nav-link[data-page="${activePageId}"]`);
        if(activeLink) activeLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            showPage(pageId, pageId === 'works');
            updateActiveLink(pageId);
        });
    });

    anirudhNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('work', false);
        updateActiveLink('works');
    });

    // --- Header Scroll Behavior ---
    window.addEventListener('scroll', () => {
        body.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Drag-and-Drop Grid Logic ---
    if (projectGrid) {
        new Sortable(projectGrid, { animation: 350, ghostClass: 'sortable-ghost' });
    }

    // --- Project Modal Logic ---
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        projectBody.innerHTML = data.content;
        document.getElementById('modal-behance-link').href = data.behanceLink;
        projectModal.classList.add('open');
        body.classList.add('modal-is-open'); // Toggle body class for back button
        body.style.overflow = 'hidden';
        projectModal.scrollTo(0, 0);
    }

    function closeModal() {
        projectModal.classList.remove('open');
        body.classList.remove('modal-is-open'); // Toggle body class for back button
        body.style.overflow = '';
    }
    
    projectThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => openModal(thumb.dataset.projectId));
    });

    closeModalBtn.addEventListener('click', closeModal);
    
    // Initialize page
    showPage('work', false);
    updateActiveLink('works');
});

