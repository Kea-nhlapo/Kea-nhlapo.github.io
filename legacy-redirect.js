// The site moved to keanhlapo.site. GitHub Pages still serves this repo at
// kea-nhlapo.github.io, so send visitors on that address to the new one.
// Netlify serves the same files, so this has to check the hostname first.
if (location.hostname === 'kea-nhlapo.github.io') {
  location.replace('https://keanhlapo.site' + location.pathname + location.search + location.hash);
}
