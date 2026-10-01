# 7-Day Fitness Plan (installable PWA)

A single-file, installable Progressive Web App for a 7-day muscle-building plan.
Open it in a browser, pick **Beginner** or **Medium**, and the workout content
updates to match. Your choice is remembered (stored in the browser) and stays the
same across reloads and relaunches until you change it. The diet plan is the same
in both modes; only the exercises (sets, loads and coaching cues) and the intro
guidance change by mode.

After the first open it works **offline** — a service worker caches the app shell
and icons so you can use it on a plane or with no signal. The only thing that needs
internet is tapping a "Watch demo" link (those open YouTube).

## Files

- `index.html` — the whole app: inline styles, inline SVG icons, both plans, and the mode logic.
- `manifest.webmanifest` — PWA metadata (name, colors, icons).
- `service-worker.js` — offline caching.
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — app icons (generated PNGs: dark-green background with a lighter-green dumbbell).
- `7-Day Fitness Plan - beginner.html`, `7-Day Fitness Plan - medium.html` — the original source files, kept for reference.

## Publish it with GitHub Pages

1. Create a repository on GitHub and push these files to the `main` branch (keep them at the repository root).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the **`main`** branch and the **`/ (root)`** folder, then **Save**.
5. Wait a minute for the first deploy. Your app will be available at:

   ```
   https://<username>.github.io/<repo>/
   ```

   Replace `<username>` with your GitHub username and `<repo>` with the repository name.

## Install it on an iPhone (iPhone 14 and later)

1. Open the GitHub Pages URL above in **Safari** (installation to the Home Screen only works from Safari on iOS).
2. Tap the **Share** icon (the square with an upward arrow).
3. Choose **Add to Home Screen**, then tap **Add**.
4. Launch it from the Home Screen — it opens full-screen like a native app.

Once you've opened it at least once, it keeps working **offline**.

## Notes

- All asset paths are relative (`./...`) so the app works under the GitHub Pages
  subpath without extra configuration.
- The two original HTML files are intentionally preserved and are not used by the app.
