const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
    technology: ['HTML', 'CSS'],
    completed: true 
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
    technology: ['Python'],
    completed: true 
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false 
  }
];

function normalizeCompletionProperty(list) {
  list.forEach((c) => {
    if (typeof c.complete === 'boolean' && typeof c.completed !== 'boolean') {
      c.completed = c.complete;
    }
  });
}

function applyUserCompletions(list) {
  const userCompletedKeys = new Set([
    'CSE 110',
    'WDD 130',
    'CSE 111',
    'CSE 210',
    'WDD 131'
  ]);

  list.forEach((c) => {
    const key = `${c.subject} ${c.number}`;
    if (userCompletedKeys.has(key)) {
      c.completed = true;
      c.complete = true;
    }
  });
}

/* ---------- 3) Renderizado y filtrado ---------- */
const courseListEl = document.getElementById('course-list');
const totalCreditsEl = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filters button');

/**
 * Renderiza tarjetas de cursos con diferenciación visual.
 * @param {'all'|'WDD'|'CSE'} filter
 */
function renderCourses(filter = 'all') {
  if (!courseListEl || !totalCreditsEl) return;
  let filtered = courses;
  if (filter !== 'all') {
    filtered = courses.filter((c) => c.subject === filter);
  }

  // Limpieza del contenedor
  courseListEl.innerHTML = '';

  // Suma de créditos y creación de tarjetas
  let credits = 0;
  filtered.forEach((course) => {
    credits += course.credits;

    // Card
    const card = document.createElement('article');
    card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
    card.setAttribute(
      'aria-label',
      `${course.subject} ${course.number} - ${course.title} (${course.completed ? 'completed' : 'incomplete'})`
    );

    // Content card
    card.innerHTML = `
      <h3 class="course-title">${course.subject} ${course.number} — ${course.title}</h3>
    `;
    courseListEl.appendChild(card);
  });

  // Total credits
  totalCreditsEl.textContent = `The total credits for course listed above is ${credits}`;
}

/* ---------- 4) Wayfinding: estado activo de botones ---------- */
function updateActiveButton(target) {
  filterButtons.forEach((btn) => {
    const isActive = btn === target;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

/* ---------- 5) Inicialización ---------- */
(function initCoursesUI() {
  normalizeCompletionProperty(courses);
  applyUserCompletions(courses);
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      updateActiveButton(btn);
      renderCourses(filter);
    });
  });
  const defaultBtn = document.querySelector('.filters button[data-filter="all"]');
  if (defaultBtn) updateActiveButton(defaultBtn);

  renderCourses('all');
})();
