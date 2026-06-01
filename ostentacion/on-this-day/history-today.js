document.addEventListener('DOMContentLoaded', function() {
  // Get all posts data from a Jekyll-injected JSON object
  const postsByDate = window.onThisDayPostsByDate || {};
  // Build 366 days (MM-DD)
  function isLeap(year) { return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0); }
  const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (isLeap(new Date().getFullYear())) daysInMonth[1] = 29;
  const allDays = [];
  const allMonths = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= daysInMonth[m]; d++) {
      allDays.push((m+1).toString().padStart(2,'0') + '-' + d.toString().padStart(2,'0'));
    }
  }
  // Find today index
  const today = new Date();
  const mmdd = (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
  let currentIdx = allDays.indexOf(mmdd);
  const todayIdx = currentIdx;

  // DOM elements
  const axis = document.getElementById('timeline-axis');
  const monthRow = axis.querySelector('.axis-month-row');
  const dayRow = axis.querySelector('.axis-day-row');
  const articles = document.getElementById('timeline-articles');
  const goTodayBtn = document.getElementById('go-today-btn');
  const leftBtn = document.getElementById('wheel-left');
  const rightBtn = document.getElementById('wheel-right');

  function renderAxis(centerIdx) {
    // Show 9 days: 4 left, center, 4 right
    let daysHtml = '';
    for (let i = -4; i <= 4; i++) {
      let idx = (centerIdx + i + allDays.length) % allDays.length;
      let day = allDays[idx];
      let dayNum = parseInt(day.slice(3), 10);
      let classes = 'axis-day';
      if (i === 0) classes += ' center';
      daysHtml += `<div class="${classes}" data-idx="${idx}">${dayNum}</div>`;
    }
    dayRow.innerHTML = daysHtml;
    // Month row: show month for center day
    let centerDay = allDays[centerIdx];
    let monthIdx = parseInt(centerDay.slice(0,2), 10) - 1;
    monthRow.innerHTML = `<span class="axis-month">${allMonths[monthIdx]}</span>`;
  }

  function renderArticles(idx) {
    const day = allDays[idx];
    const posts = postsByDate[day] || [];
    articles.classList.remove('fade-in');
    void articles.offsetWidth; // trigger reflow for animation
    if (posts.length > 0) {
      articles.innerHTML = `<div class="timeline-date today">${day}</div>` +
        '<ul class="timeline-posts">' + posts.map(post => `<li><a href="${post.url}">${post.title}</a> <span class="timeline-year">(${post.date.slice(0,4)})</span></li>`).join('') + '</ul>';
    } else {
      articles.innerHTML = `<div class="timeline-date today">${day}</div><div class="no-articles">历史上的今天没有文章</div>`;
    }
    setTimeout(()=>articles.classList.add('fade-in'), 10);
  }

  function goTo(idx) {
    currentIdx = (idx + allDays.length) % allDays.length;
    renderAxis(currentIdx);
    renderArticles(currentIdx);
    // Show/hide go-to-today button
    if (currentIdx !== todayIdx) {
      goTodayBtn.style.display = '';
    } else {
      goTodayBtn.style.display = 'none';
    }
  }

  goTodayBtn.onclick = () => goTo(todayIdx);
  leftBtn.onclick = () => goTo(currentIdx - 1);
  rightBtn.onclick = () => goTo(currentIdx + 1);

  // Touch/drag/scroll support for iOS-like axis (simple, no inertia)
  let dragStartX = null;
  let dragStartIdx = null;
  let dragging = false;

  dayRow.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      dragStartX = e.touches[0].clientX;
      dragStartIdx = currentIdx;
      dragging = true;
    }
  });
  dayRow.addEventListener('touchmove', e => {
    if (dragging && e.touches.length === 1) {
      let dx = e.touches[0].clientX - dragStartX;
      let offset = Math.round(dx / 48);
      goTo(dragStartIdx - offset);
    }
  });
  dayRow.addEventListener('touchend', e => {
    dragging = false;
  });

  // Mouse drag for desktop (simple, no inertia)
  dayRow.addEventListener('mousedown', e => {
    dragStartX = e.clientX;
    dragStartIdx = currentIdx;
    dragging = true;
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (dragging) {
      let dx = e.clientX - dragStartX;
      let offset = Math.round(dx / 48);
      goTo(dragStartIdx - offset);
    }
  });
  window.addEventListener('mouseup', e => {
    dragging = false;
  });

  // Wheel/trackpad scroll
  dayRow.addEventListener('wheel', e => {
    e.preventDefault();
    let delta = e.deltaX || e.deltaY;
    if (Math.abs(delta) > 10) {
      goTo(currentIdx + (delta > 0 ? 1 : -1));
    }
  }, {passive:false});

  // Keyboard arrow support
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(currentIdx - 1);
    if (e.key === 'ArrowRight') goTo(currentIdx + 1);
  });

  // Click on day
  dayRow.addEventListener('click', e => {
    if (e.target.classList.contains('axis-day')) {
      let idx = parseInt(e.target.getAttribute('data-idx'), 10);
      goTo(idx);
    }
  });

  // Initial render
  renderAxis(currentIdx);
  renderArticles(currentIdx);
  if (currentIdx !== todayIdx) goTodayBtn.style.display = '';
});
