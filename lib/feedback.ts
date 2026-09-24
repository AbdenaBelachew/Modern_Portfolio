// Tiny, dependency-free feedback helpers used by interactive components.

// A short vibration on devices that support it (Android). No-op elsewhere.
export function haptic(ms = 8) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(ms);
  } catch {
    // Some browsers throw when vibration is blocked; feedback is optional.
  }
}

// Shows a message in the <Toaster /> mounted on the page.
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>('app-toast', { detail: message }));
}

export async function copyText(text: string, message: string) {
  try {
    await navigator.clipboard.writeText(text);
    haptic();
    toast(message);
  } catch {
    toast('Could not copy. Long-press to copy instead.');
  }
}
