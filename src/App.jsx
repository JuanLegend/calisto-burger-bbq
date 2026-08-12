import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  ArrowBendDownLeft,
  ArrowRight,
  Check,
  InstagramLogo,
  List,
  MapPin,
  Minus,
  Plus,
  ShoppingBagOpen,
  TiktokLogo,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const routes = [
  ['/', 'Inicio'],
  ['/menu', 'La carta'],
  ['/delivery', 'Domicilios'],
  ['/historia', 'Nosotros'],
  ['/eventos', 'Instagram'],
  ['/pedidos-grandes', 'Grupos'],
]

const burgers = [
  { name: 'Euphoria Master', description: 'Ganadora Burger Máster 2023 en Envigado. Carne, toffee de tocino, dip de queso, piña y ajonjolí.', price: '39.900' },
  { name: 'Arrechera', description: 'Carne, dip cremoso trufado, costilla ahumada en salsa de borojó, ajonjolí y vegetales.', price: '39.900' },
  { name: 'Cordillera Master', description: 'Carne, tocino ahumado, puerro crocante, queso campesino y melao de mortiño.', price: '40.900' },
  { name: 'Imperium', description: 'Carne 100% Wagyu, queso, salsa de la casa, vegetales y papas francesas.', price: '53.900' },
  { name: 'Piso Dos', description: 'Pan brioche, dos carnes, queso cheddar, tocineta y vegetales.', price: '48.600' },
  { name: 'Volcán', description: 'Carne, chile apanado relleno de queso, puerro crocante, jalapeño, cebolla y vegetales.', price: '43.900' },
]

const sides = [
  ['Costillas St. Louis', '380 g de costilla bañada en salsa BBQ Jack Daniel’s, acompañada de papas.', '56.900'],
  ['Smoke', 'Trocitos de costilla de cerdo caramelizados en salsa BBQ, papas y ensalada.', '37.900'],
  ['Bondiola', '300 g de cabeza de lomo de cerdo con papas y ensalada.', '38.900'],
  ['Churrasco', '270 g de chata madurada, acompañada de papas y ensalada.', '53.900'],
]

const drinks = [
  ['Jugo de mandarina', 'Preparado al momento.', '6.500'],
  ['Cerveza Corona', 'Botella fría.', '8.900'],
  ['Gaseosa 400 ml', 'Pepsi o Manzana.', '7.500'],
]

const deliveryLocations = [
  { id: 'envigado', name: 'Envigado', address: 'Calle 37 Sur #32-8', phone: '573013565757' },
  { id: 'laureles', name: 'Laureles', address: 'Transversal 74 #39B-21', phone: '573007921818' },
  { id: 'la-playa', name: 'La Playa', address: 'Calle 51 #40-35', phone: '573217494003' },
  { id: 'aventura', name: 'CC Aventura', address: 'Carrera 52 #65-91, Local 52-33', phone: '573217494003' },
]

const deliveryMenu = [
  { category: 'Burgers', items: burgers },
  { category: 'BBQ y parrilla', items: sides.map(([name, description, price]) => ({ name, description, price })) },
  { category: 'Bebidas', items: drinks.map(([name, description, price]) => ({ name, description, price })) },
]

const priceToNumber = price => Number(price.replace(/\./g, ''))
const formatPrice = value => new Intl.NumberFormat('es-CO').format(value)

const reels = [
  ['DRxwemmlaFh', 'Parrilla y cocina Calisto'],
  ['DWPH1ZEj44i', 'Burger Calisto en primer plano'],
  ['DYAokC0if2r', 'Experiencia Calisto Burger & BBQ'],
]

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  const go = (next) => {
    const url = new URL(next, window.location.origin)
    window.history.pushState({}, '', `${url.pathname}${url.hash}`)
    setPath(url.pathname)
    if (url.hash) {
      window.setTimeout(() => document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }
  return [path, go]
}

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const precise = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!precise || reduced || !dot.current || !ring.current) return

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.42, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.42, ease: 'power3.out' })
    const reset = () => {
      gsap.killTweensOf([dot.current, ring.current])
      dot.current?.classList.remove('is-visible')
      ring.current?.classList.remove('is-visible', 'is-active')
    }
    const move = (event) => {
      if (document.documentElement.classList.contains('experience-lock')) {
        reset()
        return
      }
      dot.current?.classList.add('is-visible')
      ring.current?.classList.add('is-visible')
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }
    const over = (event) => {
      const active = event.target.closest('a, button, [data-cursor]')
      ring.current?.classList.toggle('is-active', Boolean(active))
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('blur', reset)
    document.documentElement.addEventListener('mouseleave', reset)
    document.addEventListener('calisto:cursor-reset', reset)
    document.addEventListener('pointerover', over)
    document.documentElement.classList.add('has-custom-cursor')
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', reset)
      document.documentElement.removeEventListener('mouseleave', reset)
      document.removeEventListener('calisto:cursor-reset', reset)
      document.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return <><span className="cursor-dot" ref={dot} /><span className="cursor-ring" ref={ring} /></>
}

function Brand({ go, onClick }) {
  return <button className="brand" onClick={() => { go('/'); onClick?.() }} aria-label="Ir al inicio de Calisto"><img src="/images/calisto/logo-calisto-white-2x.png" alt="Calisto" /></button>
}

function Header({ go, openMenu, path, menuOpen }) {
  const onMenuPage = path === '/menu'
  const onHomePage = path === '/'
  return (
    <header className="header">
      <Brand go={go} />
      <div className="header-actions">
        {!onHomePage && <button className="menu-link" onClick={() => go(onMenuPage ? '/' : '/menu')}>{onMenuPage ? 'Inicio' : 'Ver carta'} <ArrowRight size={18} weight="bold" /></button>}
        <button className="icon-button" onClick={openMenu} aria-label="Abrir navegación" aria-expanded={menuOpen} aria-controls="main-menu"><List size={28} weight="bold" /></button>
      </div>
    </header>
  )
}

function MenuOverlay({ open, close, go }) {
  return (
    <div className={`menu-overlay ${open ? 'is-open' : ''}`} id="main-menu" aria-hidden={!open}>
      <div className="menu-top"><Brand go={go} onClick={close} /><button className="icon-button inverse" onClick={close} aria-label="Cerrar navegación"><X size={30} weight="bold" /></button></div>
      <nav className="main-nav" aria-label="Navegación principal">
        {routes.map(([href, label]) => <button tabIndex={open ? 0 : -1} key={href} onClick={() => { go(href); close() }}>{label}<ArrowRight size={28} /></button>)}
      </nav>
      <div className="menu-foot"><span>Hamburguesas / Parrilla / BBQ</span><span>Envigado / Medellín</span></div>
    </div>
  )
}

function Hero({ go }) {
  const root = useRef(null)
  const heat = useRef(null)
  const video = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (reduce) {
        video.current?.pause()
        gsap.set('.hero-brand-intro', { display: 'none' })
        return
      }

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .fromTo('.hero-brand-intro img', { opacity: 0, scale: .7, filter: 'blur(16px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: .72 })
        .fromTo('.hero-brand-burn', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: .55 }, '-=.4')
        .to('.hero-brand-intro img', { opacity: 0, scale: 1.18, filter: 'blur(12px)', duration: .42, ease: 'power3.in' }, '+=.28')
        .to('.hero-brand-intro', { opacity: 0, duration: .25, pointerEvents: 'none' }, '-=.18')
        .from('.hero-title span', { yPercent: 115, duration: .9, stagger: .1 }, '-=.08')
        .from('.hero-kicker, .hero-action, .hero-proof', { opacity: 0, y: 24, duration: .65, stagger: .08 }, '-=.58')
        .from('.hero-video', { scale: 1.12, duration: 1.8, ease: 'power3.out' }, '-=1.15')
    }, root)
    return () => context.revert()
  }, [])

  useEffect(() => {
    const precise = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!precise || reduced || !root.current || !heat.current) return
    const heatX = gsap.quickTo(heat.current, 'x', { duration: .55, ease: 'power3.out' })
    const heatY = gsap.quickTo(heat.current, 'y', { duration: .55, ease: 'power3.out' })
    const moveHeat = event => {
      const bounds = root.current.getBoundingClientRect()
      heatX(event.clientX - bounds.left)
      heatY(event.clientY - bounds.top)
    }
    root.current.addEventListener('pointermove', moveHeat)
    return () => root.current?.removeEventListener('pointermove', moveHeat)
  }, [])

  return (
    <section className="hero hero-cinematic" ref={root}>
      <video ref={video} className="hero-video" autoPlay muted playsInline preload="metadata" poster="/images/calisto/hero-official.webp" aria-hidden="true" onLoadedMetadata={event => { event.currentTarget.currentTime = 4.5 }} onTimeUpdate={event => { if (event.currentTarget.currentTime >= 12.5) event.currentTarget.currentTime = 4.5 }}>
        <source src="/images/calisto/calisto-fire-hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-embers" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="hero-heat" ref={heat} aria-hidden="true" />
      <div className="hero-brand-intro" aria-hidden="true"><img src="/images/calisto/logo-calisto-white-2x.png" alt="" /><span className="hero-brand-burn" /></div>
      <div className="hero-copy">
        <p className="hero-kicker">CALISTO / BURGER & BBQ</p>
        <h1 className="hero-title"><span>EL FUEGO</span><span>TIENE NOMBRE.</span></h1>
        <button className="primary-button hero-action" onClick={() => go('/delivery')}>Pedir por WhatsApp <ArrowRight size={20} weight="bold" /></button>
      </div>
      <div className="hero-proof"><strong>GANADORES</strong><span>BURGER MASTER 2023<br />ENVIGADO</span></div>
    </section>
  )
}

const layerData = [
  { name: 'Pan superior', className: 'layer-top', final: 0.234 },
  { name: 'Salsa', className: 'layer-sauce', final: 0.153 },
  { name: 'Pepinillos y cebolla', className: 'layer-pickles', final: 0.068 },
  { name: 'Queso superior', className: 'layer-cheese-one', final: 0.01 },
  { name: 'Carne superior', className: 'layer-patty-one', final: -0.049 },
  { name: 'Queso inferior', className: 'layer-cheese-two', final: -0.127 },
  { name: 'Carne inferior', className: 'layer-patty-two', final: -0.19 },
  { name: 'Pan inferior', className: 'layer-bottom', final: -0.267 },
]

function BurgerAssembly({ go }) {
  const root = useRef(null)
  const stage = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const unlockExperience = () => {
      document.documentElement.classList.remove('experience-lock')
      document.body.classList.remove('experience-lock')
    }
    const lockExperience = () => {
      const targetY = root.current?.offsetTop ?? window.scrollY
      document.dispatchEvent(new Event('calisto:cursor-reset'))
      document.documentElement.classList.add('experience-lock')
      document.body.classList.add('experience-lock')
      window.scrollTo({ top: targetY, behavior: 'auto' })
    }
    const context = gsap.context(() => {
      const layers = gsap.utils.toArray('.burger-layer')
      const finalY = (index) => () => stage.current.offsetHeight * layerData[index].final
      if (reduce) {
        layers.forEach((layer, index) => gsap.set(layer, { y: finalY(index) }))
        gsap.set('.assembly-copy-final, .cta-pointer', { opacity: 1 })
        return
      }

      const buildOrder = [7, 6, 5, 4, 3, 2, 1, 0]
      const travelScale = Math.min(1, Math.max(0.58, window.innerWidth / 1100))
      const entrances = [
        { x: 0, y: 320, rotation: 0, scale: 0.72 },
        { x: -360, y: 80, rotation: -13, scale: 0.86 },
        { x: 340, y: 35, rotation: 15, scale: 0.82 },
        { x: -340, y: -20, rotation: 11, scale: 0.86 },
        { x: 350, y: -60, rotation: -14, scale: 0.82 },
        { x: -230, y: -220, rotation: -9, scale: 0.75 },
        { x: 210, y: -270, rotation: 7, scale: 0.7 },
        { x: 0, y: -390, rotation: -8, scale: 0.76 },
      ]
      const particles = gsap.utils.toArray('.impact-particle')
      const timeline = gsap.timeline({ paused: true, defaults: { overwrite: 'auto', force3D: true } })

      gsap.set([...layers, stage.current], { force3D: true })

      timeline
        .fromTo('.assembly-intro strong', { opacity: 0, scale: 0.42, rotation: -7 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.32, ease: 'back.out(1.8)' })
        .to('.assembly-intro strong', { opacity: 0, scale: 1.72, duration: 0.2, ease: 'power3.in' }, '+=0.04')
        .fromTo('.assembly-flash', { opacity: 0 }, { opacity: 0.7, duration: 0.045, yoyo: true, repeat: 1 }, '-=0.05')
        .addLabel('build', '>-0.02')
        .fromTo('.assembly-copy', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out' }, 'build')

      buildOrder.forEach((layerIndex, orderIndex) => {
        const entrance = entrances[orderIndex]
        const layer = layers[layerIndex]
        gsap.set(layer, {
          x: entrance.x * travelScale,
          y: () => finalY(layerIndex)() + entrance.y * travelScale,
          rotation: entrance.rotation,
          scale: entrance.scale,
          opacity: 0,
        })
        timeline.to(layer, {
          x: 0,
          y: finalY(layerIndex),
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.48,
          ease: 'back.out(1.55)',
        }, `build+=${orderIndex * 0.105}`)
      })

      timeline
        .to('.assembly-word-one', { xPercent: -10, duration: 1.05, ease: 'power2.inOut' }, 'build')
        .to('.assembly-word-two', { xPercent: 10, duration: 1.05, ease: 'power2.inOut' }, 'build')
        .addLabel('impact', '>-0.08')
        .to('.assembly-copy', { opacity: 0, scale: 0.94, duration: 0.18, ease: 'power3.in' }, 'impact')
        .to(stage.current, { scaleX: 1.07, scaleY: 0.86, duration: 0.09, ease: 'power3.in' }, 'impact')
        .to(stage.current, { scaleX: 1, scaleY: 1, duration: 0.42, ease: 'elastic.out(1, 0.4)' }, 'impact+=0.09')
        .to(stage.current, { x: 7, duration: 0.035, yoyo: true, repeat: 5, ease: 'none' }, 'impact')
        .fromTo('.impact-ring', { opacity: 0.95, scale: 0.16 }, { opacity: 0, scale: 3.1, duration: 0.52, stagger: 0.045, ease: 'power3.out' }, 'impact')
        .fromTo('.assembly-flash', { opacity: 0 }, { opacity: 0.9, duration: 0.045, yoyo: true, repeat: 1 }, 'impact')
        .fromTo(particles, { opacity: 1, x: 0, y: 0, scale: 0.4 }, {
          opacity: 0,
          x: index => Math.cos((index / particles.length) * Math.PI * 2) * (170 + (index % 4) * 38),
          y: index => Math.sin((index / particles.length) * Math.PI * 2) * (170 + (index % 4) * 38),
          rotation: index => index * 115,
          scale: index => 0.75 + (index % 3) * 0.35,
          duration: 0.55,
          stagger: 0.006,
          ease: 'power4.out',
        }, 'impact')
        .fromTo('.assembly-copy-final', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.44, ease: 'power3.out' }, 'impact+=0.14')
        .fromTo('.cta-pointer', { opacity: 0, x: 32, y: -12, rotation: 6 }, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.36, ease: 'back.out(1.65)' }, 'impact+=0.32')
        .to('.cta-pointer svg', { x: -7, y: 7, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' })

      timeline.eventCallback('onComplete', () => {
        root.current?.classList.add('is-complete')
        unlockExperience()
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 1px',
        once: true,
        onEnter: () => {
          lockExperience()
          timeline.play(0)
        },
      })
    }, root)
    return () => {
      unlockExperience()
      context.revert()
    }
  }, [])

  return (
    <section className="assembly" ref={root}>
      <div className="assembly-flash" aria-hidden="true" />
      <div className="assembly-intro" aria-hidden="true"><strong>QUE ARDA<br />LA PARRILLA.</strong></div>
      <div className="assembly-copy assembly-copy-left"><span className="assembly-word-one">NACE</span></div>
      <div className="burger-stage" ref={stage} role="img" aria-label="Hamburguesa que se ensambla ingrediente por ingrediente">
        {layerData.map(layer => <div key={layer.name} className={`burger-layer ${layer.className}`} aria-hidden="true" />)}
      </div>
      <div className="assembly-impact" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => <span className="impact-ring" key={`ring-${index}`} />)}
        {Array.from({ length: 22 }, (_, index) => <i className="impact-particle" key={index} />)}
      </div>
      <div className="assembly-copy assembly-copy-right"><span className="assembly-word-two">LEYENDA</span></div>
      <div className="assembly-copy-final">
        <p>Parrilla, técnica y mucho sabor.</p>
        <h2>Hazla legendaria.</h2>
        <div className="assembly-cta-wrap">
          <div className="cta-pointer" aria-hidden="true"><span>Elige la tuya</span><ArrowBendDownLeft size={42} weight="bold" /></div>
          <button className="text-button" onClick={() => go('/menu')}>Explorar la carta <ArrowRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}

function Home({ go }) {
  const page = useRef(null)
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach(element => {
        gsap.from(element, { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
      })
      gsap.to('.story-image img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub: true } })
    }, page)
    return () => context.revert()
  }, [])

  return (
    <main ref={page}>
      <Hero go={go} />
      <section className="ticker" aria-label="La propuesta de Calisto"><div>HAMBURGUESAS / PARRILLA / ALAS / COSTILLAS / BBQ / HAMBURGUESAS / PARRILLA / ALAS / COSTILLAS / BBQ /</div></section>
      <BurgerAssembly go={go} />
      <section className="story-section">
        <div className="story-image"><img src="/images/calisto/euphoria-master-hd.png" alt="Euphoria Master, ganadora Burger Máster 2023 en Envigado" loading="lazy" /></div>
        <div className="story-copy" data-reveal><p>GANADORES BURGER MÁSTER 2023</p><h2>EUPHORIA<br />HIZO HISTORIA.</h2><button className="text-button light-link" onClick={() => go('/menu')}>Conoce la ganadora <ArrowRight size={20} /></button></div>
      </section>
      <SocialReels />
      <section className="landing-links" data-reveal>
        <button onClick={() => go('/menu')}><span>La carta completa</span><strong>Elige tu próxima leyenda</strong><ArrowRight size={30} /></button>
        <button onClick={() => go('/delivery')}><span>Pide por WhatsApp</span><strong>Calisto llega hasta ti</strong><ArrowRight size={30} /></button>
      </section>
      <LocationBlock />
    </main>
  )
}

function SocialReels() {
  return <section className="social-reels" data-reveal><div className="reels-heading"><p>DESDE @CALISTOBURGERYBBQ</p><h2>LA PARRILLA<br />EN MOVIMIENTO.</h2><a href="https://www.instagram.com/calistoburgerybbq/" target="_blank" rel="noreferrer">Ver Instagram <ArrowRight size={18} /></a></div><div className="reels-grid">{reels.map(([id, title]) => <div className="reel-frame" key={id}><iframe src={`https://www.instagram.com/reel/${id}/embed/`} title={title} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen /></div>)}</div></section>
}

function MenuPage({ go }) {
  return (
    <main className="inner-page menu-page">
      <section className="menu-page-hero"><div><p>LA CARTA DE CALISTO</p><h1>ELIGE TU<br />LEYENDA.</h1><span>Precios y disponibilidad tomados de la carta pública. Pueden variar según la sede.</span></div><img src="/images/calisto/euphoria-master-hd.png" alt="Euphoria Master, ganadora Burger Máster 2023 en Envigado" /></section>
      <nav className="category-nav" aria-label="Categorías de la carta"><a href="#burgers">Burgers</a><a href="#acompanantes">BBQ y parrilla</a><a href="#bebidas">Bebidas</a></nav>
      <MenuCategory id="burgers" number="01" title="BURGERS" items={burgers.map(item => [item.name, item.description, item.price])} featured />
      <MenuCategory id="acompanantes" number="02" title="BBQ Y PARRILLA" items={sides} />
      <MenuCategory id="bebidas" number="03" title="BEBIDAS" items={drinks} />
      <section className="menu-note"><h2>¿LISTO PARA PEDIR?</h2><p>Arma tu pedido, elige la sede y envíalo completo por WhatsApp.</p><button className="primary-button light" onClick={() => go('/delivery')}>Armar mi pedido <ArrowRight size={18} /></button></section>
    </main>
  )
}

function MenuCategory({ id, number, title, items, featured = false }) {
  return <section className={`menu-category ${featured ? 'is-featured' : ''}`} id={id}><header><span>{number}</span><h2>{title}</h2></header><div className="menu-category-list">{items.map(([name, description, price]) => <article key={name}><div><h3>{name}</h3><p>{description}</p></div><strong>${price}</strong></article>)}</div>{featured && <div className="menu-category-photo"><img src="/images/calisto/piso-dos.webp" alt="Hamburguesa Piso Dos de Calisto" loading="lazy" /></div>}</section>
}

function Delivery() {
  const [locationId, setLocationId] = useState('')
  const [orderType, setOrderType] = useState('domicilio')
  const [quantities, setQuantities] = useState({})
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '' })
  const [error, setError] = useState('')
  const selectedLocation = deliveryLocations.find(location => location.id === locationId)
  const selectedItems = deliveryMenu.flatMap(group => group.items).filter(item => quantities[item.name] > 0)
  const itemCount = selectedItems.reduce((total, item) => total + quantities[item.name], 0)
  const total = selectedItems.reduce((sum, item) => sum + priceToNumber(item.price) * quantities[item.name], 0)

  const changeQuantity = (name, amount) => {
    setQuantities(current => ({ ...current, [name]: Math.max(0, (current[name] || 0) + amount) }))
    setError('')
  }

  const updateCustomer = event => {
    setCustomer(current => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  const sendOrder = () => {
    if (!selectedLocation) { setError('Selecciona el local que preparará tu pedido.'); return }
    if (!itemCount) { setError('Añade al menos un producto al pedido.'); return }
    if (!customer.name.trim() || !customer.phone.trim()) { setError('Completa tu nombre y teléfono.'); return }
    if (orderType === 'domicilio' && !customer.address.trim()) { setError('Escribe la dirección de entrega.'); return }

    const itemLines = selectedItems.map(item => `• ${quantities[item.name]} x ${item.name} - $${formatPrice(priceToNumber(item.price) * quantities[item.name])}`)
    const message = [
      'Hola Calisto, quiero hacer este pedido:',
      '',
      ...itemLines,
      '',
      `Total estimado: $${formatPrice(total)}`,
      `Modalidad: ${orderType === 'domicilio' ? 'Domicilio' : 'Recoger en el local'}`,
      `Sede: ${selectedLocation.name}`,
      `Nombre: ${customer.name.trim()}`,
      `Teléfono: ${customer.phone.trim()}`,
      orderType === 'domicilio' ? `Dirección: ${customer.address.trim()}` : null,
      customer.notes.trim() ? `Notas: ${customer.notes.trim()}` : null,
      '',
      'Por favor confirmen disponibilidad, cobertura, valor final y tiempo de entrega.',
    ].filter(line => line !== null).join('\n')
    window.open(`https://wa.me/${selectedLocation.phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="inner-page delivery-page">
      <section className="delivery-hero">
        <div><p>PEDIDOS DIRECTOS POR WHATSAPP</p><h1>ARMA TU<br />PEDIDO.</h1><span>Elige la sede, añade tus favoritos y envía el resumen listo para confirmar.</span></div>
        <img src="/images/calisto/taipei-master.webp" alt="Hamburguesa Taipei Master de Calisto" />
      </section>
      <section className="order-builder">
        <div className="order-flow">
          <section className="order-step" aria-labelledby="location-title">
            <div className="step-heading"><span>1</span><div><h2 id="location-title">ELIGE TU SEDE</h2><p>Tu pedido llegará al WhatsApp correspondiente.</p></div></div>
            <div className="location-options">
              {deliveryLocations.map(location => <button type="button" className={locationId === location.id ? 'is-selected' : ''} key={location.id} onClick={() => { setLocationId(location.id); setError('') }} aria-pressed={locationId === location.id}><MapPin size={22} weight={locationId === location.id ? 'fill' : 'regular'} /><span><strong>{location.name}</strong><small>{location.address}</small></span>{locationId === location.id && <Check size={22} weight="bold" />}</button>)}
            </div>
          </section>
          <section className="order-step" aria-labelledby="products-title">
            <div className="step-heading"><span>2</span><div><h2 id="products-title">ARMA TU PEDIDO</h2><p>Modifica las cantidades antes de enviar.</p></div></div>
            <div className="order-menu">
              {deliveryMenu.map(group => <div className="order-menu-group" key={group.category}><h3>{group.category}</h3>{group.items.map(item => <article key={item.name}><div><h4>{item.name}</h4><p>{item.description}</p><strong>${item.price}</strong></div><div className="quantity-control" aria-label={`Cantidad de ${item.name}`}><button type="button" onClick={() => changeQuantity(item.name, -1)} disabled={!quantities[item.name]} aria-label={`Quitar ${item.name}`}><Minus size={17} weight="bold" /></button><output aria-live="polite">{quantities[item.name] || 0}</output><button type="button" onClick={() => changeQuantity(item.name, 1)} aria-label={`Añadir ${item.name}`}><Plus size={17} weight="bold" /></button></div></article>)}</div>)}
            </div>
          </section>
          <section className="order-step" aria-labelledby="details-title">
            <div className="step-heading"><span>3</span><div><h2 id="details-title">DATOS DE ENTREGA</h2><p>El local confirmará cobertura y valor final.</p></div></div>
            <div className="order-type" role="group" aria-label="Modalidad del pedido"><button type="button" className={orderType === 'domicilio' ? 'is-selected' : ''} onClick={() => setOrderType('domicilio')}>Domicilio</button><button type="button" className={orderType === 'recoger' ? 'is-selected' : ''} onClick={() => setOrderType('recoger')}>Recoger</button></div>
            <div className="customer-fields"><label>Nombre<input name="name" autoComplete="name" value={customer.name} onChange={updateCustomer} placeholder="Tu nombre" /></label><label>Teléfono<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={customer.phone} onChange={updateCustomer} placeholder="300 000 0000" /></label>{orderType === 'domicilio' && <label className="field-wide">Dirección<input name="address" autoComplete="street-address" value={customer.address} onChange={updateCustomer} placeholder="Calle, número, barrio y detalles" /></label>}<label className="field-wide">Notas<textarea name="notes" rows="3" value={customer.notes} onChange={updateCustomer} placeholder="Sin cebolla, portería, forma de pago..." /></label></div>
          </section>
        </div>
        <aside className="order-summary">
          <ShoppingBagOpen size={34} weight="bold" />
          <p>RESUMEN</p><h2>{itemCount ? `${itemCount} ${itemCount === 1 ? 'PRODUCTO' : 'PRODUCTOS'}` : 'TU PEDIDO ESTÁ VACÍO'}</h2>
          <div className="summary-items">{selectedItems.length ? selectedItems.map(item => <div key={item.name}><span>{quantities[item.name]} x {item.name}</span><strong>${formatPrice(priceToNumber(item.price) * quantities[item.name])}</strong></div>) : <p>Añade productos para preparar el mensaje.</p>}</div>
          <div className="summary-total"><span>Total estimado</span><strong>${formatPrice(total)}</strong></div>
          {selectedLocation && <p className="summary-location"><MapPin size={18} weight="fill" /> {selectedLocation.name}</p>}
          {error && <p className="order-error" role="alert">{error}</p>}
          <button className="whatsapp-button" type="button" onClick={sendOrder}><WhatsappLogo size={24} weight="fill" /> Enviar pedido por WhatsApp</button>
          <small>El envío no confirma el pedido. La sede validará disponibilidad, cobertura, precio y tiempo.</small>
        </aside>
      </section>
    </main>
  )
}

function Story() {
  return <main className="inner-page"><section className="manifesto"><p>Hamburguesas, parrilla y BBQ nacidas en Antioquia.</p><h1>DE LA PARRILLA<br /><em>A LA LEYENDA.</em></h1></section><section className="story-detail"><img src="/images/calisto/cordillera-master.webp" alt="Hamburguesa Cordillera Master de Calisto" /><div><h2>UNA HISTORIA CON FUEGO</h2><p>Calisto combina carnes, ahumados, frutas colombianas y salsas intensas en una carta con identidad propia.</p><p>En 2023, Euphoria Master fue reconocida como ganadora del Burger Máster en Envigado.</p></div></section><JoinTeam /></main>
}

function Events() {
  return <main className="inner-page"><section className="page-title"><p>CALISTO EN INSTAGRAM</p><h1>FUEGO EN<br />CADA TOMA.</h1></section><SocialReels /></main>
}

function GroupOrders() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const submit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!data.get('name') || !data.get('email') || !data.get('people')) { setError('Completa nombre, email y número de personas.'); return }
    setSent(true)
  }
  if (sent) return <main className="inner-page"><section className="success-state"><Check size={58} weight="bold" /><h1>SOLICITUD<br />RECIBIDA.</h1><p>Este envío es una demostración y no almacena datos.</p></section></main>
  return <main className="inner-page"><section className="groups-page"><div><p>GRUPOS / EQUIPOS / CELEBRACIONES</p><h1>UNA MESA<br />MUY GRANDE.</h1><span>Cuéntanos el plan con 48 horas de antelación y preparamos el resto.</span></div><form onSubmit={submit}><label>Nombre<input name="name" autoComplete="name" /></label><label>Email<input name="email" type="email" autoComplete="email" /></label><label>Teléfono<input name="phone" type="tel" autoComplete="tel" /></label><label>Número de personas<input name="people" type="number" min="10" /></label><label>Cuéntanos el plan<textarea name="notes" rows="4" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Enviar solicitud <ArrowRight size={18} /></button></form></section></main>
}

function LocationBlock() {
  return <section className="location"><div><MapPin size={42} weight="fill" /><h2>ENCUENTRA TU CALISTO</h2><div className="location-list"><p><strong>Envigado</strong>Calle 37 Sur #32-8</p><p><strong>La Playa</strong>Calle 51 #40-35</p><p><strong>Laureles</strong>Transversal 74 #39B-21</p><p><strong>CC Aventura</strong>Carrera 52 #65-91, Local 52-33</p></div><a href="https://www.calisto.com.co/locales/" target="_blank" rel="noreferrer">Ver sedes oficiales <ArrowRight size={18} /></a></div><div className="map-pattern" aria-hidden="true"><img src="/images/calisto/logo-calisto-white-2x.png" alt="" /></div></section>
}

function JoinTeam() {
  return <section className="join"><h2>¿QUIERES HABLAR CON CALISTO?</h2><div><p>Consulta domicilios, menús por sede y canales oficiales desde su Linktree.</p><a className="primary-button" href="https://linktr.ee/calistoburgerybbq" target="_blank" rel="noreferrer">Abrir canales oficiales <ArrowRight size={18} /></a></div></section>
}

function Legal({ type }) {
  const titles = { cookies: 'POLÍTICA DE COOKIES', privacidad: 'POLÍTICA DE PRIVACIDAD', legal: 'AVISO LEGAL' }
  return <main className="inner-page"><section className="legal"><h1>{titles[type]}</h1><p>Contenido provisional para el prototipo funcional. Antes de publicar deberá sustituirse por textos revisados por Calisto para Colombia.</p><h2>RESPONSABLE</h2><p>Prototipo no oficial de Calisto Burger & BBQ. Los datos enviados en esta demostración no se almacenan ni se transmiten.</p></section></main>
}

function Footer({ go }) {
  return <footer><div className="footer-lead"><h2>¿TIENES HAMBRE?</h2><button className="primary-button light" onClick={() => go('/delivery')}>Armar pedido <ArrowRight size={20} /></button></div><div className="footer-grid"><div><Brand go={go} /><p>Envigado / Laureles / La Playa / CC Aventura<br />Hamburguesas, parrilla y BBQ</p></div><nav>{routes.slice(1).map(([href, label]) => <button key={href} onClick={() => go(href)}>{label}</button>)}</nav><div className="socials"><a href="https://www.instagram.com/calistoburgerybbq/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo size={25} /></a><a href="https://wa.me/573013565757" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={25} /></a><a href="https://www.tiktok.com/@calistoburgerybbq" target="_blank" rel="noreferrer" aria-label="TikTok"><TiktokLogo size={25} /></a></div></div><div className="footer-legal"><span>© 2026 Calisto Burger & BBQ</span><button onClick={() => go('/cookies')}>Cookies</button><button onClick={() => go('/privacidad')}>Privacidad</button><button onClick={() => go('/legal')}>Legal</button></div></footer>
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('calisto-cookie-choice'))
  const choose = value => { localStorage.setItem('calisto-cookie-choice', value); setVisible(false) }
  if (!visible) return null
  return <div className="cookie-banner"><div><strong>COOKIES, NO MIGAS</strong><p>Usamos analítica opcional para mejorar este prototipo.</p></div><div><button onClick={() => choose('rejected')}>Rechazar</button><button className="primary-button" onClick={() => choose('accepted')}>Aceptar</button></div></div>
}

export default function App() {
  const [path, go] = useRoute()
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const closeOnEscape = event => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  let page
  if (path === '/') page = <Home go={go} />
  else if (path === '/menu') page = <MenuPage go={go} />
  else if (path === '/delivery') page = <Delivery />
  else if (path === '/historia') page = <Story />
  else if (path === '/eventos') page = <Events />
  else if (path === '/pedidos-grandes') page = <GroupOrders />
  else if (['/cookies', '/privacidad', '/legal'].includes(path)) page = <Legal type={path.slice(1)} />
  else page = <main className="inner-page"><section className="not-found"><h1>ESTA MESA<br />NO EXISTE.</h1><button className="primary-button" onClick={() => go('/')}><ArrowLeft size={18} /> Volver</button></section></main>

  return <><CustomCursor /><Header go={go} path={path} menuOpen={menuOpen} openMenu={() => setMenuOpen(true)} /><div className="page-shell" key={path}>{page}<Footer go={go} /></div><MenuOverlay open={menuOpen} close={() => setMenuOpen(false)} go={go} /><CookieBanner /></>
}
