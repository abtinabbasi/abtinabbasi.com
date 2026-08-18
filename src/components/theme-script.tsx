// Must be a real inline <script> in the document head: it has to run before
// first paint, and next/script does not inline it into the initial HTML.
const code = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
