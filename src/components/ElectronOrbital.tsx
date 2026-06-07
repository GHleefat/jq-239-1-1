interface ElectronOrbitalProps {
  shells: number[];
}

export default function ElectronOrbital({ shells }: ElectronOrbitalProps) {
  const protonCount = shells.reduce((sum, count) => sum + count, 0);

  return (
    <div
      className="relative w-48 h-48 mx-auto flex items-center justify-center"
    >
      <div
        className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-lg animate-pulse-glow flex items-center justify-center text-white font-bold text-sm"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {protonCount}
      </div>

      {shells.map((count, i) => {
        const size = (i + 1) * 32 + 20;
        const orbitDuration = 4 + i * 1.5;
        const direction = i % 2 === 1 ? 'reverse' : 'normal';
        const radius = size / 2;

        return (
          <div
            key={i}
            className="absolute rounded-full border-2 border-dashed border-cyan-400/30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {Array.from({ length: count }).map((_, j) => {
              const angle = (360 / count) * j;

              return (
                <div
                  key={j}
                  className="absolute w-full h-full"
                  style={{
                    top: 0,
                    left: 0,
                    animation: `orbit ${orbitDuration}s linear infinite`,
                    animationDirection: direction,
                  }}
                >
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateX(${radius}px) translate(-50%, -50%)`,
                      boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
