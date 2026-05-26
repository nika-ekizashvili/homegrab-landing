document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================
  // LANGUAGE SWITCHER
  // ==========================================
  const langSwitchBtn = document.getElementById('lang-switch');
  const body = document.body;

  // Retrieve language preference or default to Georgian context
  let currentLang = localStorage.getItem('homegrab_lang') || 'en';
  setLanguage(currentLang);

  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ka' : 'en';
      setLanguage(currentLang);
    });
  }

  function setLanguage(lang) {
    localStorage.setItem('homegrab_lang', lang);
    if (lang === 'ka') {
      body.classList.remove('lang-en');
      body.classList.add('lang-ka');
    } else {
      body.classList.remove('lang-ka');
      body.classList.add('lang-en');
    }
  }

  // ==========================================
  // MODALS CONTROL (For backwards compatibility/other views if modals exist)
  // ==========================================
  const termsModal = document.getElementById('modal-terms');
  const privacyModal = document.getElementById('modal-privacy');

  if (termsModal || privacyModal) {
    // Trigger elements
    const termsLinks = [
      document.getElementById('terms-nav-link'),
      document.getElementById('terms-link-sec'),
      document.getElementById('footer-terms-link')
    ];

    const privacyLinks = [
      document.getElementById('privacy-policy-link'),
      document.getElementById('footer-privacy-link')
    ];

    // Close elements
    const closeTermsBtn = document.getElementById('close-terms-btn');
    const closePrivacyBtn = document.getElementById('close-privacy-btn');
    const termsCloseFooterBtn = document.getElementById('terms-close-footer-btn');
    const privacyCloseFooterBtn = document.getElementById('privacy-close-footer-btn');

    // Event Listeners for opening modals
    termsLinks.forEach(link => {
      if (link && termsModal) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(termsModal);
        });
      }
    });

    privacyLinks.forEach(link => {
      if (link && privacyModal) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(privacyModal);
        });
      }
    });

    // Event Listeners for closing modals
    [closeTermsBtn, termsCloseFooterBtn].forEach(btn => {
      if (btn && termsModal) btn.addEventListener('click', () => closeModal(termsModal));
    });

    [closePrivacyBtn, privacyCloseFooterBtn].forEach(btn => {
      if (btn && privacyModal) btn.addEventListener('click', () => closeModal(privacyModal));
    });

    // Close on outer click
    window.addEventListener('click', (e) => {
      if (termsModal && e.target === termsModal) closeModal(termsModal);
      if (privacyModal && e.target === privacyModal) closeModal(privacyModal);
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (termsModal) closeModal(termsModal);
        if (privacyModal) closeModal(privacyModal);
      }
    });

    function openModal(modal) {
      modal.classList.add('modal-active');
      body.style.overflow = 'hidden'; // Prevent main page scrolling
    }

    function closeModal(modal) {
      modal.classList.remove('modal-active');
      body.style.overflow = ''; // Re-enable scrolling
    }
  }

  // ==========================================
  // INTERACTIVE SIMULATOR LOGIC
  // ==========================================
  const simScrapeBtn = document.getElementById('sim-scrape-btn');
  if (simScrapeBtn) {
    const simInjectBtn = document.getElementById('sim-inject-btn');
    const simInjectMyHomeBtn = document.getElementById('sim-inject-btn-myhome');
    const simResetBtn = document.getElementById('sim-reset-btn');
    
    // Panels
    const paneSource = document.querySelector('.pane-source');
    const paneExtension = document.querySelector('.pane-extension');
    const paneTarget = document.querySelector('.pane-target');

    // Ext controls & statuses
    const extStatusLight = document.getElementById('ext-status-light');
    const extStatusText = document.getElementById('ext-status-text');
    const dataPreviewBadge = document.getElementById('data-preview-badge');
    const simSurchargeInput = document.getElementById('sim-surcharge');
    const simRoundAreaChk = document.getElementById('sim-round-area');
    const simAgentInput = document.getElementById('sim-agent');
    const simDescInput = document.getElementById('sim-desc-tmpl');
    const extInactiveView = document.getElementById('ext-inactive-view');
    const extActiveView = document.getElementById('ext-active-view');

    // Target Form Values
    const targetDeal = document.getElementById('target-deal');
    const targetPrice = document.getElementById('target-price');
    const targetArea = document.getElementById('target-area');
    const targetDesc = document.getElementById('target-desc');

    // Sheets variables
    const sheetsRowPlaceholder = document.getElementById('sheets-row-placeholder');
    const sheetsRowData = document.getElementById('sheets-row-data');
    const sheetDate = document.getElementById('sheet-date');
    const sheetPrice = document.getElementById('sheet-price');
    const sheetArea = document.getElementById('sheet-area');

    // Initial State Setup
    if (paneSource) {
      paneSource.classList.add('active-panel');
    }

    // Step 1: Scrape
    simScrapeBtn.addEventListener('click', () => {
      // Disable scrape button and show loading state
      simScrapeBtn.disabled = true;
      simScrapeBtn.innerHTML = `<i data-lucide="loader-2" class="btn-icon animate-spin"></i> <span>Scraping listing...</span>`;
      if (window.lucide) window.lucide.createIcons();

      // Adjust status to busy
      extStatusLight.className = 'ext-status-dot busy';
      extStatusText.innerHTML = `<span data-lang="en">Extracting data...</span><span data-lang="ka">მონაცემები გადმოდის...</span>`;
      setLanguage(currentLang); // force visual localization update

      setTimeout(() => {
        // Completed scraping
        simScrapeBtn.innerHTML = `<i data-lucide="check" class="btn-icon"></i> <span>Data Extracted</span>`;
        simScrapeBtn.classList.remove('btn-secondary');
        simScrapeBtn.classList.add('btn-primary');
        if (window.lucide) window.lucide.createIcons();

        // Toggle extension inactive -> active view
        if (extInactiveView) extInactiveView.classList.add('hidden');
        if (extActiveView) extActiveView.classList.remove('hidden');

        // Show preview badge & update extension pane status
        if (dataPreviewBadge) dataPreviewBadge.classList.remove('hidden');
        extStatusLight.className = 'ext-status-dot active';
        extStatusText.innerHTML = `<span data-lang="en">Ready to Autofill</span><span data-lang="ka">მზად არის შესავსებად</span>`;
        
        // Swap active panel outline highlight
        if (paneSource) paneSource.classList.remove('active-panel');
        if (paneExtension) paneExtension.classList.add('active-panel');

        // Enable inject buttons
        if (simInjectBtn) simInjectBtn.disabled = false;
        if (simInjectMyHomeBtn) simInjectMyHomeBtn.disabled = false;
        setLanguage(currentLang);
      }, 1200);
    });

    // Step 2: Inject/Sync Function
    const triggerInject = () => {
      // Show injecting loader
      if (simInjectBtn) {
        simInjectBtn.disabled = true;
        simInjectBtn.innerHTML = `<i data-lucide="loader-2" class="btn-icon animate-spin"></i> <span>Autofilling...</span>`;
      }
      if (simInjectMyHomeBtn) {
        simInjectMyHomeBtn.disabled = true;
        simInjectMyHomeBtn.innerHTML = `<span>Autofilling...</span>`;
      }
      if (window.lucide) window.lucide.createIcons();

      extStatusLight.className = 'ext-status-dot busy';
      extStatusText.innerHTML = `<span data-lang="en">Injecting to active tab...</span><span data-lang="ka">შევსება...</span>`;
      setLanguage(currentLang);

      setTimeout(() => {
        // Complete injecting
        if (simInjectBtn) simInjectBtn.innerHTML = `ორივე პლატფორმაზე`;
        if (simInjectMyHomeBtn) simInjectMyHomeBtn.innerHTML = `MyHome.ge-ზე`;
        if (window.lucide) window.lucide.createIcons();

        extStatusLight.className = 'ext-status-dot active';
        extStatusText.innerHTML = `<span data-lang="en">Sync Complete!</span><span data-lang="ka">დასრულებულია!</span>`;
        setLanguage(currentLang);

        // Calculations based on options selected
        const surcharge = parseFloat(simSurchargeInput?.value) || 0;
        const basePrice = 1200;
        const finalPrice = basePrice + surcharge;

        const baseArea = 73;
        let finalArea = baseArea;
        if (simRoundAreaChk && simRoundAreaChk.checked) {
          // Round to nearest 5
          finalArea = Math.round(baseArea / 5) * 5;
        }

        // Update Form UI
        if (targetDeal) {
          targetDeal.textContent = currentLang === 'en' ? 'Rent Monthly' : 'ქირავდება';
          targetDeal.classList.remove('placeholder-val');
          targetDeal.classList.add('fill-highlight');
        }

        if (targetPrice) {
          targetPrice.textContent = `$${finalPrice.toLocaleString()}`;
          targetPrice.classList.remove('placeholder-val');
          targetPrice.classList.add('fill-highlight');
        }

        if (targetArea) {
          targetArea.textContent = `${finalArea} m²`;
          targetArea.classList.remove('placeholder-val');
          targetArea.classList.add('fill-highlight');
        }

        // Read directly from the description template textarea
        if (targetDesc && simDescInput) {
          targetDesc.textContent = simDescInput.value;
          targetDesc.classList.remove('placeholder-val');
          targetDesc.classList.add('fill-highlight');
        }

        // Update Google Sheets row
        const today = new Date();
        const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        
        if (sheetDate) sheetDate.textContent = dateStr;
        if (sheetPrice) sheetPrice.textContent = `$${finalPrice.toLocaleString()}`;
        if (sheetArea) sheetArea.textContent = `${finalArea} m²`;

        if (sheetsRowPlaceholder) sheetsRowPlaceholder.classList.add('hidden');
        if (sheetsRowData) sheetsRowData.classList.remove('hidden');

        // Swap active panel
        if (paneExtension) paneExtension.classList.remove('active-panel');
        if (paneTarget) paneTarget.classList.add('active-panel');

        // Show Toast Notification
        showToast(
          currentLang === 'en' 
            ? '🎉 Listing injected and recorded to Google Sheets!' 
            : '🎉 განცხადება წარმატებით გადავიდა და ჩაიწერა Sheets-ში!'
        );
      }, 1500);
    };

    if (simInjectBtn) simInjectBtn.addEventListener('click', triggerInject);
    if (simInjectMyHomeBtn) simInjectMyHomeBtn.addEventListener('click', triggerInject);

    // Step 3: Reset
    if (simResetBtn) {
      simResetBtn.addEventListener('click', () => {
        // Reset buttons
        simScrapeBtn.disabled = false;
        simScrapeBtn.className = 'btn btn-secondary w-full btn-sim-action';
        simScrapeBtn.innerHTML = `<i data-lucide="copy" class="btn-icon"></i> <span data-lang="en">1. Scrape Listing Data</span><span data-lang="ka">1. მონაცემების კოპირება</span>`;

        if (simInjectBtn) {
          simInjectBtn.disabled = true;
          simInjectBtn.innerHTML = `ორივე პლატფორმაზე`;
        }
        if (simInjectMyHomeBtn) {
          simInjectMyHomeBtn.disabled = true;
          simInjectMyHomeBtn.innerHTML = `MyHome.ge-ზე`;
        }

        // Reset Extension status & views
        extStatusLight.className = 'ext-status-dot offline';
        extStatusText.innerHTML = `<span data-lang="en">Ready to Scrape</span><span data-lang="ka">მზად არის კოპირებისთვის</span>`;
        if (dataPreviewBadge) dataPreviewBadge.classList.add('hidden');
        if (extInactiveView) extInactiveView.classList.remove('hidden');
        if (extActiveView) extActiveView.classList.add('hidden');

        // Reset Inputs
        if (simSurchargeInput) simSurchargeInput.value = '5';
        if (simRoundAreaChk) simRoundAreaChk.checked = true;
        if (simAgentInput) simAgentInput.value = 'Nika';
        const simPhoneInput = document.getElementById('sim-phone');
        if (simPhoneInput) simPhoneInput.value = '555555555';
        if (simDescInput) simDescInput.value = 'ბინა ქირავდება ვაკეში, ჭავჭავაძის გამზირზე. ახალი რემონტით, ავეჯითა და ტექნიკით. აგენტი: Nika.';

        // Reset Target fields
        [targetDeal, targetPrice, targetArea, targetDesc].forEach(el => {
          if (el) {
            el.textContent = '--';
            el.className = 'form-val-box placeholder-val';
          }
        });
        if (targetDesc) targetDesc.classList.add('desc-box');

        // Reset Sheets table
        if (sheetsRowPlaceholder) sheetsRowPlaceholder.classList.remove('hidden');
        if (sheetsRowData) sheetsRowData.classList.add('hidden');

        // Reset active panels
        if (paneSource) paneSource.classList.add('active-panel');
        if (paneExtension) paneExtension.classList.remove('active-panel');
        if (paneTarget) paneTarget.classList.remove('active-panel');

        // Reinitialize Icons
        if (window.lucide) window.lucide.createIcons();
        setLanguage(currentLang);
      });
    }
  }

  // Custom Toast helper
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Fade in
    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 100);

    // Fade out and destroy
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }
});

