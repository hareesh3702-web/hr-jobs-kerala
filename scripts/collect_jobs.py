import json
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "scripts" / "sources.yaml"
OUTPUT = ROOT / "data" / "jobs.json"

with open(CONFIG, "r", encoding="utf-8") as file:
    config = yaml.safe_load(file)

existing = []

if OUTPUT.exists():
    with open(OUTPUT, "r", encoding="utf-8") as file:
        existing = json.load(file)

# Add permitted official sources here.
# Example structure:
# {
#     "title": "HR Executive",
#     "company": "Company Name",
#     "location": "Palakkad, Kerala",
#     "work_mode": "On-site",
#     "source": "Company Website",
#     "url": "https://example.com/job",
#     "posted_date": "2026-11-27"
# }

new_jobs = []

all_jobs = existing + new_jobs

# Remove duplicate jobs using title + company + URL
unique_jobs = []
seen = set()

for job in all_jobs:
    key = (
        job.get("title", "").lower(),
        job.get("company", "").lower(),
        job.get("url", "")
    )

    if key not in seen:
        seen.add(key)
        unique_jobs.append(job)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)

with open(OUTPUT, "w", encoding="utf-8") as file:
    json.dump(unique_jobs, file, indent=2, ensure_ascii=False)

print(f"Saved {len(unique_jobs)} jobs to {OUTPUT}")
