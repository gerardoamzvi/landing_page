import { StrictMode, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type IconName = 'arrow' | 'heart' | 'spark' | 'people' | 'chat' | 'check' | 'menu' | 'close' | 'briefcase' | 'pin'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  const shapes: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    heart: <path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" /></>,
    people: <><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-1.5a4.5 4.5 0 0 0-3.3-4.34M16 3.16a4 4 0 0 1 0 7.68" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.2-.6L4 20l1.5-3.4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11 0v2h4v-2" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  }

  return <svg {...common}>{shapes[name]}</svg>
}

function Wordmark() {
  return (
    <span className="wordmark-text" aria-label="Find my date boss">
      <span>find my </span><span className="word-date">date</span><span className="word-boss">boss</span>
    </span>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const clearHash = () => window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`)
  const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

  const handleAnchorNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.hash.slice(1)
    event.preventDefault()
    closeMenu()

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: scrollBehavior() })
      clearHash()
      return
    }

    const target = document.getElementById(targetId)
    if (!target) return

    target.scrollIntoView({
      behavior: scrollBehavior(),
      block: 'start',
    })
    clearHash()
  }

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    requestAnimationFrame(() => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0 })
        clearHash()
        return
      }

      const target = document.getElementById(targetId)
      if (!target) return
      target.scrollIntoView({ block: 'start' })
      clearHash()
    })
  }, [])

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#top" aria-label="Find my date boss home" onClick={handleAnchorNavigation}>
          <Wordmark />
        </a>

        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
          <a href="#how-it-works" onClick={handleAnchorNavigation}>How it works</a>
          <a href="#candidates" onClick={handleAnchorNavigation}>For candidates</a>
          <a href="#founders" onClick={handleAnchorNavigation}>For founders</a>
          <a href="#faq" onClick={handleAnchorNavigation}>FAQ</a>
          <a className="button button-small nav-button" href="#product" onClick={handleAnchorNavigation}>See the app <Icon name="arrow" size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-width">
          <div className="hero-copy">
            <p className="eyebrow"><span />Personality-first hiring for startup teams</p>
            <h1>Stop applying.<br /><em>Start matching.</em></h1>
            <p className="hero-lede">Find the people and teams you want to work with before a CV becomes the whole conversation.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how-it-works" onClick={handleAnchorNavigation}>See how it works <Icon name="arrow" size={18} /></a>
              <a className="button button-secondary" href="#product" onClick={handleAnchorNavigation}>Explore the app</a>
            </div>
            <p className="human-note"><span className="human-note-icon"><Icon name="heart" size={15} /></span>Hiring is personal. The first step should feel human.</p>
          </div>

          <div className="hero-product">
            <div className="hero-shape hero-shape-one" />
            <div className="hero-shape hero-shape-two" />
            <figure className="hero-device hero-device-welcome">
              <img src="/app-screens/welcome-hero.png" alt="Find my date boss welcome screen: Good people. Good work." />
            </figure>
          </div>
        </section>

        <section className="principles" aria-label="Product principles">
          <div className="principles-track">
            <span>People before paperwork</span><i>✳</i><span>Interest goes both ways</span><i>✳</i><span>Talk before the interview</span><i>✳</i><span>People before paperwork</span><i>✳</i><span>Interest goes both ways</span>
          </div>
        </section>

        <section className="page-width intro-section" id="how-it-works">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span />A better first conversation</p>
              <h2>Less searching through CVs.<br /><em>More looking forward to Monday.</em></h2>
            </div>
            <p>See the person, the role, and the essentials before either side reaches out.</p>
          </div>

          <div className="steps">
            <article className="step-card">
              <span className="step-number">01</span>
              <span className="step-icon"><Icon name="people" size={23} /></span>
              <h3>Meet the person behind the role.</h3>
              <p>See working style, priorities, and the practical details before you decide.</p>
            </article>
            <article className="step-card step-card-accent">
              <span className="step-number">02</span>
              <span className="step-icon"><Icon name="heart" size={23} /></span>
              <h3>Match when it feels mutual.</h3>
              <p>Both sides choose. When the interest is shared, the chat opens.</p>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <span className="step-icon"><Icon name="chat" size={23} /></span>
              <h3>Start a real conversation.</h3>
              <p>Message directly, swap a voice note, and decide whether to meet.</p>
            </article>
          </div>
        </section>

        <section className="product-section" id="product">
          <div className="page-width product-grid">
            <div className="product-copy">
              <p className="eyebrow"><span />Everything you need to decide</p>
              <h2>A shared yes<br /><em>starts the conversation.</em></h2>
              <p>Once you both choose to connect, the conversation starts with the context that matters already in view.</p>
              <ul className="feature-list">
                <li><span><Icon name="check" size={14} /></span>Working style, personality, and role essentials</li>
                <li><span><Icon name="check" size={14} /></span>Interest from both sides</li>
                <li><span><Icon name="check" size={14} /></span>A chat that starts with context</li>
              </ul>
            </div>
            <figure className="product-image product-image-large">
              <img src="/app-screens/mutual-yes.png" alt="A mutual match between a product designer and a startup co-founder in Find my date boss." loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="page-width audience-section" id="candidates">
          <div className="audience-copy">
            <p className="eyebrow"><span />For candidates</p>
            <h2>Find work that<br /><em>feels right.</em></h2>
            <p>A job title tells you only so much. Meet the team, see how they work, and decide whether the role feels worth your time.</p>
            <div className="audience-points">
              <span><Icon name="spark" size={17} />Personality before paperwork</span>
              <span><Icon name="pin" size={17} />Clear role, experience, and location</span>
            </div>
              <a className="text-link" href="#faq" onClick={handleAnchorNavigation}>See candidate questions <Icon name="arrow" size={16} /></a>
          </div>
          <figure className="audience-device audience-device-candidate">
            <img src="/app-screens/candidate-discover.png" alt="A candidate discovering a founder profile and role details in Find my date boss." loading="lazy" />
          </figure>
        </section>

        <section className="founder-section" id="founders">
          <div className="page-width founder-grid">
            <figure className="audience-device audience-device-founder">
              <img src="/app-screens/candidate-detail.png" alt="A candidate profile showing a voice intro, working style, project, experience, and CV in Find my date boss." loading="lazy" />
            </figure>
            <div className="audience-copy founder-copy">
              <p className="eyebrow"><span />For founders and small teams</p>
              <h2>Hire someone you want<br /><em>to build with.</em></h2>
              <p>Start with the role basics, then learn how a candidate thinks, communicates, and collaborates before the formal interview.</p>
              <div className="audience-points">
                <span><Icon name="briefcase" size={17} />Role, experience, and location filters</span>
                <span><Icon name="chat" size={17} />A human profile before the formal interview</span>
              </div>
              <a className="text-link" href="#faq" onClick={handleAnchorNavigation}>See founder questions <Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        <section className="conversation-section page-width">
          <div className="conversation-copy">
            <p className="eyebrow"><span />A match is only the start</p>
            <h2>When it clicks,<br /><em>keep talking.</em></h2>
            <p>Use the chat for the questions a CV cannot answer. Share a voice note, suggest coffee, or decide to move to an interview.</p>
          </div>
          <div className="conversation-devices" aria-label="A match becomes a chat and then a coffee meeting">
            <figure className="conversation-image">
              <img src="/app-screens/chat.png" alt="A direct conversation after a mutual match in Find my date boss." loading="lazy" />
            </figure>
            <figure className="conversation-image">
              <img src="/app-screens/coffee.png" alt="A coffee meeting confirmation after a mutual match in Find my date boss." loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="page-width faq-section" id="faq">
          <div className="faq-intro">
            <p className="eyebrow"><span />The practical questions</p>
            <h2>Human first.<br /><em>Still useful.</em></h2>
          </div>
          <div className="faq-list">
            <details open>
              <summary>Is Find my date boss a dating app?<Icon name="arrow" size={18} /></summary>
              <p>No. It uses familiar matching interactions to make professional introductions feel more human and more mutual.</p>
            </details>
            <details>
              <summary>Who is it for?<Icon name="arrow" size={18} /></summary>
              <p>It is for candidates looking for startup roles, and founders or small teams looking to hire.</p>
            </details>
            <details>
              <summary>How does a match work?<Icon name="arrow" size={18} /></summary>
              <p>Both people need to show interest. A mutual match opens a direct conversation.</p>
            </details>
            <details>
              <summary>Do skills and experience still matter?<Icon name="arrow" size={18} /></summary>
              <p>Yes. Role, experience, location, and work mode are part of every profile. They simply do not have to be the entire first impression.</p>
            </details>
          </div>
        </section>

        <section className="closing-section">
          <div className="page-width closing-inner">
            <p className="eyebrow"><span />The human side of hiring</p>
            <h2>Your next great conversation<br /><em>could start here.</em></h2>
            <p>Find people you want to work with. Build a team you want to build with.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#product" onClick={handleAnchorNavigation}>See the product <Icon name="arrow" size={18} /></a>
              <a className="button button-secondary" href="#top" onClick={handleAnchorNavigation}>Back to top</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer page-width">
        <a className="brand" href="#top" aria-label="Find my date boss home" onClick={handleAnchorNavigation}><Wordmark /></a>
        <p>A more human way to meet at work.</p>
        <div>
          <a href="#how-it-works" onClick={handleAnchorNavigation}>How it works</a>
          <a href="#candidates" onClick={handleAnchorNavigation}>Candidates</a>
          <a href="#founders" onClick={handleAnchorNavigation}>Founders</a>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
