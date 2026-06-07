# 🐍 Venom Guitars Website

A fully custom website for **Venom Guitars** — Australian custom guitar builders. Black and red grungy indie aesthetic, themed around the snake-and-guitar logo.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, brand story, featured series, build video preview |
| About | `about.html` | Story, purpose, values, timeline, team |
| Designs | `designs.html` | Red Belly Black, Taipan, Death Adder series + Custom Builds |
| Build Videos | `builds.html` | Video library, featured build, YouTube channel CTA |
| Education | `education.html` | Courses, quick guides, FAQ, luthier's glossary |
| Community | `community.html` | Social channels, member spotlights, newsletter signup |
| Media | `media.html` | Blog articles, press coverage, social feed |
| Contact | `contact.html` | Contact form with enquiry types, info panel |

## File Structure

```
venom-guitars/
├── index.html
├── about.html
├── designs.html
├── builds.html
├── education.html
├── community.html
├── media.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── logo.png
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `venom-guitars`)
2. Upload all files maintaining the directory structure above
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch**
5. Choose **main** branch, **/ (root)** folder
6. Click **Save** — your site will be live at `https://yourusername.github.io/venom-guitars/`

### Using GitHub Desktop (easiest)
1. Clone your new repo locally
2. Copy all website files into the cloned folder
3. Commit and push
4. Enable GitHub Pages in repo settings

### Using Git CLI
```bash
git init
git add .
git commit -m "Initial Venom Guitars website"
git remote add origin https://github.com/YOURUSERNAME/venom-guitars.git
git push -u origin main
```

## Custom Domain (optional)
To use `venomguitars.com.au`:
1. Add a `CNAME` file in the root containing: `venomguitars.com.au`
2. In your domain DNS, add a CNAME record pointing to `YOURUSERNAME.github.io`
3. Enable custom domain in GitHub Pages settings

## Design System

- **Fonts**: Bebas Neue (display), Permanent Marker (grunge accents), Oswald (body), Special Elite (quotes)
- **Colors**: Black `#0a0a0a`, Red `#c0000c`, Cream `#e8dcc8`
- **Theme**: Grungy indie, dark industrial, Australian identity
- **Logo**: Snake coiled around guitar, red drip text

## Social Links (update in each HTML file)
- YouTube: `https://youtube.com/@venomguitars`
- Instagram: `https://instagram.com/@venomguitars`
- TikTok: `https://tiktok.com/@venomguitars`
- Facebook: `https://facebook.com/venomguitars`
- Email: `venomguitarsaus@gmail.com`
