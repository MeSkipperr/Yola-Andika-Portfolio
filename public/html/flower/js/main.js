
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    // const titles = ("HAPPY VALENTINE DAY").split('') //Testing
    const titles = ("FLOWER FOR U :3").split('') //Testing
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 150); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};