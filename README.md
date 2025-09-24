# Staunton Tutoring — Static Site

A small, production-ready static website for a tutoring business. Mobile-first, accessible, and deployable to Netlify.

## Quick start
1. Unzip the project.
2. Open `index.html` in your browser — everything is static and works without a build.
3. Commit to a GitHub repo and connect to Netlify for instant deploys.

## Netlify deployment
- Drag-and-drop the folder into the Netlify UI, or connect the GitHub repo.
- Set publish directory to the repo root.
- To enable Netlify Forms on `contact.html`, add:
  ```html
  <form id="contact-form" name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <p style="display:none"><label>Don’t fill this out: <input name="bot-field"></label></p>
    <!-- keep the same fields -->
  </form>
  ```
- Netlify will capture submissions in the dashboard.

## Structure
```
/assets       # favicon/logo + placeholder images
/css          # styles
/js           # vanilla JS (dropdown, reveals, form validation)
index.html
services.html
about-bio.html
about-approach.html
contact.html
robots.txt
sitemap.xml
```

## Customisation
- **Colours & spacing:** Edit CSS custom properties at the top of `/css/styles.css`.
- **Fonts:** Fraunces (display) and Inter (body) are loaded via Google Fonts.
- **Animations:** Reveals respect `prefers-reduced-motion` automatically.
- **Images:** Replace placeholders in `/assets/` with your own images (keep filenames).

## Accessibility
- Keyboard-accessible dropdown (Esc closes, arrow navigation).
- Visible `:focus-visible` styles.
- Form has labelled errors and ARIA live updates.
- Colour contrast ~AA; adjust variables if swapping palette.

## SEO / Social
- Logical headings, meta descriptions, canonical links.
- Open Graph + Twitter tags (update domain and copy).
- `sitemap.xml` and `robots.txt` included.

## Notes
- Update the `canonical` links and `Sitemap` URL to your real production domain.
- The email is currently set to `ben.jp.staunton@iclould.com` per request.
