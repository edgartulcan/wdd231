const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]



const courseListEl = document.getElementById('course-list');
const totalCreditsEl = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filters button');

/**
 * Renderiza tarjetas de cursos con diferenciación visual.
 * @param {'all'|'WDD'|'CSE'} filter
 */
function renderCourses(filter = 'all') {
  if (!courseListEl || !totalCreditsEl) return;

  // Filtrado por subject
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

    // tarjeta
    const card = document.createElement('article');
    card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
    card.setAttribute(
      'aria-label',
      `${course.subject} ${course.number} - ${course.title} (${course.completed ? 'completed' : 'incomplete'})`
    );

    // Contenido de la tarjeta
    card.innerHTML = `
      <h3 class="course-title">${course.subject} ${course.number} — ${course.title}</h3>
        `;
    courseListEl.appendChild(card);
  });

  // Total de créditos del conjunto mostrado
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
  // Normaliza la propiedad "complete" → "completed" si viene así
  normalizeCompletionProperty(courses);

  // Aplica tu progreso (marca completed=true donde corresponda)
  applyUserCompletions(courses);

  // Listeners de filtro
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      updateActiveButton(btn);
      renderCourses(filter);
    });
  });

  // Estado inicial: Todos
  const defaultBtn = document.querySelector('.filters button[data-filter="all"]');
  if (defaultBtn) updateActiveButton(defaultBtn);

  renderCourses('all');
})();
