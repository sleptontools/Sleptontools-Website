(function () {
  "use strict";

  var SEARCH_INDEX = [
    { title: "Home", description: "Honest reviews of budgeting apps, savings tools, and money systems.", keywords: "reviews personal finance money apps", url: "/" },
    { title: "Budget Tracker", description: "A free budget tracker that runs in your browser — no signup, no account.", keywords: "free tool budget spending tracker", url: "/budget-tracker" },
    { title: "Debt Payoff Calculator", description: "Compare the snowball and avalanche methods side by side — free, no signup.", keywords: "debt payoff calculator snowball avalanche free tool", url: "/debt-payoff-calculator" },
    { title: "Net Worth Calculator", description: "Add your assets and debts, track your net worth over time — free, no signup.", keywords: "net worth calculator free tool assets debts tracker", url: "/net-worth-calculator" },
    { title: "Acorns Review", description: "The fee math nobody shows you.", keywords: "acorns micro investing round ups", url: "/acorns-review" },
    { title: "YNAB Review", description: "Is $109/year worth it? The honest math.", keywords: "ynab budgeting zero based", url: "/ynab-review" },
    { title: "Rocket Money Review", description: "Free vs Premium and the fees to watch.", keywords: "rocket money subscriptions cancel", url: "/rocket-money-review" },
    { title: "Credit Karma Review", description: "What \"completely free\" actually means.", keywords: "credit karma credit score free credit", url: "/credit-karma-review" },
    { title: "Morningstar Review", description: "Independent research tools for people who've outgrown beginner apps.", keywords: "morningstar investing stock research", url: "/morningstar-review" },
    { title: "Wise Review", description: "The real cost of sending money abroad.", keywords: "wise money transfer exchange rate", url: "/wise-review" },
    { title: "Personal Finance OS", description: "The complete Notion money system — budget, debt payoff, savings, net worth.", keywords: "notion template finance os dashboard", url: "/personal-finance-os-review" },
    { title: "Budget Tracker Lite", description: "The free starter version of the Personal Finance OS.", keywords: "free notion lite starter", url: "/budget-tracker-lite" },
    { title: "About", description: "Why sleptontools exists, and how we test and score finance apps.", keywords: "about trust editorial", url: "/about" },
    { title: "Best Budgeting Apps", description: "YNAB, Rocket Money, Acorns, Credit Karma, Morningstar, and Wise compared side by side.", keywords: "best budgeting apps comparison ratings pricing", url: "/best-budgeting-apps" },
    { title: "How to Make a Budget", description: "Why most budgets fail and the zero-based method explained simply, step by step.", keywords: "how to budget zero based guide beginner", url: "/how-to-make-a-budget" }
  ];

  function norm(s) {
    return (s || "").toLowerCase();
  }

  function escHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function initSearch() {
    var toggle = document.getElementById("searchToggle");
    var box = document.getElementById("searchBox");
    var input = document.getElementById("searchInput");
    var results = document.getElementById("searchResults");
    if (!toggle || !box || !input || !results) return;

    function openBox() {
      box.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      input.focus();
    }

    function closeBox() {
      box.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      results.innerHTML = "";
      input.value = "";
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (box.classList.contains("open")) {
        closeBox();
      } else {
        openBox();
      }
    });

    box.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("click", function () {
      if (box.classList.contains("open")) closeBox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) closeBox();
    });

    input.addEventListener("input", function () {
      var q = norm(input.value.trim());
      results.innerHTML = "";
      if (!q) return;

      var matches = SEARCH_INDEX.filter(function (item) {
        return (
          norm(item.title).indexOf(q) > -1 ||
          norm(item.description).indexOf(q) > -1 ||
          norm(item.keywords).indexOf(q) > -1
        );
      }).slice(0, 5);

      if (matches.length === 0) {
        results.innerHTML = '<div class="search-empty">No results</div>';
        return;
      }

      matches.forEach(function (item) {
        var a = document.createElement("a");
        a.href = item.url;
        a.innerHTML =
          '<span class="sr-title">' + escHtml(item.title) + "</span>" +
          '<span class="sr-desc">' + escHtml(item.description) + "</span>";
        results.appendChild(a);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();
