const jobsUrl = "data/jobs.json";

const searchInput = document.getElementById("search");
const locationSelect = document.getElementById("location");
const modeSelect = document.getElementById("mode");
const sourceSelect = document.getElementById("source");
const jobsContainer = document.getElementById("jobs");
const searchLinksContainer = document.getElementById("search-links");

let allJobs = [];

const jobSites = [
  { name: "Indeed", url: "https://www.indeed.com/jobs?q={query}&l=Kerala" },
  { name: "LinkedIn", url: "https://www.linkedin.com/jobs/search/?keywords={query}&location=Kerala" },
  { name: "Naukri", url: "https://www.naukri.com/hr-jobs-in-kerala" },
  { name: "Foundit", url: "https://www.foundit.in/search/hr-jobs-kerala-jobs" },
  { name: "Apna", url: "https://apna.co/jobs/hr-jobs-in-kerala" },
  { name: "Glassdoor", url: "https://www.glassdoor.co.in/Job/kerala-hr-jobs-SRCH_IL.0,6_IC1154429_KO7,9.htm" },
  { name: "TimesJobs", url: "https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=HR&txtLocation=Kerala" },
  { name: "Shine", url: "https://www.shine.com/job-search/hr-jobs-in-kerala" },
  { name: "WorkIndia", url: "https://workindia.in/jobs/hr-jobs-in-kerala/" },
  { name: "Freshersworld", url: "https://www.freshersworld.com/jobs/hr-jobs-in-kerala" },
  { name: "Monster India", url: "https://www.monsterindia.com/hr-jobs-in-kerala.html" },
  { name: "JobStreet", url: "https://in.jobstreet.com/hr-jobs/in-Kerala" }
];

async function loadJobs() {
  try {
    const response = await fetch(jobsUrl);
    allJobs = await response.json();
    populateSourceFilter();
    renderJobs();
  } catch (error) {
    jobsContainer.innerHTML = "<p>Unable to load job data. Please refresh later.</p>";
  }
}

function populateSourceFilter() {
  const sources = [...new Set(allJobs.map(job => job.source))];

  sources.forEach(source => {
    const option = document.createElement("option");
    option.value = source;
    option.textContent = source;
    sourceSelect.appendChild(option);
  });
}

function renderJobs() {
  const search = searchInput.value.toLowerCase();
  const location = locationSelect.value.toLowerCase();
  const mode = modeSelect.value.toLowerCase();
  const source = sourceSelect.value;

  const filtered = allJobs.filter(job => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search);

    const matchesLocation =
      !location || job.location.toLowerCase().includes(location);

    const matchesMode =
      !mode || (job.work_mode || "").toLowerCase() === mode;

    const matchesSource = !source || job.source === source;

    return matchesSearch && matchesLocation && matchesMode && matchesSource;
  });

  if (filtered.length === 0) {
    jobsContainer.innerHTML = "<p>No matching jobs found.</p>";
    return;
  }

  jobsContainer.innerHTML = filtered
    .map(
      job => `
        <article class="job">
          <h3>${escapeHtml(job.title)}</h3>
          <p><strong>${escapeHtml(job.company)}</strong></p>
          <p>
            <span class="badge">${escapeHtml(job.location)}</span>
            <span class="badge">${escapeHtml(job.work_mode || "Not specified")}</span>
            <span class="badge">${escapeHtml(job.source)}</span>
          </p>
          <a class="apply" href="${job.url}" target="_blank" rel="noopener">
            View / Apply
          </a>
        </article>
      `
    )
    .join("");
}

function renderSearchLinks() {
  const query = encodeURIComponent(searchInput.value || "HR jobs");

  searchLinksContainer.innerHTML = jobSites
    .map(
      site => `
        <a href="${site.url.replace("{query}", query)}"
           target="_blank"
           rel="noopener">
          ${site.name}
        </a>
      `
    )
    .join("");
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

searchInput.addEventListener("input", () => {
  renderJobs();
  renderSearchLinks();
});

locationSelect.addEventListener("change", renderJobs);
modeSelect.addEventListener("change", renderJobs);
sourceSelect.addEventListener("change", renderJobs);

loadJobs();
renderSearchLinks();
