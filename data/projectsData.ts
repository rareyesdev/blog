const projectsData = [
  {
    title: 'Online JSON Viewer',
    description: `This is useful if you spend a lot of time comparing JSON objects.
    I wanted to have a way I could store them temporarily without having to create a bunch of files on my desktop.
    It's also an excuse to practice automation. I created a full CI/CD pipeline with automatic review apps from Pull Requests that are unit and end-to-end tested with Jest and Cypress.`,
    badges: [
      'React',
      'React Router',
      'Redux',
      'Redux Sagas',
      'TypeScript',
      'Semantic UI',
      'Emotion',
      'Jest',
      'Cypress',
      'Webpack',
      'Babel',
      'Google Analytics',
      'GitLab CI',
      'Heroku',
      'Netlify',
      'Prettier',
      'ESLint',
      'Lint Staged',
      'Commitizen',
    ],
    imgSrc: '/static/images/projects/online-json-viewer-project-preview.png',
    href: 'https://json-viewer.netlify.app/',
  },
  {
    title: 'Habits Tracker',
    description: `I use it to track my habits (good and bad). This way I know how well I'm doing.
    I wanted to learn Firebase.
    This is still in early development.`,
    badges: ['React', 'TypeScript', 'Firebase'],
    imgSrc: '/static/images/projects/habit-tracker-project-preview.png',
    href: 'https://habits.rareyes.dev/',
  },
]

export default projectsData
