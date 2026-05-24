import useInView from '../hooks/useInView'
import { skills } from '../data'

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section className="section section--alt" id="skills" ref={ref}>
      <div className="container">
        <header className={`section__head fade-up ${inView ? 'in-view' : ''}`}>
          <span className="section-num">¶ 04</span>
          <h2 className="section-title">Tools &amp; technologies.</h2>
        </header>

        <div className={`stack fade-up fade-up--d1 ${inView ? 'in-view' : ''}`}>
          {skills.map(group => (
            <div className="stack__group" key={group.category}>
              <div className="stack__cat">
                <span>{group.category}</span>
                <span className="stack__cat-rule" />
                <span className="stack__cat-n">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="stack__items">
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
