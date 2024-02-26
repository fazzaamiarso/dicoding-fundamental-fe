import EventBus from "../../event-bus.js";
import template from "./tabs-list.template.js";

class TabsList extends HTMLElement {
  constructor() {
    super();
    const clone = document.importNode(template.content, true);

    this.tabsContainer = clone.querySelector(".tabs");
    this.tabTriggers = clone.querySelectorAll(".tabs__trigger");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(event) {
    const tabId = event.target.dataset.tabId;

    if (!event.target.dataset.tabId) return;

    [...this.tabTriggers].forEach((element) => {
      element.classList.remove("tabs__trigger--active");
    });

    event.target.classList.add("tabs__trigger--active");

    EventBus.dispatch("tab-change", tabId);
  }

  connectedCallback() {
    this.tabsContainer.addEventListener("click", this.onTabClick);
  }
}

customElements.define("tabs-list", TabsList);

export default TabsList;
