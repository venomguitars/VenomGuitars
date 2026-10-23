# Venom Guitars — Admin Portal

The admin lives at **/admin** (e.g. `https://venomguitars.com.au/admin/`). It is a visual editor
(Sveltia CMS): pick a page, edit the text in forms, press **Save**. Each save is committed to this
GitHub repo and the live site updates within a minute or two. Every change is in the repo history,
so any edit can be rolled back.

## What you can edit
* **Site settings** – contact email, social links, footer tagline/description/copyright (applied on every page).
* **Every page's text** – headings, paragraphs, buttons, spec tables, team bios, FAQ etc., grouped by section.
* **Search settings (SEO)** – the browser-tab title and search description for each page.
* Colour text red with `[[words]]`, bold with `**words**`.
* Images: upload from the editor (saved to `/images`).

## Logging in (two layers)
1. **Cloudflare Access** (put in front of `/admin*`) – you must pass an email one-time-code before the
   admin even loads. See "Cloudflare setup" below.
2. **GitHub token** – the editor asks you to *Sign in with token*. Use a fine-grained personal access
   token limited to this one repository with **Contents: Read and write**. Only you hold it.

## How it works
Each editable element in the HTML has a `data-cms="section.field"` attribute. The default text stays
in the HTML; `js/content.js` swaps in any saved edit from `content/<page>.json` when the page loads.
`admin/config.yml` describes the editor forms. No build step is needed.

## Cloudflare setup (one-off)
1. Create a free account at dash.cloudflare.com.
2. **Workers & Pages → Create → Pages → Connect to Git** → pick `venomguitars/VenomGuitars`,
   branch `main`. Framework: none. Build command: *(blank)*. Output directory: `/`.
3. After the first deploy, add your domain under **Custom domains**.
4. **Zero Trust → Access → Applications → Add → Self-hosted**: domain `venomguitars.com.au`,
   path `admin*`; policy *Allow* → Emails → your email; login method *One-time PIN*.
5. Create the GitHub token above (GitHub → Settings → Developer settings → Fine-grained tokens).

## Adding new editable text later
Add `data-cms="sN.kM"` to the element, add the same key to `content/<page>.json` and a matching field
in `admin/config.yml`.
