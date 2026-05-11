import useInView from '../hooks/useInView'
import { skills } from '../data'

const techIcons = {
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'ASP.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  Svelte: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  Kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  Terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  TensorFlow: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
  pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  GraphQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className={`fade-up ${inView ? 'in-view' : ''}`} style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Tech stack</div>
          <h2 className="section-title">My <span className="gradient-text">skills</span></h2>
          <p className="section-desc">Tools and technologies I use to build real things.</p>
        </div>

        <div className="skills__groups">
          {skills.map((group, gi) => (
            <div
              key={group.category}
              className={`skills__group fade-up ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <div className="skills__group-header">
                <span className="skills__group-icon">{group.icon}</span>
                <span className="skills__group-name">{group.category}</span>
              </div>
              <div className="skills__items">
                {group.items.map((item, ii) => (
                  <div
                    className="skill-chip"
                    key={item}
                    style={{ animationDelay: `${gi * 80 + ii * 40}ms` }}
                  >
                    {techIcons[item] && (
                      <img src={techIcons[item]} alt={item} className="skill-chip__icon" />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
