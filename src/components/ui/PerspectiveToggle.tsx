import { useNavigation } from '../../context/NavigationContext';

export default function PerspectiveToggle() {
  const { goHome, goToMachine, currentPath } = useNavigation();

  const isHome = currentPath === '/';
  const isMachine = currentPath === '/machine';

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex gap-4 sm:gap-7 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-white bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Human Toggle */}
        <button 
          onClick={goHome}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
        >
          <span className={`size-[6px] sm:size-[8px] inline-block rounded-full outline outline-1 outline-offset-1 ml-[1px] transition-all duration-300 ${isHome ? 'bg-current outline-white' : 'bg-transparent outline-white/20'}`}></span>
          <span className={`font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity duration-300 ${isHome ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
            Human
          </span>
        </button>

        {/* Machine Toggle */}
        <button 
          onClick={goToMachine}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
        >
          <span className={`size-[6px] sm:size-[8px] inline-block rounded-full outline outline-1 outline-offset-1 ml-[1px] transition-all duration-300 ${isMachine ? 'bg-current outline-white' : 'bg-transparent outline-white/20'}`}></span>
          <span className={`font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity duration-300 ${isMachine ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
            Machine
          </span>
        </button>
      </div>
    </div>
  );
}
