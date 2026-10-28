/**
 * NEXORA — Product Landing Page JavaScript
 * Task 3: Interactive Frontend Architecture
 * Features:
 *  - Sticky Navigation & Dynamic Scroll States
 *  - Mobile Hamburger Menu with Accessible State Transitions
 *  - Smooth In-Page Section Scrolling & Active Link Spy
 *  - Functional Monthly / Annual Pricing Billing Toggle
 *  - Accessible FAQ Accordion with Keyboard Navigation
 *  - IntersectionObserver Scroll Reveal Animations
 *  - Interactive Sign-Up Demonstration Modal with Validation & Feedback
 *  - Dynamic Copyright Year Initialization
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Initialization on DOMContentLoaded
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initCopyrightYear();
    initStickyHeader();
    initMobileNavigation();
    initActiveNavScrollSpy();
    initBillingToggle();
    initFaqAccordion();
    initScrollReveal();
    initSignupModal();
    initMockupInteractivity();
  });

  // ==========================================================================
  // 2. Dynamic Copyright Year
  // ==========================================================================
  function initCopyrightYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ==========================================================================
  // 3. Sticky Navigation & Header Scroll State
  // ==========================================================================
  function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // ==========================================================================
  // 4. Mobile Hamburger Menu with Accessible State Controls
  // ==========================================================================
  function initMobileNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    if (!menuToggle || !primaryNav) return;

    const navLinks = primaryNav.querySelectorAll('.nav-link, .open-modal-btn');

    function toggleMenu(open) {
      const isOpen = open !== undefined ? open : !primaryNav.classList.contains('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      primaryNav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    menuToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close when any nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Close when clicking outside of header and nav
    document.addEventListener('click', (e) => {
      if (
        primaryNav.classList.contains('is-open') &&
        !primaryNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });
  }

  // ==========================================================================
  // 5. Active Navigation ScrollSpy
  // ==========================================================================
  function initActiveNavScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.primary-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================================================
  // 6. Functional Pricing Billing Toggle (Monthly / Annual)
  // ==========================================================================
  function initBillingToggle() {
    const toggleBtn = document.getElementById('billing-toggle');
    const monthlyLabel = document.getElementById('monthly-label');
    const annualLabel = document.getElementById('annual-label');
    const priceNumbers = document.querySelectorAll('.price-number');
    const subBillingNotes = document.querySelectorAll('.plan-sub-billing');

    if (!toggleBtn) return;

    let isAnnual = false;

    function updateBillingDisplay() {
      toggleBtn.setAttribute('aria-checked', isAnnual ? 'true' : 'false');

      if (monthlyLabel && annualLabel) {
        monthlyLabel.classList.toggle('active-label', !isAnnual);
        annualLabel.classList.toggle('active-label', isAnnual);
      }

      // Update pricing numbers with gentle scale effect
      priceNumbers.forEach((el) => {
        el.style.opacity = '0.3';
        el.style.transform = 'scale(0.9)';
        setTimeout(() => {
          const newVal = isAnnual ? el.dataset.annual : el.dataset.monthly;
          el.textContent = newVal !== undefined ? newVal : el.textContent;
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        }, 120);
      });

      // Update plan period subtitle notes
      subBillingNotes.forEach((el) => {
        const note = isAnnual ? el.dataset.annual : el.dataset.monthly;
        if (note) {
          el.textContent = note;
        }
      });
    }

    toggleBtn.addEventListener('click', () => {
      isAnnual = !isAnnual;
      updateBillingDisplay();
    });

    // Keyboard support (Space / Enter)
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        isAnnual = !isAnnual;
        updateBillingDisplay();
      }
    });

    updateBillingDisplay(); // Initialize state
  }

  // ==========================================================================
  // 7. Accessible Interactive FAQ Accordion
  // ==========================================================================
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const currentItem = trigger.closest('.faq-item');

        // Optional single-open behavior: close other open items
        triggers.forEach((otherTrigger) => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const otherPanelId = otherTrigger.getAttribute('aria-controls');
            const otherPanel = document.getElementById(otherPanelId);
            const otherItem = otherTrigger.closest('.faq-item');

            if (otherPanel) {
              otherPanel.setAttribute('hidden', '');
            }
            if (otherItem) {
              otherItem.classList.remove('is-open');
            }
          }
        });

        // Toggle clicked item
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          if (panel) panel.setAttribute('hidden', '');
          if (currentItem) currentItem.classList.remove('is-open');
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          if (panel) panel.removeAttribute('hidden');
          if (currentItem) currentItem.classList.add('is-open');
        }
      });
    });
  }

  // ==========================================================================
  // 8. Scroll-Triggered Reveal Animations (IntersectionObserver)
  // ==========================================================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  }

  // ==========================================================================
  // 9. Interactive Sign-Up Demonstration Modal
  // ==========================================================================
  function initSignupModal() {
    const modal = document.getElementById('signup-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const doneBtn = document.getElementById('modal-done-btn');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const form = document.getElementById('signup-form');
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    const nameInput = document.getElementById('demo-name');
    const emailInput = document.getElementById('demo-email');
    const planSelect = document.getElementById('demo-plan');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const submitBtn = document.getElementById('modal-submit-btn');
    const successPlanName = document.getElementById('success-plan-name');
    const successEmailText = document.getElementById('success-email-text');

    let previousActiveElement = null;

    if (!modal) return;

    // Open Modal Function
    function openModal(preferredPlan) {
      previousActiveElement = document.activeElement;

      // Reset views
      formView.removeAttribute('hidden');
      successView.setAttribute('hidden', '');
      clearErrors();
      form.reset();

      // If a plan was passed, select it in the dropdown
      if (preferredPlan && planSelect) {
        const option = Array.from(planSelect.options).find(
          (opt) => opt.value.toLowerCase() === preferredPlan.toLowerCase()
        );
        if (option) {
          planSelect.value = option.value;
        }
      }

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      // Focus first input
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 100);
    }

    // Close Modal Function
    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      clearErrors();

      // Restore focus to triggering button
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    // Attach click listeners to all CTA trigger buttons
    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan') || 'Pro';
        openModal(plan);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) doneBtn.addEventListener('click', closeModal);

    // Close on click outside modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });

    // Clear validation errors
    function clearErrors() {
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (nameInput) nameInput.classList.remove('is-invalid');
      if (emailInput) emailInput.classList.remove('is-invalid');
    }

    // Input clearing on typing
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        nameInput.classList.remove('is-invalid');
        if (nameError) nameError.textContent = '';
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        emailInput.classList.remove('is-invalid');
        if (emailError) emailError.textContent = '';
      });
    }

    // Client-side Validation & Simulated Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameVal) {
          if (nameError) nameError.textContent = 'Please enter your name to personalize the demo.';
          if (nameInput) nameInput.classList.add('is-invalid');
          isValid = false;
        }

        if (!emailVal) {
          if (emailError) emailError.textContent = 'Please enter a work email address.';
          if (emailInput) emailInput.classList.add('is-invalid');
          isValid = false;
        } else if (!emailRegex.test(emailVal)) {
          if (emailError) emailError.textContent = 'Please enter a valid email format (e.g., name@company.com).';
          if (emailInput) emailInput.classList.add('is-invalid');
          isValid = false;
        }

        if (!isValid) return;

        // Simulated submission loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Simulating Workspace Provisioning...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Transition to success state
          if (successEmailText) successEmailText.textContent = emailVal;
          if (successPlanName && planSelect) successPlanName.textContent = planSelect.value;

          formView.setAttribute('hidden', '');
          successView.removeAttribute('hidden');

          if (doneBtn) doneBtn.focus();
        }, 500);
      });
    }
  }

  // ==========================================================================
  // 10. Interactive Hero Dashboard Preview
  // ==========================================================================
  function initMockupInteractivity() {
    const tabButtons = document.querySelectorAll('.mockup-sidebar .sidebar-item');
    const canvasViews = document.querySelectorAll('.mockup-canvas .canvas-view');
    const canvasTitle = document.getElementById('canvas-main-title');
    const canvasSubtitle = document.getElementById('canvas-main-subtitle');
    const btnNewTask = document.getElementById('btn-new-task');
    const taskDrawer = document.getElementById('mockup-task-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-task-drawer');
    const btnCancelTask = document.getElementById('btn-cancel-task');
    const addTaskForm = document.getElementById('mockup-add-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const newTaskTag = document.getElementById('new-task-tag');
    const newTaskPriority = document.getElementById('new-task-priority');
    const tasksList = document.getElementById('mockup-tasks-list');
    const inProgressCount = document.getElementById('in-progress-count');
    const searchInput = document.getElementById('mockup-search-input');
    const searchClear = document.getElementById('mockup-search-clear');
    const tasksEmptyState = document.getElementById('tasks-empty-state');
    const resetSearchBtns = document.querySelectorAll('.btn-reset-mockup-search');
    const feedText = document.getElementById('mockup-feed-text');
    const completedValEl = document.getElementById('metric-completed-val');
    const completedPctEl = document.getElementById('metric-completed-pct');
    const completedBarEl = document.getElementById('metric-completed-bar');
    const velocityValEl = document.getElementById('metric-velocity-val');
    const velocityBarEl = document.getElementById('metric-velocity-bar');
    const chartBars = document.querySelectorAll('.chart-bar-group');
    const chartSummaryText = document.getElementById('chart-summary-text');

    if (!tabButtons.length) return;

    let activeTab = 'tasks';
    let completedCount = 38;
    let totalCount = 42;
    let velocityPct = 94.8;

    // View Titles Configuration
    const viewMeta = {
      tasks: {
        title: 'Sprint 24 • Product Launch',
        subtitle: '8 members active • 4 days remaining'
      },
      analytics: {
        title: 'Sprint 24 • Productivity Analytics',
        subtitle: 'Velocity +12% • 94.8% completion rate'
      },
      calendar: {
        title: 'Sprint 24 • Sprint Schedule',
        subtitle: 'October 2026 • 6 key milestones'
      },
      team: {
        title: 'Sprint 24 • Team Alignment (8)',
        subtitle: '5 online now • 3 in review'
      }
    };

    // Tab Switching Logic
    function switchTab(viewId) {
      activeTab = viewId;

      // Update sidebar tab buttons
      tabButtons.forEach((btn) => {
        const isCurrent = btn.getAttribute('data-view') === viewId;
        btn.classList.toggle('active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      // Update titles
      if (viewMeta[viewId] && canvasTitle && canvasSubtitle) {
        canvasTitle.textContent = viewMeta[viewId].title;
        canvasSubtitle.textContent = viewMeta[viewId].subtitle;
      }

      // Switch Canvas View
      canvasViews.forEach((view) => {
        if (view.id === `view-${viewId}`) {
          view.removeAttribute('hidden');
          view.classList.add('active');
        } else {
          view.setAttribute('hidden', '');
          view.classList.remove('active');
        }
      });

      // Re-apply search in the newly active view
      if (searchInput && searchInput.value.trim()) {
        applySearch(searchInput.value.trim().toLowerCase());
      }
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        if (viewId) switchTab(viewId);
      });
    });

    // "+ New Task" Button Handling
    if (btnNewTask && taskDrawer) {
      btnNewTask.addEventListener('click', () => {
        // Switch to tasks tab if not active
        if (activeTab !== 'tasks') {
          switchTab('tasks');
        }

        taskDrawer.removeAttribute('hidden');
        if (newTaskInput) {
          setTimeout(() => newTaskInput.focus(), 60);
        }
      });
    }

    function closeTaskDrawer() {
      if (taskDrawer) taskDrawer.setAttribute('hidden', '');
      if (addTaskForm) addTaskForm.reset();
    }

    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeTaskDrawer);
    if (btnCancelTask) btnCancelTask.addEventListener('click', closeTaskDrawer);

    // Form Submission: Add New Task
    if (addTaskForm) {
      addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = newTaskInput ? newTaskInput.value.trim() : '';
        if (!title) return;

        const tagClass = newTaskTag ? newTaskTag.value : 'tag-violet';
        const tagText = newTaskTag ? newTaskTag.options[newTaskTag.selectedIndex].text : 'Task';
        const priorityClass = newTaskPriority ? newTaskPriority.value : 'priority-med';

        // Create Task Card DOM
        const taskCard = document.createElement('div');
        taskCard.className = 'mockup-task-item';
        taskCard.setAttribute('data-task-id', Date.now());
        taskCard.innerHTML = `
          <div class="task-top">
            <span class="task-tag ${tagClass}">${escapeHtml(tagText)}</span>
            <span class="priority-dot ${priorityClass}" title="Priority"></span>
          </div>
          <div class="task-interactive-row">
            <button type="button" class="task-check-circle" aria-label="Toggle task completion" title="Click to complete task"></button>
            <p class="task-name">${escapeHtml(title)}</p>
          </div>
          <div class="task-footer">
            <div class="task-subtasks">✓ 0/3 subtasks</div>
            <div class="task-assignees">
              <span class="mini-avatar av-sl">SL</span>
            </div>
          </div>
        `;

        // Prepend to task list
        if (tasksList) {
          tasksList.prepend(taskCard);
        }

        // Update counts
        totalCount++;
        updateMetricDisplays();

        const currentActiveTasks = tasksList ? tasksList.querySelectorAll('.mockup-task-item:not(.is-completed)').length : 0;
        if (inProgressCount) inProgressCount.textContent = currentActiveTasks;

        if (feedText) {
          feedText.innerHTML = `<strong>You</strong> added <em>"${escapeHtml(title)}"</em>`;
        }

        closeTaskDrawer();
      });
    }

    // Task Completion Handling (Event Delegation)
    if (tasksList) {
      tasksList.addEventListener('click', (e) => {
        const checkBtn = e.target.closest('.task-check-circle');
        if (!checkBtn) return;

        const taskItem = checkBtn.closest('.mockup-task-item');
        if (!taskItem) return;

        const isCompleted = taskItem.classList.toggle('is-completed');
        const taskTitle = taskItem.querySelector('.task-name') ? taskItem.querySelector('.task-name').textContent : 'Task';

        if (isCompleted) {
          completedCount++;
          velocityPct = Math.min(100, velocityPct + 1.2);
          if (feedText) {
            feedText.innerHTML = `<strong>Sarah Lin</strong> completed <em>"${escapeHtml(taskTitle)}"</em>`;
          }
        } else {
          completedCount = Math.max(0, completedCount - 1);
          velocityPct = Math.max(80, velocityPct - 1.2);
        }

        updateMetricDisplays();

        const currentActiveTasks = tasksList.querySelectorAll('.mockup-task-item:not(.is-completed)').length;
        if (inProgressCount) inProgressCount.textContent = currentActiveTasks;
      });
    }

    // Metric Displays Updater
    function updateMetricDisplays() {
      if (completedValEl) completedValEl.textContent = `${completedCount}/${totalCount}`;
      const pct = Math.round((completedCount / totalCount) * 100);
      if (completedPctEl) completedPctEl.textContent = `${pct}%`;
      if (completedBarEl) completedBarEl.style.width = `${pct}%`;

      if (velocityValEl) velocityValEl.textContent = `${velocityPct.toFixed(1)}%`;
      if (velocityBarEl) velocityBarEl.style.width = `${velocityPct.toFixed(1)}%`;
    }

    // Search Bar Live Filter
    function applySearch(query) {
      if (activeTab === 'tasks') {
        const taskItems = tasksList ? tasksList.querySelectorAll('.mockup-task-item') : [];
        let matchCount = 0;

        taskItems.forEach((item) => {
          const text = item.textContent.toLowerCase();
          const matches = !query || text.includes(query);
          item.style.display = matches ? '' : 'none';
          if (matches) matchCount++;
        });

        if (tasksEmptyState) {
          tasksEmptyState.hidden = matchCount > 0 || !query;
        }
      } else if (activeTab === 'team') {
        const memberCards = document.querySelectorAll('.team-member-card');
        memberCards.forEach((card) => {
          const text = card.textContent.toLowerCase();
          const matches = !query || text.includes(query);
          card.style.display = matches ? 'flex' : 'none';
        });
      } else if (activeTab === 'calendar') {
        const dayCells = document.querySelectorAll('.cal-day-cell');
        dayCells.forEach((cell) => {
          const text = cell.textContent.toLowerCase();
          const matches = !query || text.includes(query);
          cell.style.opacity = matches ? '1' : '0.25';
        });
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (searchClear) searchClear.hidden = !query;
        applySearch(query);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          resetSearch();
        }
      });
    }

    function resetSearch() {
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.hidden = true;
      applySearch('');
    }

    if (searchClear) searchClear.addEventListener('click', resetSearch);
    resetSearchBtns.forEach((btn) => btn.addEventListener('click', resetSearch));

    // Interactive Bar Chart Day Clicks
    chartBars.forEach((barGroup) => {
      barGroup.addEventListener('click', () => {
        chartBars.forEach((b) => b.querySelector('.chart-bar')?.classList.remove('active-bar'));
        barGroup.querySelector('.chart-bar')?.classList.add('active-bar');

        const day = barGroup.getAttribute('data-day') || '';
        const count = barGroup.getAttribute('data-count') || '';
        if (chartSummaryText) {
          chartSummaryText.textContent = `${day}: ${count}`;
        }
      });
    });

    // Helper: Escape HTML
    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }
})();
