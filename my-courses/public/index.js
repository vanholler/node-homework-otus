async function addComment(e) {
  const comment = document.getElementById('comment-text');
  const text = comment.value;
  // TODO
}

function hide(id) {
  document.getElementById(id).classList.remove('is-active');
}

function show(id) {
  document.getElementById(id).classList.add('is-active');
}

function switchTab(e) {
  const currentTab = e.target.parentNode;
  const contents = Array.from(currentTab.closest('div.tabs-container').querySelector('div.tabs-content').children);
  const allTabs = Array.from(currentTab.parentNode.children);
  allTabs.forEach((tab, i) => {
    if (tab !== currentTab) {
      tab.classList.remove('is-active');
      contents[i].classList.remove('is-active');
    } else {
      tab.classList.add('is-active');
      contents[i].classList.add('is-active');
    }
  });
}
