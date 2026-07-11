// Module-level so nested/simultaneous overlays (Modal, Sidebar, ...) sharing this
// lock nest correctly — only the outermost lock/unlock touches the DOM. iOS Safari
// ignores plain overflow:hidden on body, hence the position:fixed + top offset.
let lockCount = 0;
let lockedScrollY = 0;

export function lockBodyScroll() {
  if (lockCount === 0) {
    lockedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
  }
  lockCount++;
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  }
}
