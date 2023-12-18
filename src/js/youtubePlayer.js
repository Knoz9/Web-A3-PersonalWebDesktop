/**
 * Opens the YouTube app by rendering a YouTube video player.
 * @param {HTMLElement} container - The container element.
 */
export function openYouTubeApp(container) {
  container.innerHTML = '';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter YouTube Video URL';
  input.className = 'youtube-url-input';

  const button = document.createElement('button');
  button.textContent = 'Load Video';
  button.className = 'youtube-load-button';

  const iframe = document.createElement('iframe');
  iframe.className = 'youtube-iframe';
  iframe.style.display = 'none'; // Initially hide the iframe
  iframe.width = '560';
  iframe.height = '315';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; encrypted-media; ' +
  'gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  button.onclick = () => {
    console.log('Button clicked');
    const videoUrl = input.value;
    const videoId = extractYouTubeID(videoUrl);
    if (videoId) {
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.style.display = 'block';
    }
  };

  container.appendChild(input);
  container.appendChild(button);
  container.appendChild(iframe);
}
/**
 * Extracts the YouTube video ID from a given URL.
 * @param {string} url - The YouTube video URL.
 * @return {string|null} - The YouTube video ID if found, otherwise null.
 */
function extractYouTubeID(url) {
  const regExp = /(youtu.be\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
}
