'use client'

import { useLenis } from 'lenis/react'

type SmoothLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Anchor that performs a Lenis smooth-scroll when the target exists on the
 * current page. If the target isn't found (e.g. a cross-page link), it falls
 * back to the browser's default navigation.
 */
export default function SmoothLink({ href, children, ...rest }: SmoothLinkProps) {
  const lenis = useLenis()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = href.includes('#') ? `#${href.split('#')[1]}` : ''
    const target = hash ? document.querySelector(hash) : null
    if (!lenis || !target) return
    e.preventDefault()
    lenis.scrollTo(hash, { duration: 1.4 })
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
