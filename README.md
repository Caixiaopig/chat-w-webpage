# Chat w WebPage - Documentation

This directory contains the documentation and privacy policy pages for the Chat w WebPage Chrome extension.

## Files

- `index.html` - Main documentation landing page
- `privacy-policy.html` - Privacy policy (English)
- `privacy-policy-zh.html` - Privacy policy (Chinese)

## Setting up GitHub Pages

To deploy these documentation pages using GitHub Pages:

### Method 1: Using the website folder (Recommended)

1. **Push this project to GitHub:**
   ```bash
   # If you haven't initialized a git repository yet
   git init
   git add .
   git commit -m "Initial commit with documentation"

   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/FJVN/chat-w-webpage.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** (⚙️)
   - Scroll down to the **Pages** section in the left sidebar
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/website`
   - Click **Save**

3. **Access your documentation:**
   - After a few minutes, your site will be available at:
   - `https://FJVN.github.io/chat-w-webpage/`
   - Privacy policy (English): `https://FJVN.github.io/chat-w-webpage/privacy-policy.html`
   - Privacy policy (Chinese): `https://FJVN.github.io/chat-w-webpage/privacy-policy-zh.html`

### Method 2: Using GitHub Actions (Advanced)

Create `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]
    paths:
      - 'website/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website
```

## Using the Privacy Policy URL

Once deployed, update the following:

1. **Chrome Web Store submission:**
   - Privacy policy URL: `https://FJVN.github.io/talking-with-webpage/privacy-policy.html`

2. **Update links in the HTML files:**
   - Replace `FJVN` with your actual GitHub username in:
     - `index.html`
     - `privacy-policy.html`
     - `privacy-policy-zh.html`

3. **Update contact email:**
   - Replace `admin@haoba.cloud` with your actual contact email

## Customization

Feel free to customize the documentation pages:

- Modify the styles in the `<style>` tags
- Add more documentation pages
- Update the content to match your project's needs
- Add screenshots or demo videos

## License

This documentation is part of the Chat w WebPage project and is subject to the same license.
