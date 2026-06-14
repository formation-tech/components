import { LitElement, css, html } from 'lit'
import type { PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const VIEWBOX_WIDTH = 159.3
const VIEWBOX_HEIGHT = 180.4

type EyeState = {
  el: SVGGElement
  cx: number
  cy: number
}

/**
 * Logo hibou formation.tech avec clignement des yeux.
 *
 * @csspart svg - L'élément SVG du logo
 */
@customElement('ft-owl-logo')
export class FtOwlLogo extends LitElement {
  /** Largeur affichée du logo (px). */
  @property({ type: Number })
  width = 38

  /** Hauteur affichée (px). Calculée depuis le ratio du viewBox si omise. */
  @property({ type: Number })
  height = 0

  /** Texte accessible pour lecteurs d'écran. */
  @property()
  label = 'formation.tech'

  /** Fait tourner les yeux en boucle (ex. pendant un chargement). */
  @property({ type: Boolean, reflect: true })
  loading = false

  private eyes: EyeState[] = []
  private rotateFrame = 0
  private rotateDeg = 0
  private isRotating = false

  private get displayHeight(): number {
    return this.height || Math.round((this.width * VIEWBOX_HEIGHT) / VIEWBOX_WIDTH)
  }

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('mousemove', this.onMouseMove)
  }

  disconnectedCallback(): void {
    document.removeEventListener('mousemove', this.onMouseMove)
    this.stopRotateAnimation()
    super.disconnectedCallback()
  }

  protected firstUpdated(): void {
    this.setupEyes()
    if (this.loading) {
      this.startRotateAnimation()
    }
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('loading')) {
      if (this.loading) {
        this.startRotateAnimation()
      } else {
        this.stopRotateAnimation()
      }
    }
  }

  private setupEyes(): void {
    const svg = this.renderRoot.querySelector('svg')
    if (!svg) return

    this.eyes = ['.eye-left', '.eye-right'].map((selector) => {
      const el = svg.querySelector(selector) as SVGGElement
      const circle = el.querySelector('circle')!
      const cx = Number(circle.getAttribute('cx'))
      const cy = Number(circle.getAttribute('cy'))
      el.style.transformOrigin = `${cx}px ${cy}px 0`
      return { el, cx, cy }
    })
  }

  private getEyeScreenPosition(eye: EyeState): { x: number; y: number } {
    const svg = this.renderRoot.querySelector('svg')!
    const ratio = svg.clientHeight / VIEWBOX_HEIGHT
    const rect = this.getBoundingClientRect()
    return {
      x: eye.cx * ratio + rect.left,
      y: eye.cy * ratio + rect.top,
    }
  }

  private onMouseMove = (e: MouseEvent): void => {
    if (this.isRotating) return

    this.eyes.forEach((eye, i) => {
      const { x, y } = this.getEyeScreenPosition(eye)
      const rad = Math.atan2(e.clientY - y, e.clientX - x)
      const deg = (rad * 180) / Math.PI + 45 + i * 90
      eye.el.style.transform = `rotate(${deg}deg)`
    })
  }

  private startRotateAnimation(): void {
    if (this.isRotating) return
    this.isRotating = true
    this.rotateDeg = 0

    const tick = (): void => {
      this.rotateDeg = (this.rotateDeg + 10) % 360
      this.eyes.forEach((eye, i) => {
        eye.el.style.transform = `rotate(${this.rotateDeg + i * 90}deg)`
      })

      if (this.loading) {
        this.rotateFrame = requestAnimationFrame(tick)
      } else {
        this.isRotating = false
      }
    }

    this.rotateFrame = requestAnimationFrame(tick)
  }

  private stopRotateAnimation(): void {
    cancelAnimationFrame(this.rotateFrame)
    this.isRotating = false
  }

  render() {
    return html`
      <svg
        part="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}"
        width=${this.width}
        height=${this.displayHeight}
        aria-label=${this.label}
        role="img"
      >
        <path
          fill="#1d3908"
          d="M159.3 93.8l-1.5-24.2-.2-.6-1.6-4.3-1.7-4.2-.7-1.7L127.4.1l-21.1 21.3-26.6-3.8-26.6 3.7L31.9 0 5.8 58.4l-.8 2c-.6 1.5-1.1 3-1.7 4.2l-1.6 4.3-.2.6L0 93.7l8.3 40.7 26.2 23.5-14.2 7.7 27.4 2.7 4.1 12.1 9.3-9.8 18.4 7.9-4.6-11.1 4.6.9 4.6-.9-4.6 11.1 18.4-7.9 9.3 9.8 4.1-12.1 27.4-2.7-14.2-7.7 26.2-23.5 8.6-40.6z"
        />
        <path fill="#48662a" d="M47.2 156.5l-10.8 5.9 14.9 1.5 2.6 7.5 6.2-6.4 10.6 4.5-3.7-9-19.8-4z" />
        <path fill="#669f3c" d="M33.5 8.4l17.8 18-41.1 34 23.3-52z" />
        <path fill="#91ce55" d="M10.2 60.4l46.7-25.6-5.6-8.4-41.1 34z" />
        <path fill="#7eba4a" d="M66.5 48.8l-22.2-7.1 13.1-7.5 9.1 14.6z" />
        <path fill="#669f3c" d="M10.2 60.4l6.8-3.8-3.3 6-3.5-2.2zm-3.9 10l4.6 2.5L5 93.4l1.3-23z" />
        <path fill="#7eba4a" d="M25.3 93.4L10.9 72.9 5 93.4h20.3z" />
        <path fill="#91ce55" d="M39.2 155.5L15.5 93.4H5l34.2 62.1z" />
        <path fill="#5a8435" d="M22.1 110.8h26.6l-9.5 44.7-17.1-44.7z" />
        <path fill="#669f3c" d="M15.4 93.4l25.7 17.4h-19l-6.7-17.4z" />
        <path fill="#48662a" d="M39.2 155.5l-26.4-23.6 12.1-2.3 14.3 25.9z" />
        <path fill="#669f3c" d="M5 93.4l19.9 36.2-12.1 2.3L5 93.4zm43.7 17.4l20.3-8.7-9 24-11.3-15.3z" />
        <path fill="#91ce55" d="M79.8 100.6L60 126.1l9-24 10.8-1.5zm-40.6 54.9l9.5-44.7L60 126.1l-20.8 29.4z" />
        <path fill="#5a8435" d="M60 126.1l19.8 37.4-40.6-8L60 126.1z" />
        <path fill="#48662a" d="M112.2 156.5l10.8 5.9-14.9 1.5-2.6 7.5-6.2-6.4-10.6 4.5 3.7-9 19.8-4z" />
        <path fill="#669f3c" d="M125.9 8.4l-17.8 18 41.1 34-23.3-52z" />
        <path fill="#91ce55" d="M149.2 60.4l-46.7-25.7 5.6-8.3 41.1 34z" />
        <path fill="#7eba4a" d="M92.9 48.8l22.2-7.1-13.1-7.5-9.1 14.6z" />
        <path fill="#669f3c" d="M149.2 60.4l-6.8-3.7 3.3 5.9 3.5-2.2zm3.9 10l-4.7 2.5 6 20.5-1.3-23z" />
        <path fill="#7eba4a" d="M135.7 93.4l12.8-20.5 5.9 20.5h-18.7z" />
        <path fill="#91ce55" d="M120.2 155.5L144 93.4h10.4l-34.2 62.1z" />
        <path fill="#5a8435" d="M137.3 110.8h-26.6l9.5 44.7 17.1-44.7z" />
        <path fill="#669f3c" d="M144 93.4l-25.7 17.4h19l6.7-17.4z" />
        <path fill="#48662a" d="M120.2 155.5l26.4-23.6-12.1-2.3-14.3 25.9z" />
        <path fill="#669f3c" d="M154.4 93.4l-19.9 36.2 12.1 2.3 7.8-38.5zm-43.7 17.4l-20.3-8.7 9 24 11.3-15.3z" />
        <path fill="#91ce55" d="M79.6 100.6l19.8 25.5-9-24-10.8-1.5zm40.6 54.9l-9.5-44.7-11.3 15.3 20.8 29.4z" />
        <path fill="#5a8435" d="M99.4 126.1l-19.8 37.4 40.6-8-20.8-29.4z" />
        <path fill="#7eba4a" d="M90.4 102.1l-10.7-1.5-10.7 1.5 10.7-18.9 10.7 18.9z" />
        <path fill="#7eba4a" d="M79.8 163.2l19.6-37.1-19.6-25.4v-.1h-.2v.1L60 126.1l19.6 37.1v.3l.1-.1.1.1v-.3z" />
        <path fill="#5a8435" d="M79.8 68.8l28.3-42.4-28.3-3.9h-.2l-28.3 3.9 28.3 42.4v.2l.1-.1.1.1v-.2z" />

        <path
          fill="#1d3908"
          d="M113.8 41.7c14.3 0 26.6 8.6 31.9 21l3.5-2.2 2.4 6.2c.6 1.3 1 2.5 1.4 3.8l-4.6 2.7.2 3.3a34.7 34.7 0 11-34.8-34.8z"
        />
        <circle fill="#fff2d9" cx="106.6" cy="76.4" r="28.1" />
        <g class="eye eye-right">
          <g class="eye-blink">
            <circle fill="#fff" cx="106.6" cy="76.4" r="17.3" />
            <circle fill="#231f20" cx="106.6" cy="76.4" r="9.8" />
            <path
              fill="#fff"
              d="M95.1 69.2c-.9 4 2.6 7.4 6.6 6.5 2-.4 3.6-2.1 4.1-4.1.9-4-2.6-7.4-6.5-6.5a5.4 5.4 0 00-4.2 4.1z"
            />
          </g>
        </g>

        <path
          fill="#1d3908"
          d="M45.6 41.7a34.6 34.6 0 00-31.9 21l-3.5-2.2-2.4 6.2c-.6 1.3-1 2.5-1.4 3.8l4.6 2.7-.2 3.3a34.7 34.7 0 1034.8-34.8z"
        />
        <circle fill="#fff2d9" cx="52.8" cy="76.4" r="28.1" />
        <g class="eye eye-left">
          <g class="eye-blink">
            <circle fill="#fff" cx="52.8" cy="76.4" r="17.3" />
            <circle fill="#231f20" cx="52.8" cy="76.4" r="9.8" />
            <circle fill="#fff" cx="58.9" cy="70.4" r="5.4" />
          </g>
        </g>

        <path fill="#231f20" d="M69.4 84.4H90l-10.3 18.3-10.3-18.3z" />
      </svg>
    `
  }

  static styles = css`
    :host {
      display: inline-block;
      line-height: 0;
    }

    svg {
      display: block;
    }

    .eye-right {
      transform-origin: 106.6px 76.4px;
    }

    .eye-left {
      transform-origin: 52.8px 76.4px;
    }

    .eye-blink {
      transform-origin: inherit;
      animation: owlblink 6s ease-in-out infinite;
    }

    @keyframes owlblink {
      0%,
      92%,
      100% {
        transform: scaleY(1);
      }
      96% {
        transform: scaleY(0.1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .eye-blink {
        animation: none;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ft-owl-logo': FtOwlLogo
  }
}
