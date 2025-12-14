import useWindowStore from "../store/window";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import React, { useLayoutEffect, useRef } from 'react'

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props)=>{
        const {focusWindow,windows} = useWindowStore();
        const {isOpen,zIndex, isMinimized, isMaximized } = windows[windowKey];
        const ref = useRef(null);
        useGSAP(()=>{
         const el = ref.current;
         if(!el || !isOpen) return;

         el.style.display = "block";

         gsap.fromTo(el,{
            scale:0.8,
            opacity:0,
            y:40
         },{
             scale:1,
            opacity:1,
            y:0,
            duration : 0.4,
            ease:'power3.out'
         })

        },[isOpen]);

        useGSAP(()=>{
          const el = ref.current;
          if(!el) return;

          const [instance] =  Draggable.create(el,{
            onPress:()=> focusWindow(windowKey)
          })
          return ()=> instance.kill();
        },[])

        useLayoutEffect(()=>{
          const el = ref.current;
          if(!el) return;
          el.style.display = (isOpen && !isMinimized) ? "block" : "none";
        },[isOpen, isMinimized])

        const windowClasses = `absolute ${isMaximized ? 'fixed inset-0 w-full h-full' : ''}`;

        return( <section id={windowKey} ref={ref} style={{zIndex}} className={windowClasses}>
          <Component {...props}/>
        </section>
        );
    };
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`
  return Wrapped;
}

export default WindowWrapper
