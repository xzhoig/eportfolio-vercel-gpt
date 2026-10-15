# Nelson Chan — Personal ePortfolio

A static, responsive ePortfolio for the CIS222 Web Design and Development Individual Assignment. Built with plain HTML, CSS, and JavaScript using the supplied design specification.

## Open the website

1. Extract the ZIP while keeping the `nelson-portfolio/` folder structure intact.
2. Open `index.html` in a modern browser. No installation or build command is required.
3. Use the navigation to visit Personal, Experience, Education, Skills, Work, and Site Map.

For a local web server, run `python -m http.server 8000` from the `nelson-portfolio/` folder and visit `http://localhost:8000`.

## Add your profile photo

Put your own photo at **`images/profile.jpg`**, with this exact lower-case filename and extension. The Home and Personal pages share this file. The portrait area handles a missing photo without displaying a broken image or another person's photograph. Keep the original aspect ratio; the website crops the displayed portrait to fit its frame.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the **contents** of `nelson-portfolio/`, so `index.html` is at the repository root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and **`/ (root)`**, then save.
5. Open the website URL GitHub provides after deployment completes.

All portfolio links use relative paths so the site also works under a repository subpath. No backend, account, API key, or external form service is required.

## Included pages and work

| File | Purpose |
| --- | --- |
| `index.html` | Introduction and selected coursework |
| `personal.html` | Verified personal information and career direction |
| `experience.html` | Practical experience demonstrated by course exercises |
| `education.html` | Current programme and learning context |
| `skills.html` | Skills supported by the submitted files and an interactive CSS demonstration |
| `work.html` | Searchable/filterable showcase, adapted demos, and original downloads |
| `sitemap.html` | Links to all portfolio pages and demonstrations |

The six self-contained demonstrations are under `demos/personal/`, `demos/functions/`, `demos/contact/`, `demos/layout/`, `demos/registration/`, and `demos/techcorp/`. Demo forms operate locally for demonstration and do not submit information to a server.

`downloads/` contains the original submission archives and `AboutMe.docx`. The demos are adapted presentations of those exercises; the original archives preserve the supplied work for inspection. Some media referenced in the original HTML was absent from the supplied ZIP. See [content sources](docs/content-sources.md) for details.

## Content and assignment evidence

Personal facts come from the supplied About Me document, submitted HTML, and the user's explicit clarification that the programme started in 2025. Coursework is not presented as employment. No employer, job history, grade, award, certification, phone number, or email address has been invented.

- [Requirement and rubric mapping](docs/requirements.md)
- [Content sources and adaptations](docs/content-sources.md)
- [Supplied design specification](docs/DESIGN.md)
- [Original assignment brief](docs/assignment-brief.docx)
- [Original marking rubric](docs/assignment-rubric.docx)

The design includes responsive layouts, keyboard focus states, hover feedback, and reduced-motion support. Interactive features include mobile navigation, project search and filtering, project details, a CSS playground, and a back-to-top control. Assessment remains at the marker's discretion; this project does not claim a guaranteed grade.
