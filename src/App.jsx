import {Dock, Navbar,Welcome,Home} from './components'
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { Finder, Resume, Safari, Terminal, TextFile, ImageFile, Contact, Gallery } from './windows';
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
        <Navbar/>
        <Welcome/>
        <Dock/>
        <Terminal/>
        <Safari/>
        <Resume/>
        <Finder/>
        <TextFile/>
        <ImageFile/>
        <Contact/>
        <Gallery/>
        <Home/>
    </main>
  )
}

export default App
