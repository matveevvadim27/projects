class Switcher {
  selectors = {
    root: "[data-js-header]",
    themeSwitcher: "[data-js-theme-switcher]",
  };

  stateClasses = {
    isDark: "dark-theme",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    this.themeSwitcherElement = this.rootElement.querySelector(
      this.selectors.themeSwitcher
    );

    this.initializeTheme();
    this.bindEvents();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add(this.stateClasses.isDark);
      if (this.themeSwitcherElement) {
        this.themeSwitcherElement.checked = true;
      }
    }
  }

  onSwitcherClick = () => {
    if (this.themeSwitcherElement?.checked) {
      document.body.classList.add(this.stateClasses.isDark);
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove(this.stateClasses.isDark);
      localStorage.setItem("theme", "light");
    }
  };
  bindEvents() {
    if (this.themeSwitcherElement) {
      this.themeSwitcherElement.addEventListener(
        "change",
        this.onSwitcherClick
      );
    }
  }
}
export default Switcher;
