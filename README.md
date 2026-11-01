# HAM Lab 📡

Mobile-first, installable offline study app for the **U.S. Amateur Radio Technician Class** license exam.

## Live URL (after enabling GitHub Pages)

**https://shembree89.github.io/ham/**

Enable GitHub Pages: repo **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**. Wait for GitHub to deploy, then open the link using Chrome on Android and choose **Install app** / **Add to Home screen**.

## What is included

- All **409 questions** from the public-domain **2026–2030 NCVEC Technician** question pool (with February 19, 2026 errata).
- All **three diagram figures** bundled offline (as embedded image data in `figures.js`).
- Ten topic modules containing **35 in-depth guided chapters**—one for each official exam group—with multi-section explanations, worked examples, hands-on labs, **409 individually mapped exam knowledge objectives**, three interactive knowledge checks per chapter, and a complete 10–14-question group drill.
- Ten-question mixed module quizzes plus complete question-group mastery quizzes with contextual feedback and 80% passing targets.
- Realistic **35-question practice exams**, exactly one question per official group, passing at 26 correct.
- Spaced-repetition flashcards with **Again / Hard / Good / Easy** rating, due dates, and module selection.
- Device-local progress, study streaks, practice exam history, and JSON progress export/import.
- App shell and question pool cached for offline use via a service worker.

## Privacy and persistence

All progress and preferences are stored in `localStorage` on **each user's own device** under `hamlab-progress-v1`. Nothing is uploaded. Clearing site data or switching devices can erase progress. Export a JSON backup from the **More** tab and import it to restore progress elsewhere.

## Local development

Serve the folder over localhost: `python -m http.server 8000`. Visit `http://localhost:8000`. Service workers require localhost or HTTPS.

## Question source and attribution

- Authoritative NCVEC release: https://ncvec.org/index.php/2026-2030-technician-question-pool
- Machine-readable question set and diagrams: https://github.com/russolsen/ham_radio_question_pool/tree/main/technician-2026-2030

The NCVEC Question Pool Committee released the pool into the public domain. HAM Lab is an independent learning project, not affiliated with FCC, NCVEC, or ARRL. Introductory lessons are **not** an exhaustive substitute for studying the full question pool and FCC Part 97.

## Learning progression

Select **Learn → Module → Chapter**. Chapters contain a full concept guide, an interactive worked example, three real-question knowledge checks, and a drill that covers **every question from that exam group**. Chapters are marked read after completing the checks. Exam groups are marked mastered after scoring 80% or better on a full question-group drill. The home screen shows chapters read, not modules visited.

## Content coverage, version 5

Every official question ID `T0A01` through `T9B12` in the 2026–2030 pool has an individually authored exam fact in `exam-facts-1.js` through `exam-facts-4.js`. The fact is taught **before** the knowledge checks in the relevant chapter, and feedback links straight back to that exact fact. The previous word-overlap algorithm (which selected irrelevant 'related' paragraphs) has been removed.

Run `node scripts/audit-coverage.mjs` to check all 409 IDs, 35 groups, correspondence, and key regression cases. The coverage audit verifies **question-to-lesson mapping**, not that every explanation is infallible; consult the official NCVEC answer key and FCC regulations for authoritative specifics.

## Next iterations

Richer illustrated lessons, question-specific explanations, calculation practice, accessibility refinements, offline reminders, and optional custom exam settings.
