import EventBus from "../../event-bus.js";
import template from "./tabs-list.template.js";

class TabsList extends HTMLElement {
  constructor() {
    super();

    this._defaultActive = this.getAttribute("default-active") ?? "all";

    const clone = document.importNode(template.content, true);

    this.tabsContainer = clone.querySelector(".tabs");
    this.tabTriggers = clone.querySelectorAll(".tabs__trigger");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.onTabClick = this.onTabClick.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  setActive(activeElement) {
    [...this.tabTriggers].forEach((element) => {
      element.classList.remove("tabs__trigger--active");
    });

    activeElement.classList.add("tabs__trigger--active");
  }

  onTabClick(event) {
    const tabId = event.target.dataset.tabId;

    if (!event.target.dataset.tabId) return;

    this.setActive(event.target);

    EventBus.dispatch("tab-change", tabId);
  }

  connectedCallback() {
    this.tabsContainer.addEventListener("click", this.onTabClick);
    this.setActive(
      this.shadowRoot.querySelector(`[data-tab-id=${this._defaultActive}]`),
    );
  }
}

customElements.define("tabs-list", TabsList);

export default TabsList;
