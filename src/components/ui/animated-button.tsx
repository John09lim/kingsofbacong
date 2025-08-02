import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  showRipple?: boolean
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, showRipple = true, onClick, children, ...props }, ref) => {
    const [isClicked, setIsClicked] = React.useState(false)
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true)
      
      if (showRipple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const newRipple = { id: Date.now(), x, y }
        
        setRipples(prev => [...prev, newRipple])
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
      }
      
      // Reset click animation
      setTimeout(() => setIsClicked(false), 300)
      
      // Call original onClick
      if (onClick) {
        onClick(event)
      }
    }

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(
          "relative overflow-hidden transition-all duration-200 ease-out",
          "hover:scale-[1.02] hover:shadow-lg",
          "focus:scale-[1.02] focus:shadow-lg",
          "active:scale-[0.98]",
          isClicked && "animate-button-click animate-button-glow",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effects */}
        {showRipple && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none bg-red-500/30 rounded-full animate-button-ripple"
            style={{
              left: ripple.x - 8,
              top: ripple.y - 8,
              width: 16,
              height: 16,
            }}
          />
        ))}
        
        {/* Button content */}
        <span className="relative z-10">
          {children}
        </span>
      </Button>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }