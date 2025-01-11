import { arrow, FloatingPortal, offset, shift, useFloating } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState } from "react";

interface Props {
  children: React.ReactNode,
  infoPopover : React.ReactNode,
  className?: string
}

export default function Popover({children, infoPopover, className}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowElement = useRef<HTMLElement>(null)
    const id = useId()
  
    const {refs, x, y, strategy,middlewareData} = useFloating({
      middleware: [offset(5),shift(), arrow({element: arrowElement})],
    })
  
    const onHover = () => setIsOpen(true)
    const leaveHover = () => setIsOpen(false)


  return (
    <div className="flex items-center py-1 hover:text-gray-300 cursor-pointer" ref={refs.setReference} onMouseEnter={onHover} onMouseLeave={leaveHover}>
      {children}

      <AnimatePresence>
        <FloatingPortal id={id}>
          {isOpen && (
            <motion.div 
              initial = {{opacity: 0, scale: 0}} 
              animate={{opacity: 1, scale: 1}} 
              transition={{ type: "spring", stiffness: 100 }}
              ref={refs.setFloating} 
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }} 
              className='mt-2'
            >
              <span   
                ref={arrowElement} 
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
                className='absolute border-b-white border-[11px] border-t-transparent border-x-transparent translate-y-[-94%] z-20'
              ></span>
              <div className='bg-white shadow-lg relative rounded-lg border border-gray-200 ring-2 ring-blue-200'>
                {infoPopover}
              </div>
            </motion.div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </div>
  )
}
